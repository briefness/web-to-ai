/**
 * canvasAnimations.js - Canvas 内联动画库
 *
 * 每个动画函数签名: (ctx, w, h, time, frame) => void
 * - ctx: CanvasRenderingContext2D
 * - w, h: canvas 宽高
 * - time: 毫秒级时间戳
 * - frame: 帧计数
 */

const C = {
  bg: '#0a0e17',
  blue: '#4fc3f7',
  green: '#66bb6a',
  yellow: '#fdd835',
  purple: '#ab47bc',
  red: '#ef5350',
  orange: '#ffa726',
  grey: '#78909c',
  white: '#e0e0e0',
};

// ===== 工具函数 =====
function drawBox(ctx, x, y, w, h, color, text, fontSize = 14) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + w / 2, y + h / 2);
}

function drawArrow(ctx, x1, y1, x2, y2, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 8 * Math.cos(angle - 0.4), y2 - 8 * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - 8 * Math.cos(angle + 0.4), y2 - 8 * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function pulse(time, period = 2000) {
  return 0.5 + 0.5 * Math.sin((time / period) * Math.PI * 2);
}

// ===== 1-3 字典：键值对动画 =====
export function anim_1_3(ctx, w, h, time) {
  const keys = ['name', 'age', 'city'];
  const vals = ['"Alice"', '25', '"北京"'];
  const colors = [C.green, C.yellow, C.purple];
  const t = (time % 4000) / 4000;
  const show = Math.floor(t * 4);

  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = C.white;
  ctx.fillText('dict = { key: value }', w / 2, 20);

  for (let i = 0; i < 3; i++) {
    if (i > show) break;
    const y = 45 + i * 50;
    const alpha = i === show ? pulse(time, 500) : 1;
    ctx.globalAlpha = alpha;
    drawBox(ctx, w * 0.15, y, w * 0.25, 35, colors[i], keys[i]);
    ctx.fillStyle = C.grey;
    ctx.font = '18px monospace';
    ctx.fillText('→', w * 0.47, y + 17);
    drawBox(ctx, w * 0.55, y, w * 0.3, 35, colors[i], vals[i]);
    ctx.globalAlpha = 1;
  }
}

// ===== 1-5 类：UML 简图 =====
export function anim_1_5(ctx, w, h, time) {
  const t = pulse(time, 3000);
  const cx = w / 2;

  // 父类
  drawBox(ctx, cx - 70, 10, 140, 35, C.blue, 'class Animal');
  // 方法
  ctx.font = '11px monospace';
  ctx.fillStyle = C.grey;
  ctx.textAlign = 'center';
  ctx.fillText('def __init__(self, name)', cx, 60);
  ctx.fillText('def speak(self)  → "..."', cx, 75);

  // 继承箭头
  drawArrow(ctx, cx - 60, 90, cx - 60, 110, C.white);
  drawArrow(ctx, cx + 60, 90, cx + 60, 110, C.white);

  // 子类
  const hue1 = `rgba(102,187,106,${0.5 + t * 0.5})`;
  const hue2 = `rgba(171,71,188,${0.5 + (1 - t) * 0.5})`;
  drawBox(ctx, cx - 140, 115, 120, 30, hue1, 'class Dog(Animal)');
  drawBox(ctx, cx + 20, 115, 120, 30, hue2, 'class Cat(Animal)');

  ctx.font = '11px monospace';
  ctx.fillStyle = C.green;
  ctx.fillText('"汪!"', cx - 80, 160);
  ctx.fillStyle = C.purple;
  ctx.fillText('"喵!"', cx + 80, 160);

  ctx.fillStyle = C.yellow;
  ctx.font = '12px monospace';
  ctx.fillText('self = this (JS)', cx, h - 10);
}

// ===== 2-1 条件：流程图 =====
export function anim_2_1(ctx, w, h, time) {
  const cx = w / 2;
  const t = (time % 3000) / 3000;
  const branch = t < 0.5 ? 'left' : 'right';

  // 条件菱形
  ctx.strokeStyle = C.yellow;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, 15); ctx.lineTo(cx + 60, 45);
  ctx.lineTo(cx, 75); ctx.lineTo(cx - 60, 45);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = C.yellow;
  ctx.font = '12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('score >= 90?', cx, 48);

  // 分支
  const leftColor = branch === 'left' ? C.green : C.grey;
  const rightColor = branch === 'right' ? C.red : C.grey;

  drawArrow(ctx, cx - 40, 75, cx - 80, 110, leftColor);
  drawArrow(ctx, cx + 40, 75, cx + 80, 110, rightColor);

  ctx.fillStyle = leftColor;
  ctx.fillText('Yes → "A"', cx - 80, 100);
  ctx.fillStyle = rightColor;
  ctx.fillText('No → elif...', cx + 80, 100);

  drawBox(ctx, cx - 120, 115, 80, 30, leftColor, 'grade="A"', 12);
  drawBox(ctx, cx + 40, 115, 80, 30, rightColor, 'elif...', 12);

  // 高亮活跃分支
  const activeBox = branch === 'left' ? [cx - 120, 115, 80, 30] : [cx + 40, 115, 80, 30];
  ctx.strokeStyle = C.white;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(activeBox[0] - 3, activeBox[1] - 3, activeBox[2] + 6, activeBox[3] + 6);
  ctx.setLineDash([]);
}

