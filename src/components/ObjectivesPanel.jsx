/**
 * ObjectivesPanel - 任务目标面板
 */
export default function ObjectivesPanel({ objectives, levelTitle }) {
  return (
    <div className="objectives-panel">
      <div className="objectives-panel__title">📋 任务目标 — {levelTitle}</div>
      <ul className="objectives-panel__list">
        {objectives.map((obj) => (
          <li
            key={obj.id}
            className={`objective ${obj.completed ? 'objective--completed' : ''}`}
          >
            <span className="objective__icon">
              {obj.completed ? '✅' : '⬜'}
            </span>
            <span>{obj.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
