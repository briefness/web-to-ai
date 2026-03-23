/**
 * LoadingScreen - Pyodide 加载等待屏
 */
export default function LoadingScreen({ progress, message }) {
  return (
    <div className="loading-screen">
      <div className="loading-screen__title">⚔️ 码界觉醒</div>
      <div className="loading-screen__bar">
        <div
          className="loading-screen__fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loading-screen__text">{message}</div>
    </div>
  );
}