// ===== 2-2 循环：迭代器 =====
export function anim_2_2(ctx, w, h, time) {
  const items = [0, 1, 2, 3, 4];
  const boxW = 40;
  const startX = (w - items.length * (boxW + 8)) / 2;
  const idx = Math.floor((time % 2500) / 500) % items.length;

  ctx.fillStyle = C.white;
  ctx.font = '14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('for i in range(5):', w / 2, 20);

  for (let i = 0; i < items.length; i++) {
    const x = startX + i * (boxW + 8);
    const isActive = i === idx;
    const color = i < idx ? C.grey : isActive ? C.green : C.white;
    drawBox(ctx, x, 40, boxW, 35, color, String(items[i]));
    if (isActive) {
      ctx.fillStyle = C.yellow;
      ctx.font = '18px monospace';
      ctx.fillText('▼', x + boxW / 2, 88);
      ctx.font = '13px monospace';
      ctx.fillText(`i = ${items[i]}`, x + boxW / 2, 110);
    }
  }

  ctx.fillStyle = C.green;
  ctx.font = '12px monospace';
  ctx.fillText(`print(${items[idx]})`, w / 2, h - 15);
}

// ===== 2-3 异常处理：try/except 流 =====
export function anim_2_3(ctx, w, h, time) {
  const cx = w / 2;
  const t = (time % 4000) / 4000;
  const hasError = t > 0.5;

  drawBox(ctx, cx - 60, 10, 120, 30, C.blue, 'try:', 13);
  drawArrow(ctx, cx, 40, cx, 55, C.white);

  if (!hasError) {
    drawBox(ctx, cx - 80, 60, 160, 30, C.green, 'json.loads(data) ✓', 12);
    drawArrow(ctx, cx, 90, cx, 105, C.green);
    drawBox(ctx, cx - 50, 110, 100, 25, C.grey, 'finally:', 12);
    ctx.fillStyle = C.green;
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('→ 执行成功，跳过 except', cx, h - 10);
  } else {
    drawBox(ctx, cx - 80, 60, 160, 30, C.red, 'ValueError! ✗', 12);
    drawArrow(ctx, cx, 90, cx, 105, C.red);
    drawBox(ctx, cx - 80, 110, 160, 25, C.yellow, 'except ValueError:', 12);
    drawArrow(ctx, cx, 135, cx, 148, C.yellow);
    drawBox(ctx, cx - 50, 150, 100, 25, C.grey, 'finally:', 12);
    ctx.fillStyle = C.yellow;
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('→ 捕获异常，执行 except', cx, h - 10);
  }
}

