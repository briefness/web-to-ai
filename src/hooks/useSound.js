/**
 * useSound - 游戏音效系统
 *
 * 使用 Web Audio API 合成简单音效，无需外部音频文件
 */
import { useCallback, useState } from 'react';

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', volume = 0.3) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // 静默失败
  }
}

function playSequence(notes, tempo = 120) {
  const beatMs = 60000 / tempo;
  notes.forEach(([freq, beats], i) => {
    setTimeout(() => playTone(freq, beats * beatMs / 1000, 'square', 0.2), i * beatMs * 0.25);
  });
}

const SOUNDS = {
  // 运行代码
  run: () => playTone(440, 0.1, 'sine', 0.15),

  // 目标命中（上升音阶）
  hit: () => {
    playTone(523, 0.1, 'square', 0.2);
    setTimeout(() => playTone(659, 0.1, 'square', 0.2), 80);
  },

  // 关卡通关（胜利旋律）
  victory: () => playSequence([[523, 1], [659, 1], [784, 1], [1047, 2]], 180),

  // Boss 击败（史诗旋律）
  bossDefeat: () => playSequence([[392, 1], [523, 1], [659, 1], [784, 1], [1047, 3]], 160),

  // 代码错误
  error: () => playTone(200, 0.3, 'sawtooth', 0.15),

  // 成就解锁
  achievement: () => {
    playTone(784, 0.15, 'sine', 0.2);
    setTimeout(() => playTone(988, 0.15, 'sine', 0.2), 100);
    setTimeout(() => playTone(1319, 0.3, 'sine', 0.25), 200);
  },

  // 选择关卡
  select: () => playTone(660, 0.08, 'sine', 0.1),

  // 提示
  hint: () => playTone(440, 0.15, 'triangle', 0.1),
};

export function useSound() {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem('codequest_sound') === 'on';
    } catch {
      return false;
    }
  });

  const play = useCallback((name) => {
    if (!enabled || !SOUNDS[name]) return;
    SOUNDS[name]();
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      try { localStorage.setItem('codequest_sound', next ? 'on' : 'off'); } catch {}
      return next;
    });
  }, []);

  return { play, toggle, enabled };
}
