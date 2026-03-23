/**
 * usePyodide - 管理 Pyodide Web Worker 的生命周期
 *
 * 功能：
 * - 自动初始化 Pyodide WASM 运行时
 * - 安全执行用户代码 + 验证
 * - 死循环检测（8秒超时自动 terminate + 重建 worker）
 */
import { useState, useEffect, useRef, useCallback } from 'react';

const EXECUTION_TIMEOUT = 8000;

export function usePyodide() {
  const workerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('正在启动...');
  const pendingRef = useRef(null);
  const idCounter = useRef(0);

  const handleMessage = useCallback((e) => {
    const { type, progress, message, id, stdout, stderr, checks, error } = e.data;

    switch (type) {
      case 'loading':
        setLoadingProgress(progress || 0);
        setLoadingMessage(message || '加载中...');
        break;
      case 'ready':
        setIsReady(true);
        setIsLoading(false);
        setLoadingProgress(100);
        break;
      case 'result':
        if (pendingRef.current && pendingRef.current.id === id) {
          clearTimeout(pendingRef.current.timer);
          pendingRef.current.resolve({ stdout, stderr, checks, error });
          pendingRef.current = null;
        }
        break;
      case 'error':
        if (pendingRef.current) {
          clearTimeout(pendingRef.current.timer);
          pendingRef.current.resolve({ stdout: '', stderr: error, checks: [], error });
          pendingRef.current = null;
        }
        break;
    }
  }, []);

  const createWorker = useCallback(() => {
    const worker = new Worker('/pyodide-worker.js');
    worker.onmessage = handleMessage;
    worker.onerror = (err) => {
      console.error('Worker error:', err);
      if (pendingRef.current) {
        clearTimeout(pendingRef.current.timer);
        pendingRef.current.resolve({
          stdout: '',
          stderr: `Worker 错误: ${err.message}`,
          checks: [],
          error: err.message,
        });
        pendingRef.current = null;
      }
    };
    return worker;
  }, [handleMessage]);

  useEffect(() => {
    const worker = createWorker();
    workerRef.current = worker;
    return () => worker.terminate();
  }, [createWorker]);

  const runCode = useCallback((code, checks = []) => {
    return new Promise((resolve) => {
      if (!workerRef.current) {
        resolve({ stdout: '', stderr: 'Worker 未初始化', checks: [], error: 'Worker 未初始化' });
        return;
      }

      const id = ++idCounter.current;

      const timer = setTimeout(() => {
        // 超时：杀死旧 worker，重建新 worker
        workerRef.current.terminate();
        const newWorker = createWorker();
        workerRef.current = newWorker;

        pendingRef.current = null;
        resolve({
          stdout: '',
          stderr: '⏰ 代码执行超时（8秒），请检查是否有死循环！',
          checks: [],
          error: '执行超时',
        });

        // 重新初始化 Pyodide
        setIsReady(false);
        setIsLoading(true);
        newWorker.postMessage({ type: 'init' });
      }, EXECUTION_TIMEOUT);

      pendingRef.current = { id, resolve, timer };
      workerRef.current.postMessage({ type: 'run', code, checks, id });
    });
  }, [createWorker]);

  return { isReady, isLoading, loadingProgress, loadingMessage, runCode };
}