// ===== 3-2 数据验证 =====
export function anim_3_2(ctx, w, h, time) {
  const cx = w / 2;
  const fields = [
    { name: 'name: str', val: '"Alice"', ok: true },
    { name: 'age: int >= 0', val: '-5', ok: false },
    { name: 'email: EmailStr', val: '"a@b.com"', ok: true },
  ];
  const idx = Math.floor((time % 3000) / 1000) % 3;

  ctx.fillStyle = C.white;
  ctx.font = '14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Pydantic 数据验证', cx, 18);

  fields.forEach((f, i) => {
    const y = 35 + i * 45;
    const active = i <= idx;
    const color = !active ? C.grey : f.ok ? C.green : C.red;
    const icon = !active ? '?' : f.ok ? '✓' : '✗';
    drawBox(ctx, 20, y, w * 0.4, 30, color, f.name, 11);
    drawBox(ctx, w * 0.55, y, w * 0.25, 30, color, f.val, 11);
    ctx.fillStyle = color;
    ctx.font = '18px monospace';
    ctx.fillText(icon, w - 30, y + 15);
  });
}

// ===== 3-3 CRUD =====
export function anim_3_3(ctx, w, h, time) {
  const ops = [
    { name: 'CREATE', color: C.green, icon: '+' },
    { name: 'READ', color: C.blue, icon: '📖' },
    { name: 'UPDATE', color: C.yellow, icon: '✏️' },
    { name: 'DELETE', color: C.red, icon: '🗑️' },
  ];
  const active = Math.floor((time % 4000) / 1000);
  const cx = w / 2;

  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = C.white;
  ctx.fillText('数据库 CRUD 操作', cx, 18);

  ops.forEach((op, i) => {
    const x = 20 + i * (w - 40) / 4;
    const bw = (w - 60) / 4;
    const isActive = i === active;
    const color = isActive ? op.color : C.grey;
    drawBox(ctx, x, 40, bw, 55, color, `${op.icon}\n${op.name}`, 12);
    if (isActive) {
      ctx.strokeStyle = C.white;
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(x - 2, 38, bw + 4, 59);
      ctx.setLineDash([]);
    }
  });

  // DB 图标
  drawBox(ctx, cx - 50, h - 50, 100, 30, C.purple, '🗄️ Database', 12);
  drawArrow(ctx, cx, 100, cx, h - 52, ops[active].color);
}

// ===== 3-5 分页 =====
export function anim_3_5(ctx, w, h, time) {
  const cx = w / 2;
  const page = Math.floor((time % 6000) / 2000) + 1;
  const perPage = 3;
  const allData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const start = (page - 1) * perPage;
  const end = Math.min(start + perPage, allData.length);

  ctx.fillStyle = C.white;
  ctx.font = '13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`GET /items?page=${page}&per_page=${perPage}`, cx, 18);

  const boxW = 35;
  const startX = (w - allData.length * (boxW + 5)) / 2;
  for (let i = 0; i < allData.length; i++) {
    const x = startX + i * (boxW + 5);
    const inPage = i >= start && i < end;
    const color = inPage ? C.green : C.grey;
    drawBox(ctx, x, 35, boxW, 30, color, allData[i]);
  }

  // 高亮当前页
  const hlX = startX + start * (boxW + 5) - 3;
  const hlW = (end - start) * (boxW + 5) - 2;
  ctx.strokeStyle = C.yellow;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(hlX, 32, hlW, 36);
  ctx.setLineDash([]);

  ctx.fillStyle = C.yellow;
  ctx.font = '12px monospace';
  ctx.fillText(`切片: data[${start}:${end}]`, cx, 90);

  // 页码指示器
  for (let p = 1; p <= 3; p++) {
    const px = cx + (p - 2) * 40;
    const active = p === page;
    drawBox(ctx, px - 12, h - 35, 24, 22, active ? C.yellow : C.grey, String(p), 12);
  }
}

