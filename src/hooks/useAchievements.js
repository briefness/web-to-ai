/**
 * useAchievements - 成就系统
 *
 * 追踪玩家的里程碑，触发成就解锁通知
 */
import { useState, useCallback, useEffect } from 'react';

const ACHIEVEMENTS = [
  {
    id: 'first_blood',
    title: '初次击杀',
    icon: '🗡️',
    description: '击败你的第一只怪物',
    condition: (p) => p.completedLevels.length >= 1,
  },
  {
    id: 'triple_kill',
    title: '三连击杀',
    icon: '⚔️',
    description: '通关 3 个关卡',
    condition: (p) => p.completedLevels.length >= 3,
  },
  {
    id: 'region_clear',
    title: '新手村毕业',
    icon: '🎓',
    description: '通关 Python 山谷所有关卡',
    condition: (p) => ['1-1','1-2','1-3','1-4','1-5'].every(id => p.completedLevels.includes(id)),
  },
  {
    id: 'boss_slayer',
    title: 'BOSS 猎人',
    icon: '🏆',
    description: '击败 BOSS 关卡',
    condition: (p) => p.completedLevels.some(id => id.startsWith('boss')),
  },
  {
    id: 'xp_100',
    title: '百分勇者',
    icon: '⭐',
    description: '累计获得 100 XP',
    condition: (p) => p.xp >= 100,
  },
  {
    id: 'xp_500',
    title: '经验丰富',
    icon: '💫',
    description: '累计获得 500 XP',
    condition: (p) => p.xp >= 500,
  },
  {
    id: 'no_hints',
    title: '独立思考者',
    icon: '🧠',
    description: '不使用提示通关一个关卡',
    condition: (p) => {
      // 至少有一个关卡通关且该关卡没有使用提示
      return p.completedLevels.some(id => !p.hintUsage?.[id] || p.hintUsage[id] === 0);
    },
  },
  {
    id: 'perfect_run',
    title: '完美通关',
    icon: '💎',
    description: '通关全部 45 个关卡',
    condition: (p) => p.completedLevels.length >= 45,
  },
  {
    id: 'api_master',
    title: 'API 城主',
    icon: '🏰',
    description: '通关 API 城堡所有关卡',
    condition: (p) => ['3-1','3-2','3-3','boss-2'].every(id => p.completedLevels.includes(id)),
  },
  {
    id: 'ai_pioneer',
    title: 'AI 先驱',
    icon: '🛸',
    description: '通关 AI 星域所有关卡',
    condition: (p) => ['5-1','5-2','6-1','boss-3'].every(id => p.completedLevels.includes(id)),
  },
  {
    id: 'agent_master',
    title: 'Agent 大师',
    icon: '🤖',
    description: '击败 ResearchBot 终极 BOSS',
    condition: (p) => p.completedLevels.includes('boss-4'),
  },
  {
    id: 'xp_1000',
    title: '传奇勇者',
    icon: '👑',
    description: '累计获得 1000 XP',
    condition: (p) => p.xp >= 1000,
  },
  {
    id: 'minichat_crafter',
    title: 'MiniChat 工匠',
    icon: '🔨',
    description: '击败 MiniChat BOSS',
    condition: (p) => p.completedLevels.includes('boss-5'),
  },
  {
    id: 'docmind_scholar',
    title: 'DocMind 学者',
    icon: '🏛️',
    description: '击败 DocMind BOSS',
    condition: (p) => p.completedLevels.includes('boss-6'),
  },
  {
    id: 'graduated',
    title: '🎓 毕业生',
    icon: '🎓',
    description: '通过终极毕业大考',
    condition: (p) => p.completedLevels.includes('boss-final'),
  },
];

const STORAGE_KEY = 'codequest_achievements';

export function useAchievements() {
  const [unlockedIds, setUnlockedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [newAchievement, setNewAchievement] = useState(null);

  const save = useCallback((ids) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, []);

  /**
   * 检查进度并解锁新成就
   */
  const checkAchievements = useCallback((progress) => {
    const newlyUnlocked = [];

    ACHIEVEMENTS.forEach(ach => {
      if (!unlockedIds.includes(ach.id) && ach.condition(progress)) {
        newlyUnlocked.push(ach);
      }
    });

    if (newlyUnlocked.length > 0) {
      const updatedIds = [...unlockedIds, ...newlyUnlocked.map(a => a.id)];
      setUnlockedIds(updatedIds);
      save(updatedIds);
      // 显示第一个新解锁的成就
      setNewAchievement(newlyUnlocked[0]);
    }
  }, [unlockedIds, save]);

  const dismissAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  const getAll = useCallback(() => {
    return ACHIEVEMENTS.map(ach => ({
      ...ach,
      unlocked: unlockedIds.includes(ach.id),
    }));
  }, [unlockedIds]);

  return {
    achievements: getAll(),
    newAchievement,
    checkAchievements,
    dismissAchievement,
    unlockedCount: unlockedIds.length,
    totalCount: ACHIEVEMENTS.length,
  };
}
