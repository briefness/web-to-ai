/**
 * WorldMap - 世界地图 / 关卡选择界面
 *
 * 支持分区显示、Boss 卡片金色光晕、进度统计、进度总览面板
 */
import levels from '../levels/levelData';
import { useAchievements } from '../hooks/useAchievements';

// 难度配置
const DIFFICULTY_MAP = {
  1: { label: '入门', stars: '⭐', color: '#22c55e' },
  2: { label: '基础', stars: '⭐⭐', color: '#38bdf8' },
  3: { label: '进阶', stars: '⭐⭐⭐', color: '#f59e0b' },
  4: { label: '挑战', stars: '⭐⭐⭐⭐', color: '#ef4444' },
  5: { label: 'BOSS', stars: '🔥🔥🔥🔥🔥', color: '#a855f7' },
};

function getDifficulty(level) {
  if (level.id.startsWith('boss')) return DIFFICULTY_MAP[5];
  // 根据关卡 Week 推算难度
  const num = parseInt(level.id.split('-')[0]);
  if (num <= 2) return DIFFICULTY_MAP[1];
  if (num <= 5) return DIFFICULTY_MAP[2];
  if (num <= 9) return DIFFICULTY_MAP[3];
  return DIFFICULTY_MAP[4];
}

export default function WorldMap({ onSelectLevel, isLevelUnlocked, isLevelCompleted, progress }) {
  const { unlockedCount, totalCount } = useAchievements();

  // Group levels by region
  const regions = [];
  let currentRegion = null;

  levels.forEach((level) => {
    if (!currentRegion || currentRegion.name !== level.region) {
      currentRegion = {
        name: level.region,
        icon: level.regionIcon,
        levels: [],
      };
      regions.push(currentRegion);
    }
    currentRegion.levels.push(level);
  });

  return (
    <div className="world-map">
      <div className="world-map__header">
        <h1 className="world-map__title">⚔️ 码界觉醒</h1>
        <p className="world-map__subtitle">
          用代码征服世界 · 总经验值: <span style={{ color: '#fbbf24', fontWeight: 700 }}>{progress.xp} XP</span>
          {' · '}
          <span style={{ color: '#22c55e' }}>
            通关 {progress.completedLevels.length}/{levels.length}
          </span>
          {' · '}
          <span style={{ color: '#a855f7' }}>
            成就 {unlockedCount}/{totalCount}
          </span>
        </p>
      </div>

      <div className="world-map__content">
        {regions.map((region, ri) => {
          const completedInRegion = region.levels.filter(l => isLevelCompleted(l.id)).length;
          const totalInRegion = region.levels.length;
          const allComplete = completedInRegion === totalInRegion;
          
          return (
            <div key={ri} className="world-map__region">
              <h2 className="world-map__region-title">
                <span>{region.icon}</span>
                {region.name}
                {completedInRegion > 0 && (
                  <span className={`world-map__region-badge ${
                    allComplete ? 'world-map__region-badge--complete' : 'world-map__region-badge--progress'
                  }`}>
                    {allComplete ? '✅ 全部通关' : `${completedInRegion}/${totalInRegion}`}
                  </span>
                )}
              </h2>
              <div className="world-map__levels">
                {region.levels.map((level) => {
                  const unlocked = isLevelUnlocked(level.id);
                  const completed = isLevelCompleted(level.id);
                  const isCurrent = progress.currentLevel === level.id;
                  const isBoss = level.id.startsWith('boss');
                  const diff = getDifficulty(level);

                  return (
                    <div
                      key={level.id}
                      className={`level-card ${
                        isBoss ? 'level-card--boss' : ''
                      } ${
                        !unlocked ? 'level-card--locked' :
                        completed ? 'level-card--completed' :
                        isCurrent ? 'level-card--current' : ''
                      }`}
                      onClick={() => unlocked && onSelectLevel(level.id)}
                    >
                      <div className="level-card__top-row">
                        <div className="level-card__id">
                          {isBoss ? '🏆 BOSS' : `关卡 ${level.id}`}
                        </div>
                        <div className="level-card__difficulty" style={{ color: diff.color }}>
                          {diff.stars}
                        </div>
                      </div>
                      <div className="level-card__title">{level.title}</div>
                      <div className="level-card__desc">
                        {level.description.slice(0, 50)}...
                      </div>
                      <div className="level-card__tags">
                        {level.knowledgePoints.slice(0, 3).map((kp, i) => (
                          <span key={i} className="level-card__tag">{kp}</span>
                        ))}
                      </div>
                      <div className="level-card__footer">
                        <span className="level-card__xp">
                          {completed ? '✅ 已通关' : unlocked ? `⭐ ${level.rewards.xp} XP` : '🔒 未解锁'}
                        </span>
                        <span className="level-card__diff-label" style={{ color: diff.color }}>
                          {diff.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