// ===== 4-1 ORM =====
export function anim_4_1(ctx, w, h, time) {
  const cx = w / 2;
  const t = pulse(time, 2000);

  // 左：Python 对象
  drawBox(ctx, 15, 10, cx - 30, 25, C.green, 'Python 对象', 12);
  ctx.font = '11px monospace';
  ctx.fillStyle = C.green;
  ctx.textAlign = 'left';
  ctx.fillText('todo.title = "学Python"', 20, 52);
  ctx.fillText('todo.done = False', 20, 68);
  ctx.fillText('todo.id = 1', 20, 84);

  // 箭头
  const arrowAlpha = 0.3 + t * 0.7;
  ctx.globalAlpha = arrowAlpha;
  drawArrow(ctx, cx - 10, 55, cx + 10, 55, C.yellow);
  ctx.font = '10px monospace';
  ctx.fillStyle = C.yellow;
  ctx.textAlign = 'center';
  ctx.fillText('ORM 映射', cx, 48);
  ctx.globalAlpha = 1;

  // 右：数据库表
  drawBox(ctx, cx + 15, 10, cx - 30, 25, C.blue, 'SQL 表', 12);
  ctx.font = '11px monospace';
  ctx.fillStyle = C.blue;
  ctx.textAlign = 'left';
  ctx.fillText('| id | title    | done |', cx + 20, 52);
  ctx.fillText('| 1  | 学Python | 0    |', cx + 20, 68);
}

// ===== 4-2 JOIN =====
export function anim_4_2(ctx, w, h, time) {
  const t = pulse(time, 2500);

  // 左表
  drawBox(ctx, 10, 5, 120, 22, C.green, 'Users', 12);
  const users = [['1', 'Alice'], ['2', 'Bob']];
  users.forEach(([id, name], i) => {
    const y = 32 + i * 25;
    const color = i === 0 ? `rgba(102,187,106,${0.3 + t * 0.7})` : C.grey;
    drawBox(ctx, 10, y, 50, 20, color, id, 10);
    drawBox(ctx, 65, y, 65, 20, color, name, 10);
  });

  // 右表
  drawBox(ctx, 200, 5, 150, 22, C.blue, 'Orders', 12);
  const orders = [['101', '1', '$50'], ['102', '1', '$30'], ['103', '2', '$20']];
  orders.forEach(([oid, uid, amt], i) => {
    const y = 32 + i * 25;
    const highlight = uid === '1';
    const color = highlight ? `rgba(79,195,247,${0.3 + t * 0.7})` : C.grey;
    drawBox(ctx, 200, y, 40, 20, color, oid, 9);
    drawBox(ctx, 245, y, 40, 20, color, uid, 9);
    drawBox(ctx, 290, y, 60, 20, color, amt, 9);
  });

  // 连线
  ctx.strokeStyle = `rgba(253,216,53,${0.3 + t * 0.7})`;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(60, 42); ctx.lineTo(265, 42);
  ctx.moveTo(60, 42); ctx.lineTo(265, 67);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = C.yellow;
  ctx.font = '11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('JOIN ON users.id = orders.user_id', 190, h - 8);
}

// ===== 5-3 Streaming =====
export function anim_5_3(ctx, w, h, time) {
  const text = "Hello World 你好世界";
  const charIdx = Math.floor((time % 3000) / 150) % (text.length + 5);
  const displayed = text.slice(0, Math.min(charIdx, text.length));

  ctx.fillStyle = C.white;
  ctx.font = '13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SSE Streaming (逐字输出)', w / 2, 18);

  // 打字效果
  ctx.font = '20px monospace';
  ctx.fillStyle = C.green;
  ctx.textAlign = 'left';
  ctx.fillText(displayed, 30, 60);

  // 光标闪烁
  if (charIdx < text.length && Math.floor(time / 400) % 2 === 0) {
    const metrics = ctx.measureText(displayed);
    ctx.fillStyle = C.white;
    ctx.fillRect(32 + metrics.width, 45, 2, 22);
  }

  // 数据块
  const chunks = displayed.split('');
  const startX = 30;
  ctx.font = '10px monospace';
  for (let i = Math.max(0, chunks.length - 8); i < chunks.length; i++) {
    const x = startX + (i - Math.max(0, chunks.length - 8)) * 45;
    drawBox(ctx, x, 85, 40, 22, C.blue, `"${chunks[i]}"`, 9);
  }

  ctx.fillStyle = C.grey;
  ctx.textAlign = 'center';
  ctx.fillText('yield → yield → yield → ...', w / 2, h - 8);
}

