import { useState, useEffect } from 'react';
import { DIFFICULTIES, DEFAULT_DIFFICULTY } from '../levels/levelData';

/**
 * 难度选择器 - 显示在关卡标题栏
 * 只有当关卡有 difficulties 字段时才显示
 */
export default function DifficultySelector({ level, value, onChange }) {
  // 如果关卡没有难度变体，不渲染
  if (!level?.difficulties) return null;

  const availableDifficulties = ['easy', ...Object.keys(level.difficulties)];

  return (
    <div className="difficulty-selector">
      {availableDifficulties.map(key => {
        const diff = DIFFICULTIES[key];
        if (!diff) return null;
        return (
          <button
            key={key}
            className={`difficulty-btn ${value === key ? 'difficulty-btn--active' : ''} difficulty-btn--${key}`}
            onClick={() => onChange(key)}
            title={diff.desc}
          >
            {diff.label}
          </button>
        );
      })}
    </div>
  );
}
