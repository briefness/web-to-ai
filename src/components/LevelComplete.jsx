/**
 * LevelComplete - 关卡完成奖励弹窗
 * 
 * 击败怪物后显示的庆祝弹窗
 */
import { useState, useEffect } from 'react';

export default function LevelComplete({ level, xp, onNext, onMap }) {
  const [show, setShow] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 100);
    const t2 = setTimeout(() => setShowXP(true), 600);
    const t3 = setTimeout(() => setShowButtons(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const isBoss = level?.id?.startsWith('boss');

  return (
    <div className={`level-complete-overlay ${show ? 'level-complete-overlay--visible' : ''}`}>
      <div className={`level-complete ${show ? 'level-complete--visible' : ''}`}>
        <div className="level-complete__banner">
          {isBoss ? '🏆 BOSS 击败！' : '⚔️ 怪物击败！'}
        </div>
        
        <h2 className="level-complete__title">{level?.title}</h2>
        <p className="level-complete__subtitle">关卡通关！</p>

        <div className={`level-complete__xp ${showXP ? 'level-complete__xp--visible' : ''}`}>
          <span className="level-complete__xp-icon">⭐</span>
          <span className="level-complete__xp-value">+{xp} XP</span>
        </div>

        {level?.knowledgePoints && (
          <div className="level-complete__skills">
            <p className="level-complete__skills-label">掌握技能</p>
            <div className="level-complete__skills-list">
              {level.knowledgePoints.map((kp, i) => (
                <span key={i} className="level-complete__skill-tag">{kp}</span>
              ))}
            </div>
          </div>
        )}

        <div className={`level-complete__actions ${showButtons ? 'level-complete__actions--visible' : ''}`}>
          <button className="level-complete__btn level-complete__btn--next" onClick={onNext}>
            ▶ 下一关
          </button>
          <button className="level-complete__btn level-complete__btn--map" onClick={onMap}>
            🗺️ 世界地图
          </button>
        </div>
      </div>
    </div>
  );
}
