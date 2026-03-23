/**
 * GameRenderer - 打怪版像素风 2D Canvas 游戏引擎
 *
 * 核心玩法：每关一个怪物，写对代码 → 攻击怪物 → 击败通关
 */

const THEMES = {
  cave: { bg: '#0f1923', ground: '#2d4a3e', groundDark: '#1a3429', wall: '#3d2b1f', wallDark: '#2a1d14', accent: '#4ade80' },
  maze: { bg: '#0c1445', ground: '#1e3a5f', groundDark: '#152b4a', wall: '#334155', wallDark: '#1e293b', accent: '#60a5fa' },
  fortress: { bg: '#1a0f00', ground: '#4a3728', groundDark: '#362818', wall: '#6b4423', wallDark: '#4a2d12', accent: '#f59e0b' },
  forest: { bg: '#071a0f', ground: '#1a4028', groundDark: '#0f2e1a', wall: '#2d5a3d', wallDark: '#1a3d28', accent: '#22c55e' },
  temple: { bg: '#120a2e', ground: '#2e1065', groundDark: '#1e0a4a', wall: '#4c1d95', wallDark: '#3b0f7a', accent: '#a855f7' },
};

const TILE = 32;

// 怪物类型定义
const MONSTER_TYPES = {
  slime: {
    name: '代码史莱姆',
    color: '#22c55e', bodyColor: '#16a34a', eyeColor: '#fff',
    width: 36, height: 28,
    draw(ctx, x, y, time, hpRatio, hurt) {
      const bob = Math.sin(time / 400) * 3;
      const scaleX = 1 + Math.sin(time / 500) * 0.05;
      ctx.save();
      ctx.translate(x, y + bob);
      if (hurt) { ctx.globalAlpha = 0.5 + Math.sin(time / 50) * 0.5; }
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(0, 18, 20 * scaleX, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Body
      ctx.fillStyle = this.bodyColor;
      ctx.beginPath();
      ctx.ellipse(0, 4, 18 * scaleX, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 2, 16 * scaleX, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      // Highlight
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.ellipse(-4, -4, 5, 4, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Eyes
      ctx.fillStyle = this.eyeColor;
      ctx.fillRect(-8, -2, 5, 6);
      ctx.fillRect(3, -2, 5, 6);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(-6, 0, 3, 4);
      ctx.fillRect(5, 0, 3, 4);
      // Mouth
      if (hpRatio < 0.3) {
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(-4, 6, 8, 2);
      }
      ctx.restore();
    },
  },
  skeleton: {
    name: '语法骷髅',
    color: '#e2e8f0', bodyColor: '#94a3b8', eyeColor: '#ef4444',
    width: 28, height: 40,
    draw(ctx, x, y, time, hpRatio, hurt) {
      const bob = Math.sin(time / 350) * 2;
      ctx.save();
      ctx.translate(x, y + bob);
      if (hurt) { ctx.globalAlpha = 0.5 + Math.sin(time / 50) * 0.5; }
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.ellipse(0, 22, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Body
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(-6, -4, 12, 24);
      // Ribs
      ctx.fillStyle = this.color;
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(-8, 2 + i * 6, 16, 3);
      }
      // Head
      ctx.fillStyle = this.color;
      ctx.fillRect(-8, -16, 16, 14);
      ctx.fillStyle = this.eyeColor;
      ctx.fillRect(-6, -12, 4, 4);
      ctx.fillRect(2, -12, 4, 4);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(-3, -6, 6, 2);
      // Arms
      const armSwing = Math.sin(time / 300) * 8;
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(-14, 0, 6, 3);
      ctx.fillRect(8, 0, 6, 3);
      // Sword
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(14, -8 + armSwing, 3, 16);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(12, -2 + armSwing, 7, 3);
      // Legs
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(-6, 20, 4, 8);
      ctx.fillRect(2, 20, 4, 8);
      ctx.restore();
    },
  },
  golem: {
    name: '逻辑石像',
    color: '#78716c', bodyColor: '#57534e', eyeColor: '#f59e0b',
    width: 40, height: 44,
    draw(ctx, x, y, time, hpRatio, hurt) {
      const bob = Math.sin(time / 600) * 1.5;
      ctx.save();
      ctx.translate(x, y + bob);
      if (hurt) { ctx.globalAlpha = 0.5 + Math.sin(time / 50) * 0.5; }
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(0, 24, 20, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      // Body
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(-16, -8, 32, 30);
      ctx.fillStyle = this.color;
      ctx.fillRect(-14, -6, 28, 26);
      // Cracks
      ctx.strokeStyle = '#44403c';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-8, -4); ctx.lineTo(-2, 6); ctx.lineTo(-6, 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(6, 0); ctx.lineTo(10, 10);
      ctx.stroke();
      // Head
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(-12, -22, 24, 16);
      ctx.fillStyle = this.color;
      ctx.fillRect(-10, -20, 20, 12);
      // Eyes (glowing)
      const glow = Math.sin(time / 400) * 0.3 + 0.7;
      ctx.fillStyle = this.eyeColor;
      ctx.globalAlpha = (hurt ? 0.5 : 1) * glow;
      ctx.fillRect(-8, -16, 5, 5);
      ctx.fillRect(3, -16, 5, 5);
      ctx.globalAlpha = hurt ? 0.5 + Math.sin(time / 50) * 0.5 : 1;
      // Mouth
      ctx.fillStyle = '#44403c';
      ctx.fillRect(-6, -10, 12, 3);
      // Arms
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(-22, -4, 8, 20);
      ctx.fillRect(14, -4, 8, 20);
      // Fists
      ctx.fillStyle = this.color;
      ctx.fillRect(-24, 12, 12, 10);
      ctx.fillRect(12, 12, 12, 10);
      // Legs
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(-12, 22, 10, 10);
      ctx.fillRect(2, 22, 10, 10);
      ctx.restore();
    },
  },
  dragon: {
    name: '递归飞龙',
    color: '#dc2626', bodyColor: '#991b1b', eyeColor: '#fbbf24',
    width: 48, height: 40,
    draw(ctx, x, y, time, hpRatio, hurt) {
      const bob = Math.sin(time / 300) * 4;
      const wingFlap = Math.sin(time / 200) * 15;
      ctx.save();
      ctx.translate(x, y + bob);
      if (hurt) { ctx.globalAlpha = 0.5 + Math.sin(time / 50) * 0.5; }
      // Wings
      ctx.fillStyle = this.bodyColor;
      ctx.save();
      ctx.translate(-18, -12);
      ctx.rotate((-20 + wingFlap) * Math.PI / 180);
      ctx.fillRect(-20, -2, 22, 8);
      ctx.fillRect(-24, -2, 8, 14);
      ctx.restore();
      ctx.save();
      ctx.translate(18, -12);
      ctx.rotate((20 - wingFlap) * Math.PI / 180);
      ctx.fillRect(-2, -2, 22, 8);
      ctx.fillRect(16, -2, 8, 14);
      ctx.restore();
      // Body
      ctx.fillStyle = this.bodyColor;
      ctx.beginPath();
      ctx.ellipse(0, 4, 20, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 2, 18, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      // Belly
      ctx.fillStyle = '#fbbf24';
      ctx.globalAlpha = (hurt ? 0.3 : 0.5);
      ctx.beginPath();
      ctx.ellipse(0, 6, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = hurt ? 0.5 + Math.sin(time / 50) * 0.5 : 1;
      // Head
      ctx.fillStyle = this.color;
      ctx.fillRect(-10, -18, 20, 14);
      // Horns
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-12, -24, 4, 8);
      ctx.fillRect(8, -24, 4, 8);
      // Eyes
      ctx.fillStyle = this.eyeColor;
      ctx.fillRect(-7, -14, 5, 4);
      ctx.fillRect(2, -14, 5, 4);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(-5, -13, 3, 3);
      ctx.fillRect(4, -13, 3, 3);
      // Fire breath
      if (hpRatio > 0.5) {
        const fireLength = 12 + Math.sin(time / 100) * 4;
        ctx.fillStyle = '#ff6b00';
        ctx.globalAlpha = 0.7;
        ctx.fillRect(-4, -30, 8, -fireLength);
        ctx.fillStyle = '#ffcc00';
        ctx.globalAlpha = 0.9;
        ctx.fillRect(-2, -30, 4, -fireLength + 4);
        ctx.globalAlpha = 1;
      }
      // Tail
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(16, 8, 12, 4);
      ctx.fillRect(26, 4, 8, 4);
      ctx.fillStyle = this.color;
      ctx.fillRect(32, 0, 6, 4);
      ctx.restore();
    },
  },
  wizard: {
    name: 'Bug 法师',
    color: '#7c3aed', bodyColor: '#5b21b6', eyeColor: '#c4b5fd',
    width: 30, height: 42,
    draw(ctx, x, y, time, hpRatio, hurt) {
      const float = Math.sin(time / 500) * 5;
      ctx.save();
      ctx.translate(x, y + float);
      if (hurt) { ctx.globalAlpha = 0.5 + Math.sin(time / 50) * 0.5; }
      // Shadow (floaty)
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.ellipse(0, 26 - float * 0.3, 12, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Robe
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(-10, -2, 20, 24);
      ctx.fillStyle = this.color;
      ctx.fillRect(-8, 0, 16, 20);
      // Hat
      ctx.fillStyle = this.bodyColor;
      ctx.fillRect(-12, -16, 24, 10);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -30); ctx.lineTo(-14, -8); ctx.lineTo(14, -8);
      ctx.fill();
      // Hat star
      ctx.fillStyle = '#fbbf24';
      ctx.font = '8px serif';
      ctx.textAlign = 'center';
      ctx.fillText('★', 0, -14);
      // Face
      ctx.fillStyle = '#fcd34d';
      ctx.fillRect(-6, -10, 12, 10);
      // Eyes
      ctx.fillStyle = this.eyeColor;
      ctx.fillRect(-4, -8, 3, 3);
      ctx.fillRect(1, -8, 3, 3);
      // Staff
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(14, -20, 3, 40);
      // Orb on staff
      const orbPulse = Math.sin(time / 300) * 0.3 + 0.7;
      ctx.fillStyle = this.color;
      ctx.globalAlpha = (hurt ? 0.3 : 0.6) * orbPulse;
      ctx.beginPath();
      ctx.arc(15, -24, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#c4b5fd';
      ctx.globalAlpha = (hurt ? 0.3 : 0.8) * orbPulse;
      ctx.beginPath();
      ctx.arc(15, -24, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      // Magic particles
      if (hpRatio > 0.3) {
        for (let i = 0; i < 3; i++) {
          const px = -10 + Math.sin(time / 200 + i * 2) * 20;
          const py = -10 + Math.cos(time / 300 + i * 3) * 10;
          ctx.fillStyle = '#c4b5fd';
          ctx.globalAlpha = 0.4;
          ctx.fillRect(px, py, 3, 3);
        }
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    },
  },
};

export class GameRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.theme = THEMES.cave;
    this.time = 0;
    this.animationId = null;

    // Hero
    this.hero = { x: 3, y: 4, targetX: 3, targetY: 4, dir: 1, state: 'idle' };
    // Monster
    this.monster = { type: null, x: 10, y: 4, hp: 3, maxHp: 3, hurt: false, hurtTimer: 0, dead: false, deathTimer: 0 };

    // Animation queue
    this.animQueue = [];
    this.currentAnim = null;
    this.animTimer = 0;

    // Visual effects
    this.particles = [];
    this.floatingTexts = [];
    this.speechBubble = null;
    this.screenShake = 0;
    this.slashEffects = [];

    // State
    this.levelComplete = false;

    this._resize();
    this._startLoop();
  }

  /**
   * 重置场景，设置怪物
   */
  resetScene(sceneConfig) {
    this.theme = THEMES[sceneConfig?.theme] || THEMES.cave;
    this.hero = { x: 3, y: 4, targetX: 3, targetY: 4, dir: 1, state: 'idle' };

    const monsterType = sceneConfig?.monster || 'slime';
    const totalObjectives = sceneConfig?.totalObjectives || 3;
    this.monster = {
      type: MONSTER_TYPES[monsterType] || MONSTER_TYPES.slime,
      x: 10,
      y: 4,
      hp: totalObjectives,
      maxHp: totalObjectives,
      hurt: false,
      hurtTimer: 0,
      dead: false,
      deathTimer: 0,
    };

    this.animQueue = [];
    this.currentAnim = null;
    this.animTimer = 0;
    this.particles = [];
    this.floatingTexts = [];
    this.speechBubble = null;
    this.slashEffects = [];
    this.screenShake = 0;
    this.levelComplete = false;
  }

  /**
   * 🔑 核心：代码结果驱动战斗动画
   */
  playCodeResults(checkResults) {
    const anims = [];

    checkResults.forEach((check) => {
      if (check.passed) {
        // 成功 → 攻击怪物！
        anims.push(
          { type: 'speech', text: check.speechText || '成功了！', duration: 50 },
          { type: 'float_text', text: check.displayValue || '✅', color: this.theme.accent, x: 'hero', duration: 45 },
          { type: 'hero_rush', duration: 20 },     // 英雄冲刺
          { type: 'attack_slash', duration: 15 },   // 斩击特效
          { type: 'monster_hurt', duration: 35 },   // 怪物受伤
          { type: 'damage_text', text: '-1 HP', duration: 40 },
          { type: 'hero_retreat', duration: 25 },   // 英雄退回
          { type: 'particles', count: 15, at: 'monster', duration: 10 },
        );
      } else {
        // 失败 → 怪物反击
        anims.push(
          { type: 'speech', text: check.speechText || '代码有误！', duration: 50 },
          { type: 'float_text', text: '❌ ' + (check.errorText || ''), color: '#ef4444', x: 'hero', duration: 50 },
          { type: 'monster_attack', duration: 30 },
          { type: 'hero_hurt', duration: 30 },
          { type: 'screen_shake', duration: 15 },
        );
      }
    });

    // 全部通过 → 击杀怪物
    const allPassed = checkResults.every(c => c.passed);
    if (allPassed && checkResults.length > 0) {
      anims.push(
        { type: 'monster_death', duration: 60 },
        { type: 'celebration', duration: 50 },
        { type: 'speech', text: '🎉 怪物击败！通关！', duration: 80 },
      );
    }

    this.animQueue = anims;
    this.currentAnim = null;
    this.animTimer = 0;
  }

  isAnimComplete() {
    return this.animQueue.length === 0 && this.currentAnim === null;
  }

  // ========== 内部 ==========

  _startLoop() {
    const loop = (ts) => {
      this.time = ts || 0;
      this._update();
      this._resize();
      this._render();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  _update() {
    // Hero smooth move
    const speed = 0.1;
    this.hero.x += (this.hero.targetX - this.hero.x) * speed;
    this.hero.y += (this.hero.targetY - this.hero.y) * speed;
    if (Math.abs(this.hero.targetX - this.hero.x) > 0.05) {
      this.hero.dir = this.hero.targetX > this.hero.x ? 1 : -1;
    }

    // Monster hurt timer
    if (this.monster.hurt) {
      this.monster.hurtTimer--;
      if (this.monster.hurtTimer <= 0) this.monster.hurt = false;
    }
    if (this.monster.dead && this.monster.deathTimer > 0) {
      this.monster.deathTimer--;
    }

    // Screen shake decay
    if (this.screenShake > 0) this.screenShake *= 0.85;

    // Floating texts
    this.floatingTexts = this.floatingTexts.filter(ft => {
      ft.timer--;
      ft.y -= 0.5;
      ft.alpha = Math.max(0, ft.timer / ft.maxTimer);
      return ft.timer > 0;
    });

    // Particles
    this.particles = this.particles.filter(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= p.decay;
      return p.life > 0;
    });

    // Slash effects
    this.slashEffects = this.slashEffects.filter(s => {
      s.timer--;
      return s.timer > 0;
    });

    // Speech bubble
    if (this.speechBubble) {
      this.speechBubble.timer--;
      if (this.speechBubble.timer <= 0) this.speechBubble = null;
    }

    // Process animation queue
    this._processAnimQueue();
  }

  _processAnimQueue() {
    if (this.currentAnim) {
      this.animTimer--;
      if (this.animTimer <= 0) this.currentAnim = null;
      else return;
    }

    if (this.animQueue.length === 0) return;
    const anim = this.animQueue.shift();
    this.currentAnim = anim;
    this.animTimer = anim.duration || 30;

    const heroPixelX = this.hero.x * TILE + TILE / 2;
    const heroPixelY = this.hero.y * TILE;
    const monsterPixelX = this.monster.x * TILE + TILE / 2;
    const monsterPixelY = this.monster.y * TILE;

    switch (anim.type) {
      case 'speech':
        this.speechBubble = { text: anim.text, timer: anim.duration };
        break;

      case 'float_text': {
        const fx = anim.x === 'hero' ? heroPixelX : (anim.x === 'monster' ? monsterPixelX : anim.x * TILE);
        this.floatingTexts.push({
          text: anim.text, x: fx, y: heroPixelY - 30,
          color: anim.color || '#fff', timer: anim.duration, maxTimer: anim.duration, alpha: 1,
        });
        break;
      }

      case 'hero_rush':
        this.hero.targetX = this.monster.x - 2;
        this.hero.state = 'attack';
        break;

      case 'attack_slash':
        this.slashEffects.push({
          x: monsterPixelX, y: monsterPixelY - 10,
          timer: 15,
        });
        this._spawnParticles(monsterPixelX, monsterPixelY, 8, ['#fff', '#fbbf24', this.theme.accent]);
        break;

      case 'monster_hurt':
        this.monster.hurt = true;
        this.monster.hurtTimer = anim.duration;
        this.monster.hp = Math.max(0, this.monster.hp - 1);
        this.screenShake = 6;
        break;

      case 'damage_text':
        this.floatingTexts.push({
          text: anim.text, x: monsterPixelX, y: monsterPixelY - 40,
          color: '#ef4444', timer: anim.duration, maxTimer: anim.duration, alpha: 1,
        });
        break;

      case 'hero_retreat':
        this.hero.targetX = 3;
        this.hero.state = 'idle';
        break;

      case 'monster_attack':
        // Monster lunges forward briefly
        this.monster.x -= 1;
        setTimeout(() => { this.monster.x += 1; }, 200);
        break;

      case 'hero_hurt':
        this.hero.state = 'hurt';
        this.screenShake = 8;
        setTimeout(() => { this.hero.state = 'idle'; }, 300);
        break;

      case 'screen_shake':
        this.screenShake = 10;
        break;

      case 'monster_death':
        this.monster.dead = true;
        this.monster.deathTimer = anim.duration;
        this._spawnParticles(monsterPixelX, monsterPixelY, 40, ['#fbbf24', '#ef4444', '#a855f7', '#22c55e']);
        break;

      case 'celebration':
        this.levelComplete = true;
        for (let i = 0; i < 60; i++) {
          const cx = Math.random() * this.canvas.width;
          const cy = Math.random() * this.canvas.height * 0.6;
          this._spawnParticles(cx, cy, 2, ['#fbbf24', '#a855f7', '#22c55e', '#3b82f6', '#f472b6']);
        }
        break;

      case 'particles':
        if (anim.at === 'monster') {
          this._spawnParticles(monsterPixelX, monsterPixelY, anim.count || 10);
        } else {
          this._spawnParticles(heroPixelX, heroPixelY, anim.count || 10);
        }
        break;
    }
  }

  _resize() {
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      this.canvas.width = Math.floor(rect.width);
      this.canvas.height = Math.floor(rect.height);
    }
  }

  _render() {
    const { ctx, canvas, theme } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.save();
    // Screen shake
    if (this.screenShake > 0.5) {
      const sx = (Math.random() - 0.5) * this.screenShake;
      const sy = (Math.random() - 0.5) * this.screenShake;
      ctx.translate(sx, sy);
    }

    ctx.fillStyle = theme.bg;
    ctx.fillRect(-5, -5, w + 10, h + 10);

    this._drawBackground();
    this._drawBattleground();

    if (!this.monster.dead || this.monster.deathTimer > 0) {
      this._drawMonster();
    }

    this._drawHero();
    this._drawSlashEffects();
    this._drawHPBars();
    this._drawFloatingTexts();
    this._drawSpeechBubble();
    this._drawParticles();
    this._drawVignette();

    ctx.restore();
  }

  _drawBackground() {
    const { ctx, canvas, theme, time } = this;
    const cols = Math.ceil(canvas.width / TILE) + 1;
    const rows = Math.ceil(canvas.height / TILE) + 1;

    // Ceiling
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < 2; y++) {
        ctx.fillStyle = theme.wallDark;
        ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
      }
    }

    // Stars / ambient particles
    for (let i = 0; i < 6; i++) {
      const sx = ((i * 137 + Math.sin(time / 3000 + i) * 40) % canvas.width + canvas.width) % canvas.width;
      const sy = 15 + i * 12 + Math.cos(time / 2000 + i) * 4;
      ctx.fillStyle = theme.accent;
      ctx.globalAlpha = 0.15 + Math.sin(time / 1000 + i) * 0.1;
      ctx.fillRect(sx, sy, 2 + (i % 2), 2 + (i % 2));
      ctx.globalAlpha = 1;
    }

    // Torches
    [2, 8, 14].forEach((tx, i) => {
      const px = tx * TILE + 12;
      const py = 2 * TILE + 14;
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(px, py, 8, 16);
      const f = Math.sin(time / 150 + i * 2.5) * 2;
      ctx.fillStyle = '#ff6b00';
      ctx.fillRect(px - 2, py - 8 + f, 12, 8);
      ctx.fillStyle = '#ffcc00';
      ctx.fillRect(px + 1, py - 5 + f, 6, 4);
      ctx.fillStyle = '#ff6b00';
      ctx.globalAlpha = 0.05;
      ctx.beginPath();
      ctx.arc(px + 4, py - 2, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  _drawBattleground() {
    const { ctx, canvas, theme } = this;
    const cols = Math.ceil(canvas.width / TILE) + 1;
    const rows = Math.ceil(canvas.height / TILE) + 1;
    const groundY = 5;

    for (let x = 0; x < cols; x++) {
      for (let y = groundY; y < rows; y++) {
        const px = x * TILE;
        const py = y * TILE;
        if (y === groundY) {
          ctx.fillStyle = theme.ground;
          ctx.fillRect(px, py, TILE, TILE);
          ctx.fillStyle = theme.accent;
          ctx.globalAlpha = 0.2;
          ctx.fillRect(px, py, TILE, 3);
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = (x + y) % 2 === 0 ? theme.groundDark : theme.wall;
          ctx.fillRect(px, py, TILE, TILE);
        }
      }
    }

    // Battle arena lines
    ctx.strokeStyle = theme.accent;
    ctx.globalAlpha = 0.08;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    // Arena circle
    const cx = this.canvas.width / 2;
    const cy = 4.5 * TILE;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 120, 20, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  _drawMonster() {
    const { ctx, monster, time } = this;
    if (!monster.type) return;

    const px = monster.x * TILE + TILE / 2;
    const py = monster.y * TILE;
    const hpRatio = monster.hp / monster.maxHp;

    // Death animation
    if (monster.dead) {
      ctx.save();
      const deathProgress = 1 - (monster.deathTimer / 60);
      ctx.globalAlpha = 1 - deathProgress;
      ctx.translate(px, py);
      ctx.scale(1 + deathProgress * 0.5, 1 - deathProgress * 0.8);
      ctx.translate(-px, -py);
      monster.type.draw(ctx, px, py, time, hpRatio, false);
      ctx.restore();
      return;
    }

    monster.type.draw(ctx, px, py, time, hpRatio, monster.hurt);
  }

  _drawHero() {
    const { ctx, hero, time, theme } = this;
    const px = Math.floor(hero.x * TILE) + TILE / 2;
    const py = Math.floor(hero.y * TILE);
    const bob = hero.state === 'idle' ? Math.sin(time / 200) * 2 : 0;
    const isAttacking = hero.state === 'attack';
    const isHurt = hero.state === 'hurt';

    if (isHurt) {
      ctx.globalAlpha = 0.5 + Math.sin(time / 50) * 0.5;
    }

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(px, py + 30, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    const drawX = px - 16;
    const drawY = py + bob;

    // Body
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(drawX + 8, drawY + 10, 16, 14);

    // Head
    ctx.fillStyle = '#fcd34d';
    ctx.fillRect(drawX + 10, drawY + 2, 12, 12);

    // Helmet
    ctx.fillStyle = '#4338ca';
    ctx.fillRect(drawX + 8, drawY + 1, 16, 5);
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(drawX + 10, drawY - 1, 4, 3);

    // Eyes
    ctx.fillStyle = '#1e1b4b';
    const eyeOff = hero.dir > 0 ? 2 : -2;
    ctx.fillRect(drawX + 13 + eyeOff, drawY + 7, 2, 3);
    ctx.fillRect(drawX + 18 + eyeOff, drawY + 7, 2, 3);

    // Sword
    const swordAngle = isAttacking ? -45 : (Math.sin(time / 300) * 8);
    ctx.save();
    const swordX = hero.dir > 0 ? drawX + 28 : drawX - 6;
    ctx.translate(swordX, drawY + 12);
    ctx.rotate(swordAngle * Math.PI / 180 * hero.dir);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(-1, -18, 3, 18);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-1, -20, 3, 4);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-3, -2, 7, 3);
    ctx.restore();

    // Shield
    if (!isAttacking) {
      const shieldX = hero.dir > 0 ? drawX + 1 : drawX + 24;
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(shieldX, drawY + 10, 6, 10);
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(shieldX + 1, drawY + 12, 4, 6);
    }

    // Legs
    const legAnim = Math.abs(hero.targetX - hero.x) > 0.1 ? Math.sin(time / 80) * 4 : 0;
    ctx.fillStyle = '#4338ca';
    ctx.fillRect(drawX + 10, drawY + 24, 4, 6 + Math.max(0, legAnim));
    ctx.fillRect(drawX + 18, drawY + 24, 4, 6 + Math.max(0, -legAnim));

    // Boots
    ctx.fillStyle = '#92400e';
    ctx.fillRect(drawX + 9, drawY + 28 + Math.max(0, legAnim), 6, 3);
    ctx.fillRect(drawX + 17, drawY + 28 + Math.max(0, -legAnim), 6, 3);

    ctx.globalAlpha = 1;
  }

  _drawSlashEffects() {
    const { ctx, theme } = this;
    for (const slash of this.slashEffects) {
      const progress = 1 - slash.timer / 15;
      ctx.save();
      ctx.translate(slash.x, slash.y);
      ctx.rotate(progress * Math.PI * 0.8);

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3 - progress * 2;
      ctx.globalAlpha = 1 - progress;
      ctx.beginPath();
      ctx.arc(0, 0, 15 + progress * 25, -0.5, 1.5);
      ctx.stroke();

      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 20 + progress * 20, -0.3, 1.2);
      ctx.stroke();

      ctx.restore();
    }
  }

  _drawHPBars() {
    const { ctx, monster, canvas } = this;
    if (!monster.type || monster.dead) return;

    const barWidth = 120;
    const barHeight = 10;
    const x = canvas.width - barWidth - 20;
    const y = 16;
    const hpRatio = monster.hp / monster.maxHp;

    // Monster name
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(monster.type.name, x + barWidth, y - 4);

    // HP bar background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, barWidth, barHeight);

    // HP fill
    const color = hpRatio > 0.5 ? '#22c55e' : hpRatio > 0.2 ? '#f59e0b' : '#ef4444';
    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y + 1, (barWidth - 2) * hpRatio, barHeight - 2);

    // HP text
    ctx.font = 'bold 9px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(`${monster.hp}/${monster.maxHp}`, x + barWidth / 2, y + barHeight - 2);

    // Hero HP bar (left side)
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#6366f1';
    ctx.fillText('⚔️ 英雄', 20, y - 4);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(20, y, barWidth, barHeight);
    ctx.strokeStyle = '#475569';
    ctx.strokeRect(20, y, barWidth, barHeight);
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(21, y + 1, barWidth - 2, barHeight - 2);
    ctx.font = 'bold 9px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('♥ ♥ ♥', 20 + barWidth / 2, y + barHeight - 2);
  }

  _drawSpeechBubble() {
    if (!this.speechBubble) return;
    const { ctx, hero, time } = this;
    const px = Math.floor(hero.x * TILE) + TILE / 2;
    const py = Math.floor(hero.y * TILE) - 16;
    const text = this.speechBubble.text;
    const alpha = Math.min(1, this.speechBubble.timer / 15);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = '12px "Inter", sans-serif';
    const tw = ctx.measureText(text).width + 20;
    const th = 26;
    const bx = px - tw / 2;
    const by = py - th - 10;

    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.beginPath();
    ctx.roundRect(bx, by, tw, th, 8);
    ctx.fill();

    // Pointer
    ctx.beginPath();
    ctx.moveTo(px - 5, by + th);
    ctx.lineTo(px + 5, by + th);
    ctx.lineTo(px, by + th + 8);
    ctx.fill();

    ctx.fillStyle = '#1a1a2e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, px, by + th / 2);
    ctx.restore();
  }

  _drawFloatingTexts() {
    const { ctx } = this;
    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.font = 'bold 14px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = ft.color;
      ctx.shadowColor = ft.color;
      ctx.shadowBlur = 6;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }

  _drawParticles() {
    const { ctx } = this;
    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }

  _drawVignette() {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;
    const g = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.7);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.35)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  _spawnParticles(x, y, count, colors) {
    const palette = colors || [this.theme.accent, '#fbbf24', '#f472b6', '#a78bfa'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        size: 2 + Math.random() * 4,
        life: 1,
        decay: 0.01 + Math.random() * 0.025,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
}
