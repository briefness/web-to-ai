/**
 * Pyodide Web Worker
 * 在隔离的 Worker 线程中运行用户 Python 代码
 * 主线程通过 postMessage/onmessage 通信
 */

/* global importScripts, loadPyodide */

let pyodide = null;
let isLoading = false;

async function initPyodide() {
  if (pyodide) return pyodide;
  if (isLoading) return null;

  isLoading = true;
  self.postMessage({ type: 'loading', progress: 10, message: '正在加载 Python 运行时...' });

  try {
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js');
    self.postMessage({ type: 'loading', progress: 50, message: '正在初始化 Python...' });

    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
    });

    self.postMessage({ type: 'loading', progress: 90, message: '准备就绪！' });
    self.postMessage({ type: 'ready' });
    isLoading = false;
    return pyodide;
  } catch (err) {
    isLoading = false;
    self.postMessage({ type: 'error', error: `Pyodide 加载失败: ${err.message}` });
    return null;
  }
}

// Handle messages from main thread
self.onmessage = async function (e) {
  const { type, code, checks, id } = e.data;

  if (type === 'init') {
    await initPyodide();
    return;
  }

  if (type === 'run') {
    if (!pyodide) {
      await initPyodide();
      if (!pyodide) {
        self.postMessage({ type: 'result', id, error: 'Python 运行时未就绪' });
        return;
      }
    }

    try {
      // Capture stdout
      pyodide.runPython(`
import sys
from io import StringIO
__stdout_capture = StringIO()
__stderr_capture = StringIO()
sys.stdout = __stdout_capture
sys.stderr = __stderr_capture
`);

      // Execute user code
      pyodide.runPython(code);

      // Get stdout/stderr
      const stdout = pyodide.runPython('__stdout_capture.getvalue()');
      const stderr = pyodide.runPython('__stderr_capture.getvalue()');

      // Restore stdout
      pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

      // Run validation checks
      const checkResults = [];
      if (checks && checks.length > 0) {
        for (const check of checks) {
          try {
            const result = runCheck(check, stdout);
            checkResults.push(result);
          } catch (checkErr) {
            checkResults.push({
              objectiveId: check.objectiveId,
              passed: false,
              error: checkErr.message,
            });
          }
        }
      }

      self.postMessage({
        type: 'result',
        id,
        stdout: stdout || '',
        stderr: stderr || '',
        checks: checkResults,
        error: null,
      });
    } catch (err) {
      // Restore stdout on error
      try {
        pyodide.runPython(`
import sys
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
      } catch (_) {
        // ignore
      }

      let errorMsg = err.message || String(err);
      // Clean up Pyodide error message
      if (errorMsg.includes('PythonError:')) {
        const lines = errorMsg.split('\n');
        const pythonError = lines.filter(l =>
          l.includes('Error:') || l.includes('error:') || l.trim().startsWith('File')
        );
        errorMsg = pythonError.length > 0 ? pythonError.join('\n') : errorMsg;
      }

      self.postMessage({
        type: 'result',
        id,
        stdout: '',
        stderr: errorMsg,
        checks: [],
        error: errorMsg,
      });
    }
  }
};

function runCheck(check, stdout) {
  const { type, objectiveId, variable, expression, expected, args, compareType } = check;

  switch (type) {
    case 'variable_check': {
      let actual;
      try {
        actual = pyodide.runPython(variable);
      } catch {
        return { objectiveId, passed: false, error: `变量 ${variable} 未定义` };
      }

      // Convert Pyodide proxy to JS
      if (actual && typeof actual.toJs === 'function') {
        actual = actual.toJs();
      }

      let passed;
      if (compareType === 'deep') {
        passed = JSON.stringify(convertToJS(actual)) === JSON.stringify(expected);
      } else {
        passed = convertToJS(actual) === expected || Number(actual) === Number(expected);
      }

      return { objectiveId, passed };
    }

    case 'expression_check': {
      let actual;
      try {
        actual = pyodide.runPython(expression);
      } catch (err) {
        return { objectiveId, passed: false, error: err.message };
      }

      if (actual && typeof actual.toJs === 'function') {
        actual = actual.toJs();
      }

      const jsActual = convertToJS(actual);
      const passed = jsActual === expected || JSON.stringify(jsActual) === JSON.stringify(expected);
      return { objectiveId, passed };
    }

    case 'function_call': {
      let actual;
      const func = check.function || check.functionName;
      const argsStr = (args || []).map(a => JSON.stringify(a)).join(', ');
      try {
        actual = pyodide.runPython(`${func}(${argsStr})`);
      } catch (err) {
        return { objectiveId, passed: false, error: `函数 ${func} 调用失败: ${err.message}` };
      }

      if (actual && typeof actual.toJs === 'function') {
        actual = actual.toJs();
      }

      const passed = convertToJS(actual) === expected;
      return { objectiveId, passed };
    }

    case 'output_match': {
      const passed = stdout.trim() === (check.expected || expected || '').trim();
      return { objectiveId, passed };
    }

    case 'output_contains': {
      const target = check.expected || expected || '';
      const passed = stdout.includes(target);
      return { objectiveId, passed };
    }

    default:
      return { objectiveId, passed: false, error: `未知验证类型: ${type}` };
  }
}

function convertToJS(val) {
  if (val === undefined || val === null) return val;
  if (val === true || val === false) return val;
  if (typeof val === 'number' || typeof val === 'string') return val;
  if (typeof val === 'boolean') return val;
  // Pyodide Map → JS object
  if (val instanceof Map) {
    const obj = {};
    val.forEach((v, k) => { obj[k] = convertToJS(v); });
    return obj;
  }
  // Array-like
  if (Array.isArray(val)) {
    return val.map(convertToJS);
  }
  return val;
}

// Auto-init on worker start
initPyodide();
