/**
 * CodeEditor - Monaco 代码编辑器组件
 *
 * 支持 Ctrl/Cmd+Enter 快捷键运行代码
 */
import { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ code, onChange, isRunning, onRun }) {
  const editorRef = useRef(null);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    // Ctrl/Cmd + Enter → 运行代码
    editor.addAction({
      id: 'run-code',
      label: '运行代码',
      keybindings: [
        // Ctrl+Enter (Windows/Linux)
        2048 /* CtrlCmd */ | 3 /* Enter */,
      ],
      run: () => {
        if (onRun && !isRunning) onRun();
      },
    });
  };

  return (
    <div className="editor-panel">
      <div className="editor-panel__header">
        <div className="editor-panel__tab">
          <span className="editor-panel__tab-dot" />
          solution.py
        </div>
        <div className="editor-panel__shortcut">
          <kbd>⌘</kbd>+<kbd>↵</kbd> 运行
        </div>
      </div>
      <div className="editor-panel__body">
        <Editor
          height="100%"
          language="python"
          theme="vs-dark"
          value={code}
          onChange={onChange}
          onMount={handleEditorMount}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            wordWrap: 'on',
            tabSize: 4,
            insertSpaces: true,
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            readOnly: isRunning,
            // 增强功能
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoIndent: 'full',
            formatOnPaste: true,
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'mouseover',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            stickyScroll: { enabled: false },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showVariables: true,
            },
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false,
            },
          }}
        />
      </div>
    </div>
  );
}
