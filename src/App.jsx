/**
 * App.jsx - CodeQuest 主应用
 *
 * 🔑 核心改造：handleRun 中代码验证结果直接驱动游戏动画
 *    代码结果 → checkResults (含 displayValue/speechText) → GameRenderer.playCodeResults()
 *    角色根据每个 objective 的成功/失败在画面上行动、说话、开门
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import CodeEditor from './components/CodeEditor';
import ObjectivesPanel from './components/ObjectivesPanel';
import OutputPanel from './components/OutputPanel';
import ActionBar from './components/ActionBar';
import WorldMap from './components/WorldMap';
import LoadingScreen from './components/LoadingScreen';
import LevelComplete from './components/LevelComplete';
import AchievementToast from './components/AchievementToast';
import TutorialPanel from './components/TutorialPanel';
import { usePyodide } from './hooks/usePyodide';
import { useGameProgress } from './hooks/useGameProgress';
import levels, { getLevelById, getNextLevel } from './levels/levelData';
import { getTutorial } from './levels/tutorialData';
import { useAchievements } from './hooks/useAchievements';
import { useSound } from './hooks/useSound';

export default function App() {
  const { isReady, isLoading, loadingProgress, loadingMessage, runCode } = usePyodide();
  const {
    progress,
    completeLevel,
    isLevelUnlocked,
    isLevelCompleted,
    useHint,
    getHintLevel,
    setCurrentLevel,
  } = useGameProgress();

  const { newAchievement, checkAchievements, dismissAchievement } = useAchievements();
  const { play, enabled: soundEnabled, toggle: toggleSound } = useSound();

  const [view, setView] = useState('map');
  const [activeLevelId, setActiveLevelId] = useState(null);
  const [code, setCode] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [outputLines, setOutputLines] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHintText, setCurrentHintText] = useState('');
  const [editorTab, setEditorTab] = useState('code'); // 'code' | 'tutorial'
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showProgressPanel, setShowProgressPanel] = useState(false);

  // ========== 全局快捷键 ==========
  useEffect(() => {
    const handleKey = (e) => {
      // Esc → 返回地图（但通关弹窗打开时不触发，由弹窗自己处理）
      if (e.key === 'Escape' && view === 'play' && !levelComplete) {
        e.preventDefault();
        setView('map');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [view, levelComplete]);

  const gameCanvasRef = useRef(null);
  const activeLevel = activeLevelId ? getLevelById(activeLevelId) : null;

  // ========== 选关 ==========
  const handleSelectLevel = useCallback((levelId) => {
    const level = getLevelById(levelId);
    if (!level) return;
    setActiveLevelId(levelId);
    setCode(level.initialCode);
    setObjectives(level.objectives.map(o => ({ ...o, completed: false })));
    setOutputLines([]);
    setLevelComplete(false);
    setShowHint(false);
    setCurrentHintText('');
    play('select');
    setEditorTab('code');
    setCurrentLevel(levelId);
    setView('play');
  }, [setCurrentLevel]);

  // ========== 🔑 运行代码 — 驱动游戏动画 ==========
  const handleRun = useCallback(async () => {
    if (!activeLevel || isRunning) return;
    setIsRunning(true);
    play('run');
    setOutputLines([{ type: 'system', text: '⏳ 执行代码中...' }]);

    // 1. 在 Pyodide 沙箱中执行代码 + 验证
    const result = await runCode(code, activeLevel.validation.checks);

    const newLines = [];

    // 2. 显示 stdout
    if (result.stdout) {
      result.stdout.split('\n').filter(Boolean).forEach(line => {
        newLines.push({ type: 'stdout', prefix: '>', text: line });
      });
    }

    // 3. 显示 stderr
    if (result.stderr) {
      result.stderr.split('\n').filter(Boolean).forEach(line => {
        newLines.push({ type: 'stderr', prefix: '❌', text: line });
      });
    }

    // 4. 将验证结果与关卡配置中的动画参数合并
    //    这是桥接代码和游戏的核心步骤
    const enrichedChecks = [];
    const updatedObjectives = [...objectives];

    if (result.checks && result.checks.length > 0) {
      result.checks.forEach(check => {
        // 找到关卡配置中的对应 check（含 displayValue/speechText）
        const levelCheck = activeLevel.validation.checks.find(
          c => c.objectiveId === check.objectiveId
        );

        // 合并：验证结果 + 游戏动画参数
        enrichedChecks.push({
          ...check,
          displayValue: levelCheck?.displayValue || '',
          speechText: check.passed
            ? (levelCheck?.speechText || '✅')
            : (levelCheck?.errorText || '❌ 未通过'),
          errorText: levelCheck?.errorText || '再试试',
        });

        // 更新 objectives UI
        const objIdx = updatedObjectives.findIndex(o => o.id === check.objectiveId);
        if (objIdx >= 0) {
          updatedObjectives[objIdx] = { ...updatedObjectives[objIdx], completed: check.passed };
          if (check.passed) {
            play('hit');
            newLines.push({ type: 'success', prefix: '✅', text: updatedObjectives[objIdx].text });
          } else {
            newLines.push({
              type: 'stderr', prefix: '❌',
              text: `${updatedObjectives[objIdx].text} — ${levelCheck?.errorText || '未通过'}`,
            });
          }
        }
      });
    }

    setObjectives(updatedObjectives);

    // 5. 🎮 将 enrichedChecks 传给游戏引擎，驱动动画！
    //    角色会根据每个 check 的 passed/speechText/displayValue 依次行动
    if (enrichedChecks.length > 0) {
      newLines.push({ type: 'info', prefix: '🎮', text: '代码驱动角色行动中...' });
      setOutputLines(newLines);

      // 播放动画序列（异步等待完成）
      await gameCanvasRef.current?.playCodeResults(enrichedChecks, {
        stdout: result.stdout,
      });
    }

    // 6. 判断通关
    const allPassed = enrichedChecks.length > 0 && enrichedChecks.every(c => c.passed) && !result.error;

    if (allPassed) {
      const xpReward = activeLevel.rewards.xp;
      newLines.push({ type: 'success', prefix: '🎉', text: `关卡通过！获得 ${xpReward} XP` });
      setLevelComplete(true);
      play(activeLevelId.startsWith('boss') ? 'bossDefeat' : 'victory');
      completeLevel(activeLevelId, xpReward);
      // 延迟检查成就（等进度写入 localStorage）
      setTimeout(() => checkAchievements({
        ...progress,
        completedLevels: [...progress.completedLevels, activeLevelId],
        xp: progress.xp + xpReward,
      }), 500);
    } else if (!result.error && enrichedChecks.some(c => !c.passed)) {
      newLines.push({ type: 'info', prefix: '💪', text: '有些目标还没达成，修改代码再试！' });
      play('error');
    }

    setOutputLines([...newLines]);
    setIsRunning(false);
  }, [activeLevel, activeLevelId, code, isRunning, objectives, runCode, completeLevel]);

  // ========== 重置 ==========
  const handleReset = useCallback(() => {
    if (!activeLevel) return;
    setCode(activeLevel.initialCode);
    setObjectives(activeLevel.objectives.map(o => ({ ...o, completed: false })));
    setOutputLines([]);
    setLevelComplete(false);
    setShowHint(false);
    setCurrentHintText('');
    // 重置游戏场景
    gameCanvasRef.current?.resetScene(activeLevel.scene);
  }, [activeLevel]);

  // ========== 提示 ==========
  const handleHint = useCallback(() => {
    if (!activeLevel) return;
    const currentLevel = getHintLevel(activeLevelId);
    if (currentLevel >= activeLevel.hints.length) return;
    useHint(activeLevelId);
    setCurrentHintText(activeLevel.hints[currentLevel]);
    setShowHint(true);
    play('hint');
  }, [activeLevel, activeLevelId, getHintLevel, useHint]);

  // ========== 下一关 ==========
  const handleNextLevel = useCallback(() => {
    const next = getNextLevel(activeLevelId);
    if (next) {
      handleSelectLevel(next.id);
    } else {
      setView('map');
    }
  }, [activeLevelId, handleSelectLevel]);

  const handleBackToMap = useCallback(() => { setView('map'); }, []);

  // ========== Loading ==========
  if (isLoading && view === 'play') {
    return <LoadingScreen progress={loadingProgress} message={loadingMessage} />;
  }

  // ========== 世界地图 ==========
  if (view === 'map') {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="navbar__logo">
            <span className="navbar__logo-icon">⚔️</span>
            CodeQuest
          </div>
          <div className="navbar__stats">
            <button
              className="navbar__icon-btn"
              onClick={() => setShowProgressPanel(p => !p)}
              title="成就总览"
            >🏅</button>
            <button
              className="navbar__icon-btn"
              onClick={toggleSound}
              title={soundEnabled ? '关闭音效' : '开启音效'}
            >{soundEnabled ? '🔊' : '🔇'}</button>
            <div className="navbar__stat navbar__stat--xp">
              <span className="navbar__stat-icon">⭐</span>
              {progress.xp} XP
            </div>
            <div className="navbar__stat">
              <span className="navbar__stat-icon">📊</span>
              {progress.completedLevels.length}/{levels.length}
            </div>
            <button
              className="navbar__icon-btn navbar__icon-btn--danger"
              onClick={() => setShowResetConfirm(true)}
              title="重置进度"
            >🗑️</button>
          </div>
        </nav>
        <WorldMap
          onSelectLevel={handleSelectLevel}
          isLevelUnlocked={isLevelUnlocked}
          isLevelCompleted={isLevelCompleted}
          progress={progress}
          showProgressPanel={showProgressPanel}
          achievements={checkAchievements}
          achievementData={newAchievement}
        />
        <AchievementToast achievement={newAchievement} onDismiss={dismissAchievement} />
        {/* 重置进度确认弹窗 */}
        {showResetConfirm && (
          <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal__icon">⚠️</div>
              <h3 className="modal__title">确认重置进度？</h3>
              <p className="modal__text">
                这将清除所有通关记录、经验值和成就。<br/>
                <strong>此操作不可撤销！</strong>
              </p>
              <div className="modal__actions">
                <button
                  className="modal__btn modal__btn--cancel"
                  onClick={() => setShowResetConfirm(false)}
                >取消</button>
                <button
                  className="modal__btn modal__btn--danger"
                  onClick={() => {
                    resetProgress();
                    setShowResetConfirm(false);
                    play('error');
                  }}
                >确认重置</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ========== 游戏关卡 ==========
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar__logo" onClick={handleBackToMap} style={{ cursor: 'pointer' }}>
          <span className="navbar__logo-icon">⚔️</span>
          CodeQuest
        </div>
        <div className="navbar__level-info">
          <span className="navbar__level-name">
            关卡 {activeLevelId}: {activeLevel?.title}
          </span>
        </div>
        <div className="navbar__stats">
          <button
            className="navbar__icon-btn"
            onClick={toggleSound}
            title={soundEnabled ? '关闭音效' : '开启音效'}
          >{soundEnabled ? '🔊' : '🔇'}</button>
          <div className="navbar__stat navbar__stat--xp">
            <span className="navbar__stat-icon">⭐</span>
            {progress.xp} XP
          </div>
          <kbd className="navbar__shortcut">Esc 返回</kbd>
        </div>
      </nav>

      <div className="main-layout">
        {/* 左侧：游戏画面 + 任务 */}
        <div className="left-panel">
          <GameCanvas
            ref={gameCanvasRef}
            scene={activeLevel?.scene}
          />
          <ObjectivesPanel
            objectives={objectives}
            levelTitle={activeLevel?.title || ''}
          />
          <div className="objectives-panel" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="objectives-panel__title">📖 故事背景</div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {activeLevel?.description}
            </p>
          </div>
        </div>

        {/* 右侧：编辑器 + 操作 + 输出 */}
        <div className="right-panel">
          <div className="editor-tabs">
            <button
              className={`editor-tab ${editorTab === 'code' ? 'editor-tab--active' : ''}`}
              onClick={() => setEditorTab('code')}
            >⌨️ 代码编辑器</button>
            <button
              className={`editor-tab ${editorTab === 'tutorial' ? 'editor-tab--active' : ''}`}
              onClick={() => setEditorTab('tutorial')}
            >📖 知识讲解</button>
          </div>
          {editorTab === 'code' ? (
            <CodeEditor code={code} onChange={setCode} isRunning={isRunning} onRun={handleRun} />
          ) : (
            <TutorialPanel tutorial={getTutorial(activeLevelId)} levelTitle={activeLevel?.title} />
          )}
          <ActionBar
            onRun={handleRun}
            onReset={handleReset}
            onHint={handleHint}
            onNext={handleNextLevel}
            isRunning={isRunning}
            isReady={isReady}
            levelComplete={levelComplete}
            hintLevel={getHintLevel(activeLevelId)}
            maxHints={activeLevel?.hints?.length || 3}
          />
          {showHint && currentHintText && (
            <div className="hint-panel">
              <p className="hint-panel__text">{currentHintText}</p>
              <p className="hint-panel__level">
                提示 {getHintLevel(activeLevelId)}/{activeLevel?.hints?.length || 3}
              </p>
            </div>
          )}
          <OutputPanel lines={outputLines} />
        </div>
      </div>

      {levelComplete && (
        <LevelComplete
          level={activeLevel}
          xp={activeLevel?.rewards?.xp || 0}
          onNext={handleNextLevel}
          onMap={handleBackToMap}
          onClose={() => setLevelComplete(false)}
        />
      )}
      <AchievementToast achievement={newAchievement} onDismiss={dismissAchievement} />
    </div>
  );
}
