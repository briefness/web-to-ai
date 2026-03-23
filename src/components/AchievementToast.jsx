/**
 * AchievementToast - 成就解锁提示
 */
import { useState, useEffect } from 'react';

export default function AchievementToast({ achievement, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!achievement) return;
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 400);
    }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div className={`achievement-toast ${visible ? 'achievement-toast--visible' : ''}`}>
      <div className="achievement-toast__icon">{achievement.icon}</div>
      <div className="achievement-toast__content">
        <div className="achievement-toast__label">🏅 成就解锁！</div>
        <div className="achievement-toast__title">{achievement.title}</div>
        <div className="achievement-toast__desc">{achievement.description}</div>
      </div>
    </div>
  );
}
