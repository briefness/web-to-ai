/**
 * ActionBar - 运行/重置/提示按钮栏
 */
export default function ActionBar({
  onRun,
  onReset,
  onHint,
  onNext,
  isRunning,
  isReady,
  levelComplete,
  hintLevel,
  maxHints,
}) {
  return (
    <div className="action-bar">
      {!levelComplete ? (
        <>
          <button
            className="action-bar__btn action-bar__btn--run"
            onClick={onRun}
            disabled={isRunning || !isReady}
          >
            {isRunning ? '⏳ 运行中...' : '▶ 运行'}
          </button>
          <button
            className="action-bar__btn action-bar__btn--reset"
            onClick={onReset}
            disabled={isRunning}
          >
            🔄 重置
          </button>
          <button
            className="action-bar__btn action-bar__btn--hint"
            onClick={onHint}
            disabled={hintLevel >= maxHints}
          >
            💡 提示 {hintLevel > 0 ? `(${hintLevel}/${maxHints})` : ''}
          </button>
        </>
      ) : (
        <button
          className="action-bar__btn action-bar__btn--next"
          onClick={onNext}
        >
          ➡️ 下一关
        </button>
      )}
    </div>
  );
}