// ===== 6-2 向量数据库搜索 =====
export function anim_6_2(ctx, w, h, time) {
  const cx = w / 2;
  const t = pulse(time, 2000);

  ctx.fillStyle = C.white;
  ctx.font = '13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('向量数据库搜索', cx, 18);

  // 查询向量
  drawBox(ctx, 15, 35, 100, 25, C.yellow, 'Query: "编程"', 10);

  // 存储的向量
  const docs = [
    { text: 'Python入门', sim: 0.92, color: C.green },
    { text: 'AI基础', sim: 0.78, color: C.blue },
    { text: '做饭教程', sim: 0.12, color: C.grey },
  ];

  docs.forEach((d, i) => {
    const y = 70 + i * 35;
    const alpha = d.sim > 0.5 ? 0.5 + t * 0.5 : 0.4;
    ctx.globalAlpha = alpha;
    drawBox(ctx, cx - 80, y, 160, 25, d.color, `${d.text} (${d.sim})`, 11);
    ctx.globalAlpha = 1;
  });

  ctx.fillStyle = C.green;
  ctx.font = '12px monospace';
  ctx.fillText('→ Top-1: "Python入门" (0.92)', cx, h - 10);
}

// ===== 7-1 Streaming 响应 =====
export function anim_7_1(ctx, w, h, time) {
  const cx = w / 2;
  const chunks = ['你', '好', '，', '我', '是', 'AI'];
  const idx = Math.floor((time % 3000) / 500) % chunks.length;

  drawBox(ctx, 15, 10, 80, 25, C.blue, 'Server', 12);
  drawBox(ctx, w - 95, 10, 80, 25, C.green, 'Client', 12);

  for (let i = 0; i <= idx; i++) {
    const progress = (i / chunks.length);
    const x = 100 + progress * (w - 200);
    const y = 55;
    drawBox(ctx, x, y, 30, 22, C.yellow, chunks[i], 12);
    if (i < idx) {
      drawArrow(ctx, x + 32, y + 11, x + 38, y + 11, C.grey);
    }
  }

  ctx.fillStyle = C.green;
  ctx.font = '14px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(chunks.slice(0, idx + 1).join(''), 30, h - 15);
}

// ===== 7-2 对话管理 =====
export function anim_7_2(ctx, w, h, time) {
  const msgs = [
    { role: 'system', text: '你是助手', color: C.blue },
    { role: 'user', text: '你好', color: C.green },
    { role: 'AI', text: '你好！', color: C.yellow },
    { role: 'user', text: '再见', color: C.green },
  ];
  const show = Math.floor((time % 4000) / 1000) + 1;

  ctx.fillStyle = C.white;
  ctx.font = '12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('对话历史 (messages[])', w / 2, 15);

  for (let i = 0; i < Math.min(show, msgs.length); i++) {
    const m = msgs[i];
    const y = 28 + i * 32;
    drawBox(ctx, 15, y, 55, 22, m.color, m.role, 10);
    drawBox(ctx, 75, y, w - 95, 22, m.color, m.text, 10);
  }

  ctx.fillStyle = C.grey;
  ctx.font = '10px monospace';
  ctx.fillText(`共 ${Math.min(show, msgs.length)} 条 | max_history=10`, w / 2, h - 8);
}

