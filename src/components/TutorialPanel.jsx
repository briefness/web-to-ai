/**
 * TutorialPanel - 关卡知识讲解面板
 *
 * 渲染结构化的教程内容：标题、段落、代码块、提示框、Manim 视频、Canvas 动画
 */
import { useRef, useEffect, useState } from 'react';

export default function TutorialPanel({ tutorial, levelTitle }) {
  if (!tutorial) {
    return (
      <div className="tutorial-panel tutorial-panel--empty">
        <p>📚 本关暂无知识讲解</p>
      </div>
    );
  }

  return (
    <div className="tutorial-panel">
      <div className="tutorial-panel__header">
        <span className="tutorial-panel__icon">📖</span>
        <h2 className="tutorial-panel__title">{levelTitle} — 知识讲解</h2>
      </div>
      <div className="tutorial-panel__body">
        {tutorial.sections.map((section, i) => (
          <TutorialSection key={i} section={section} />
        ))}
      </div>
    </div>
  );
}

function TutorialSection({ section }) {
  switch (section.type) {
    case 'heading':
      return <h3 className="tutorial-section__heading">{section.content}</h3>;

    case 'text':
      return (
        <p
          className="tutorial-section__text"
          dangerouslySetInnerHTML={{
            __html: section.content
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/`([^`]+)`/g, '<code>$1</code>'),
          }}
        />
      );

    case 'code':
      return (
        <div className="tutorial-section__code">
          {section.label && (
            <div className="tutorial-section__code-label">{section.label}</div>
          )}
          <pre><code>{section.content}</code></pre>
        </div>
      );

    case 'tip':
      return (
        <div className="tutorial-section__tip">
          <span className="tutorial-section__tip-icon">💡</span>
          <p
            dangerouslySetInnerHTML={{
              __html: section.content
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/`([^`]+)`/g, '<code>$1</code>'),
            }}
          />
        </div>
      );

    case 'compare':
      return (
        <div className="tutorial-section__compare">
          <div className="tutorial-section__compare-col">
            <div className="tutorial-section__compare-label">
              {section.labels?.[0] || 'JS/TS'}
            </div>
            <pre><code>{section.left}</code></pre>
          </div>
          <div className="tutorial-section__compare-arrow">→</div>
          <div className="tutorial-section__compare-col">
            <div className="tutorial-section__compare-label">
              {section.labels?.[1] || 'Python'}
            </div>
            <pre><code>{section.right}</code></pre>
          </div>
        </div>
      );

    case 'list':
      return (
        <ul className="tutorial-section__list">
          {section.items.map((item, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{
                __html: item
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>'),
              }}
            />
          ))}
        </ul>
      );

    case 'video':
      return <VideoSection src={section.src} caption={section.caption} />;

    case 'animation':
      return <CanvasAnimation draw={section.draw} caption={section.caption} height={section.height || 200} />;

    default:
      return null;
  }
}

/** Manim 预渲染视频播放器 */
function VideoSection({ src, caption }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="tutorial-section__video tutorial-section__video--error">
        <span>🎬</span> 动画加载失败
      </div>
    );
  }

  return (
    <div className="tutorial-section__video">
      {caption && <div className="tutorial-section__video-caption">{caption}</div>}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onError={() => setError(true)}
        className="tutorial-section__video-player"
      />
    </div>
  );
}

/** Canvas 内联动画 */
function CanvasAnimation({ draw, caption, height }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !draw) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const loop = (time) => {
      const w = canvas.width / dpr;
      const h = height;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      try {
        draw(ctx, w, h, time, frameRef.current);
      } catch { /* silent */ }
      ctx.restore();
      frameRef.current++;
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [draw, height]);

  return (
    <div className="tutorial-section__animation">
      {caption && <div className="tutorial-section__animation-caption">{caption}</div>}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: `${height}px` }}
        className="tutorial-section__animation-canvas"
      />
    </div>
  );
}

