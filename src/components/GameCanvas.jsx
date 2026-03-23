/**
 * GameCanvas - 游戏画面组件
 * 桥接 GameRenderer 和 React 状态
 *
 * 移除了冗余的成功 overlay（由 LevelComplete 弹窗替代）
 */
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { GameRenderer } from '../engine/GameRenderer';

const GameCanvas = forwardRef(function GameCanvas({ scene }, ref) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const renderer = new GameRenderer(canvasRef.current);
    rendererRef.current = renderer;
    if (scene) renderer.resetScene(scene);
    return () => renderer.destroy();
  }, []);

  // Reset scene when level changes
  useEffect(() => {
    if (rendererRef.current && scene) {
      rendererRef.current.resetScene(scene);
    }
  }, [scene]);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    /**
     * 🔑 核心：播放代码执行结果的动画序列
     */
    playCodeResults: (checkResults, codeOutput) => {
      if (!rendererRef.current) return Promise.resolve();
      rendererRef.current.playCodeResults(checkResults, codeOutput);

      return new Promise((resolve) => {
        const check = () => {
          if (rendererRef.current?.isAnimComplete()) {
            resolve();
          } else {
            setTimeout(check, 100);
          }
        };
        setTimeout(check, 300);
      });
    },

    resetScene: (sceneConfig) => {
      rendererRef.current?.resetScene(sceneConfig);
    },
  }));

  return (
    <div className="game-panel">
      <canvas ref={canvasRef} />
    </div>
  );
});

export default GameCanvas;