// ===== 7-3 多模型适配器 =====
export function anim_7_3(ctx, w, h, time) {
  const cx = w / 2;
  const active = Math.floor((time % 3000) / 1000);

  drawBox(ctx, cx - 55, 5, 110, 25, C.white, 'ModelRouter', 12);

  const models = [
    { name: 'GPT-4', color: C.green },
    { name: 'Claude', color: C.purple },
    { name: 'Gemini', color: C.blue },
  ];

  models.forEach((m, i) => {
    const x = 30 + i * (w - 60) / 3;
    const bw = (w - 80) / 3;
    const isActive = i === active;
    drawBox(ctx, x, 55, bw, 30, isActive ? m.color : C.grey, m.name, 12);
    drawArrow(ctx, cx, 30, x + bw / 2, 53, isActive ? m.color : C.grey);
    if (isActive) {
      ctx.fillStyle = m.color;
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('← 当前选择', x + bw / 2, 100);
    }
  });

  ctx.fillStyle = C.yellow;
  ctx.font = '11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('策略模式: 统一接口, 不同实现', cx, h - 8);
}

// ===== 8-1 Markdown 解析 =====
export function anim_8_1(ctx, w, h, time) {
  const cx = w / 2;
  const rules = [
    { md: '# Title', html: '<h1>Title</h1>', color: C.green },
    { md: '**bold**', html: '<strong>bold</strong>', color: C.yellow },
    { md: '`code`', html: '<code>code</code>', color: C.purple },
  ];
  const idx = Math.floor((time % 3000) / 1000);

  ctx.fillStyle = C.white;
  ctx.font = '13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Markdown → HTML', cx, 16);

  rules.forEach((r, i) => {
    const y = 30 + i * 40;
    const isActive = i === idx;
    const color = isActive ? r.color : C.grey;
    drawBox(ctx, 15, y, cx - 30, 28, color, r.md, 11);
    ctx.fillStyle = color;
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('→', cx, y + 15);
    drawBox(ctx, cx + 15, y, cx - 30, 28, color, r.html, 10);
  });
}

// ===== 8-2 序列化 =====
export function anim_8_2(ctx, w, h, time) {
  const cx = w / 2;
  const t = pulse(time, 2000);
  const direction = Math.floor(time / 2000) % 2;

  drawBox(ctx, 15, 30, cx - 30, 50, C.green, 'Python\n对象', 12);
  drawBox(ctx, cx + 15, 30, cx - 30, 50, C.blue, 'JSON\n字符串', 12);

  if (direction === 0) {
    ctx.globalAlpha = 0.3 + t * 0.7;
    drawArrow(ctx, cx - 12, 55, cx + 12, 55, C.yellow);
    ctx.fillStyle = C.yellow;
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('json.dumps()', cx, 48);
    ctx.globalAlpha = 1;
  } else {
    ctx.globalAlpha = 0.3 + t * 0.7;
    drawArrow(ctx, cx + 12, 55, cx - 12, 55, C.purple);
    ctx.fillStyle = C.purple;
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('json.loads()', cx, 48);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = C.grey;
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ensure_ascii=False → 中文直接显示', cx, h - 8);
}

// ===== 9-2 文档解析 =====
export function anim_9_2(ctx, w, h, time) {
  const cx = w / 2;
  const stage = Math.floor((time % 4000) / 1000);
  const stages = [
    { icon: '📄', label: '原始文档', color: C.white },
    { icon: '✂️', label: '按标题分段', color: C.yellow },
    { icon: '📋', label: '提取元数据', color: C.green },
    { icon: '📦', label: '结构化输出', color: C.blue },
  ];

  stages.forEach((s, i) => {
    const x = 10 + i * (w - 20) / 4;
    const bw = (w - 40) / 4;
    const isActive = i <= stage;
    drawBox(ctx, x, 30, bw, 45, isActive ? s.color : C.grey, `${s.icon}\n${s.label}`, 11);
    if (i > 0) {
      drawArrow(ctx, x - 5, 52, x - 2, 52, isActive ? C.white : C.grey);
    }
  });

  ctx.fillStyle = C.grey;
  ctx.font = '11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('{title, sections[], word_count}', cx, h - 8);
}

// ===== 9-3 重排序 =====
export function anim_9_3(ctx, w, h, time) {
  const cx = w / 2;
  const t = pulse(time, 2500);

  ctx.fillStyle = C.white;
  ctx.font = '13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Reranking: 向量搜索 → 精排', cx, 16);

  // 初始排序
  const before = [
    { text: 'Doc C (0.75)', color: C.blue },
    { text: 'Doc A (0.82)', color: C.green },
    { text: 'Doc B (0.60)', color: C.grey },
  ];
  const after = [
    { text: 'Doc A (0.95)', color: C.green },
    { text: 'Doc C (0.71)', color: C.blue },
    { text: 'Doc B (0.30)', color: C.grey },
  ];

  const leftX = 20;
  const rightX = cx + 20;
  drawBox(ctx, leftX, 28, cx - 35, 20, C.yellow, '向量搜索结果', 10);
  drawBox(ctx, rightX, 28, cx - 35, 20, C.purple, 'Rerank 后', 10);

  const items = t > 0.5 ? after : before;
  for (let i = 0; i < 3; i++) {
    const y = 55 + i * 28;
    drawBox(ctx, leftX, y, cx - 35, 22, before[i].color, before[i].text, 10);
    ctx.globalAlpha = t > 0.5 ? 1 : 0.3;
    drawBox(ctx, rightX, y, cx - 35, 22, after[i].color, after[i].text, 10);
    ctx.globalAlpha = 1;
  }
}

