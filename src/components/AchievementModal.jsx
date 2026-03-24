/**
 * AchievementModal - 成就总览弹窗
 *
 * 以 Modal 形式展示成就墙，点击遮罩层或关闭按钮即可关闭。
 */
import { useEffect } from 'react';
import { useAchievements } from '../hooks/useAchievements';
import levels from '../levels/levelData';

export default function AchievementModal({ progress, onClose }) {
  const { achievements, unlockedCount, totalCount } = useAchievements();

  // Esc 键关闭弹窗
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal achievement-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部标题 + 关闭按钮 */}
        <div className="achievement-modal__header">
          <h3 className="achievement-modal__title">
            🏅 成就总览
          </h3>
          <button
            className="achievement-modal__close"
            onClick={onClose}
            title="关闭"
          >
            ✕
          </button>
        </div>

        {/* 进度条 */}
        <div className="achievement-modal__progress">
          <span className="achievement-modal__progress-label">
            {unlockedCount} / {totalCount} 已解锁
          </span>
          <div className="progress-panel__bar">
            <div
              className="progress-panel__bar-fill"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* 成就列表 */}
        <div className="progress-panel__grid">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`progress-panel__badge ${ach.unlocked ? 'progress-panel__badge--unlocked' : ''}`}
            >
              <span className="progress-panel__badge-icon">{ach.icon}</span>
              <span className="progress-panel__badge-name">{ach.title}</span>
              <span className="progress-panel__badge-desc">{ach.description}</span>
            </div>
          ))}
        </div>

        {/* 底部统计 */}
        <div className="progress-panel__stats">
          <div className="progress-panel__stat">
            <span>⭐</span> {progress.xp} XP
          </div>
          <div className="progress-panel__stat">
            <span>📊</span> {progress.completedLevels.length} / {levels.length} 关卡
          </div>
          <div className="progress-panel__stat">
            <span>🏅</span> {unlockedCount} / {totalCount} 成就
          </div>
        </div>
      </div>
    </div>
  );
}
