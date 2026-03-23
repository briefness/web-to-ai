/**
 * useGameProgress - 管理游戏进度 (localStorage)
 */
import { useState, useCallback, useEffect } from 'react';
import levels from '../levels/levelData';

const STORAGE_KEY = 'codequest_progress';

function getInitialProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return {
    xp: 0,
    completedLevels: [],
    currentLevel: '1-1',
    hintUsage: {}, // { "1-1": 2 } = used 2 hints on level 1-1
  };
}

export function useGameProgress() {
  const [progress, setProgress] = useState(getInitialProgress);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const completeLevel = useCallback((levelId, xpReward) => {
    setProgress(prev => {
      if (prev.completedLevels.includes(levelId)) return prev;

      const levelIdx = levels.findIndex(l => l.id === levelId);
      const nextLevel = levelIdx < levels.length - 1 ? levels[levelIdx + 1].id : levelId;

      return {
        ...prev,
        xp: prev.xp + xpReward,
        completedLevels: [...prev.completedLevels, levelId],
        currentLevel: nextLevel,
      };
    });
  }, []);

  const isLevelUnlocked = useCallback((levelId) => {
    if (levelId === '1-1') return true;
    const levelIdx = levels.findIndex(l => l.id === levelId);
    if (levelIdx <= 0) return true;
    return progress.completedLevels.includes(levels[levelIdx - 1].id);
  }, [progress.completedLevels]);

  const isLevelCompleted = useCallback((levelId) => {
    return progress.completedLevels.includes(levelId);
  }, [progress.completedLevels]);

  const useHint = useCallback((levelId) => {
    setProgress(prev => ({
      ...prev,
      hintUsage: {
        ...prev.hintUsage,
        [levelId]: (prev.hintUsage[levelId] || 0) + 1,
      },
    }));
  }, []);

  const getHintLevel = useCallback((levelId) => {
    return progress.hintUsage[levelId] || 0;
  }, [progress.hintUsage]);

  const setCurrentLevel = useCallback((levelId) => {
    setProgress(prev => ({ ...prev, currentLevel: levelId }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({
      xp: 0,
      completedLevels: [],
      currentLevel: '1-1',
      hintUsage: {},
    });
  }, []);

  return {
    progress,
    completeLevel,
    isLevelUnlocked,
    isLevelCompleted,
    useHint,
    getHintLevel,
    setCurrentLevel,
    resetProgress,
  };
}
