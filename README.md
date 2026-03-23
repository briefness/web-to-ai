# ⚔️ 码界觉醒 — 用代码征服 AI 世界

> 一款面向前端工程师的交互式编程闯关游戏，从 Python 零基础到 AI 全栈工程师。

![Tech](https://img.shields.io/badge/React-19-blue) ![Tech](https://img.shields.io/badge/Vite-6-purple) ![Levels](https://img.shields.io/badge/关卡-94-green) ![Difficulty](https://img.shields.io/badge/难度-3级-orange)

## 🎮 项目简介

**码界觉醒**是一款在浏览器中运行的编程教学游戏。玩家通过填写代码中的 `___` 空缺来闯关，每关都有实时的代码执行、验证反馈和游戏化动画。

核心特色：
- 🐍 **从 Python 到 AI** — 94 关覆盖完整 AI 工程师技能栈
- 🎯 **三级难度** — 简单（填空）→ 一般（补全）→ 困难（从零写）
- 📖 **知识讲解** — 每关配有详细教程，JS/TS 对照语法速查
- 🏆 **成就系统** — XP 经验值、Boss 挑战、毕业通关
- 🔊 **音效反馈** — 过关音效、错误提示、Boss 战斗音乐
- 🎨 **像素风 UI** — Canvas 游戏场景 + 响应式布局

## 📚 课程体系

| 区域 | 关卡数 | 内容 |
|------|--------|------|
| 🏔️ Python 山谷 | 21 关 | 变量、列表、字典、函数、OOP、装饰器、生成器、正则、pathlib、asyncio |
| 🏰 API 城堡 | 19 关 | FastAPI 路由、Pydantic、依赖注入、JWT 认证、CRUD、中间件 |
| 🌌 AI 星域 | 15 关 | Token 计费、Prompt 工程、Few-shot、CoT、向量搜索、RAG 管道 |
| 🔥 实战熔炉 | 27 关 | 聊天系统、流式输出、知识库、Agent、ReAct、LangGraph、MCP |
| 🚀 未来世界 | 12 关 | 多模态 AI、评估体系、部署运维、作品集、终极大考 |

每个小节末尾有 **综合复习关** 和 **Boss 关**（6-8 个验证点，综合考核）。

## 🏗️ 技术栈

- **前端框架**: React 19 + Vite 6
- **代码执行**: Pyodide（浏览器端 Python 运行时）
- **游戏引擎**: Canvas 2D（自研像素风渲染器）
- **状态管理**: React Hooks + localStorage 持久化
- **音频**: Web Audio API
- **样式**: 纯 CSS（Design System 设计令牌）

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/your-repo/web-to-ai.git
cd web-to-ai

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 `http://localhost:5173` 开始游戏。

## 📁 项目结构

```
src/
├── App.jsx                  # 主应用（路由、游戏状态机）
├── components/
│   ├── WorldMap.jsx         # 世界地图（关卡选择）
│   ├── CodeEditor.jsx       # 代码编辑器
│   ├── TutorialPanel.jsx    # 知识讲解面板
│   ├── GameCanvas.jsx       # Canvas 游戏场景
│   ├── ActionBar.jsx        # 操作栏（运行/提示）
│   └── LoadingScreen.jsx    # 加载画面
├── levels/
│   ├── levelData.js         # 94 关关卡数据
│   ├── difficultyVariants.js # 难度变体（normal/hard）
│   └── tutorialData.js      # 知识讲解内容
├── hooks/
│   ├── useGameProgress.js   # 进度管理
│   ├── useSound.js          # 音效系统
│   └── useAchievements.js   # 成就系统
├── engine/
│   ├── GameRenderer.js      # Canvas 渲染引擎
│   └── pyodideRunner.js     # Python 执行器
├── animations/
│   └── canvasAnimations.js  # 关卡动画
└── styles/
    └── index.css            # 设计系统
```

## 🎮 游戏机制

### 三级难度

| 难度 | 描述 | 目标 |
|------|------|------|
| ⭐ 简单 | 完整代码 + 2-3 个填空 | 理解概念 |
| ⭐⭐ 一般 | 不同场景 + 5-6 个填空 | 掌握用法 |
| ⭐⭐⭐ 困难 | 只有任务描述，从零实现 | 实战能力 |

### Boss 关卡

8 个 Boss 关卡（含终极大考），每个 6-8 个验证点，综合考核整个小节的知识：

- **Boss 1**: Python 全技能（OOP + 装饰器 + 生成器 + 正则）
- **Boss FA**: FastAPI 全栈（路由 + Pydantic + Depends + 错误处理）
- **Boss 2**: 短链服务（哈希 + Base62 + ORM + 统计）
- **Boss 3**: Prompt Lab（Token + Few-shot + CoT + 向量搜索）
- **Boss 5**: MiniChat（流式 + 对话 + 安全 + 路由）
- **Boss 6**: DocMind（文档解析 + 检索 + 重排 + 知识库）
- **Boss 4**: ResearchBot（Agent + ReAct + 状态机 + 工具链）
- **Boss Final**: 终极大考（Python + API + RAG + Agent + 安全 + 部署）

## 📄 License

MIT

---

**码界觉醒** — 让每一行代码都是一次冒险 ⚔️