// ===== 10-1 知识库 =====
export function anim_10_1(ctx, w, h, time) {
  const cx = w / 2;
  const kbs = ['📚 技术文档', '📊 财务报表', '📋 HR 手册'];
  const active = Math.floor((time % 3000) / 1000);

  ctx.fillStyle = C.white;
  ctx.font = '13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('多知识库管理', cx, 16);

  kbs.forEach((kb, i) => {
    const x = 15 + i * (w - 30) / 3;
    const bw = (w - 50) / 3;
    const isActive = i === active;
    drawBox(ctx, x, 35, bw, 35, isActive ? C.green : C.grey, kb, 11);
  });

  // 搜索
  drawBox(ctx, cx - 60, h - 45, 120, 25, C.yellow, '🔍 跨库搜索', 11);
  drawArrow(ctx, cx, h - 48, cx, 73, C.yellow);
}

// ===== 11-2 ReAct 循环 =====
export function anim_11_2(ctx, w, h, time) {
  const cx = w / 2;
  const steps = ['Thought', 'Action', 'Observation'];
  const colors = [C.blue, C.yellow, C.green];
  const active = Math.floor((time % 3000) / 1000);

  ctx.fillStyle = C.white;
  ctx.font = '13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ReAct: Reasoning + Acting', cx, 16);

  const radius = 45;
  steps.forEach((s, i) => {
    const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius;
    const y = 85 + Math.sin(angle) * radius;
    const isActive = i === active;
    drawBox(ctx, x - 40, y - 12, 80, 24, isActive ? colors[i] : C.grey, s, 11);
  });

  // 循环箭头
  for (let i = 0; i < 3; i++) {
    const a1 = (i / 3) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((i + 1) / 3) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(a1) * (radius + 25);
    const y1 = 85 + Math.sin(a1) * (radius + 25);
    const x2 = cx + Math.cos(a2) * (radius + 25);
    const y2 = 85 + Math.sin(a2) * (radius + 25);
    drawArrow(ctx, x1, y1, x2, y2, i === active ? C.white : C.grey);
  }
}

