/**
 * OutputPanel - 代码输出/日志面板
 */
import { useEffect, useRef } from 'react';

export default function OutputPanel({ lines }) {
  const containerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="output-panel" ref={containerRef}>
      <div className="output-panel__title">📊 输出</div>
      {lines.length === 0 && (
        <div className="output-line output-line--system">点击 ▶ 运行 来执行代码...</div>
      )}
      {lines.map((line, i) => (
        <div key={i} className={`output-line output-line--${line.type}`}>
          {line.prefix && <span>{line.prefix} </span>}
          {line.text}
        </div>
      ))}
    </div>
  );
}