// ===== 12-1 MCP =====
export function anim_12_1(ctx, w, h, time) {
  const cx = w / 2;
  const t = pulse(time, 2000);

  drawBox(ctx, cx - 50, 5, 100, 25, C.blue, 'AI Model', 12);
  drawBox(ctx, 15, 65, 80, 50, C.green, '📁\nFile Tool', 10);
  drawBox(ctx, cx - 40, 65, 80, 50, C.yellow, '🗄️\nDB Tool', 10);
  drawBox(ctx, w - 95, 65, 80, 50, C.purple, '🌐\nAPI Tool', 10);

  // MCP 协议层
  ctx.strokeStyle = `rgba(79,195,247,${0.3 + t * 0.7})`;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 5]);
  ctx.strokeRect(10, 55, w - 20, 70);
  ctx.setLineDash([]);
  ctx.fillStyle = C.blue;
  ctx.font = '10px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('MCP Protocol', w - 15, 60);

  drawArrow(ctx, cx, 30, 55, 63, t > 0.5 ? C.green : C.grey);
  drawArrow(ctx, cx, 30, cx, 63, t > 0.5 ? C.grey : C.yellow);
  drawArrow(ctx, cx, 30, w - 55, 63, C.grey);

  ctx.fillStyle = C.grey;
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('标准化协议 = AI 的 USB 接口', cx, h - 8);
}

// ===== 13-1 浏览器 AI =====
export function anim_13_1(ctx, w, h, time) {
  const cx = w / 2;
  const t = pulse(time, 1500);
  const bars = [
    { label: 'FP32', size: 4, color: C.red },
    { label: 'FP16', size: 2, color: C.orange },
    { label: 'INT8', size: 1, color: C.green },
    { label: 'INT4', size: 0.5, color: C.blue },
  ];

  ctx.fillStyle = C.white;
  ctx.font = '13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('模型量化: 压缩体积', cx, 16);

  bars.forEach((b, i) => {
    const y = 30 + i * 28;
    const barW = (b.size / 4) * (w - 120);
    ctx.fillStyle = b.color;
    ctx.font = '11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(b.label, 50, y + 14);
    ctx.fillStyle = b.color;
    ctx.globalAlpha = 0.6 + t * 0.4;
    ctx.fillRect(60, y, barW, 20);
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.white;
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${b.size} B/权重`, 65 + barW, y + 14);
  });
}

// ===== 15-1 作品集 =====
export function anim_15_1(ctx, w, h, time) {
  const cx = w / 2;
  const items = ['📝 README', '📸 截图/GIF', '🚀 部署链接', '⭐ Star 数'];
  const show = Math.floor((time % 4000) / 1000) + 1;

  ctx.fillStyle = C.white;
  ctx.font = '14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GitHub 作品集要素', cx, 18);

  items.forEach((item, i) => {
    if (i >= show) return;
    const y = 35 + i * 30;
    drawBox(ctx, cx - 80, y, 160, 24, i < show - 1 ? C.green : C.yellow, item, 11);
  });

  ctx.fillStyle = C.green;
  ctx.font = '11px monospace';
  ctx.fillText('作品集 >> 简历', cx, h - 10);
}

// ===== Boss 通用动画 =====
export function anim_boss(ctx, w, h, time) {
  const cx = w / 2;
  const t = pulse(time, 1200);

  // Boss 图标
  ctx.font = '40px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🐉', cx, 55);

  ctx.fillStyle = `rgba(239,83,80,${0.5 + t * 0.5})`;
  ctx.font = '16px monospace';
  ctx.fillText('⚔️ BOSS 试炼 ⚔️', cx, 90);

  // 技能要素
  const skills = ['变量', '函数', '类', '装饰器', 'API', 'AI'];
  const visibleCount = Math.floor((time % 3000) / 500) + 1;
  skills.forEach((s, i) => {
    if (i >= visibleCount) return;
    const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
    const r = 50;
    const x = cx + Math.cos(angle) * r - 25;
    const y = 105 + Math.sin(angle) * r;
    drawBox(ctx, x, y, 50, 20, C.yellow, s, 10);
  });
}
