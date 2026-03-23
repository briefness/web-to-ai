/**
 * difficultyVariants.js - 关卡难度变体数据
 *
 * 每个关卡可选提供 normal / hard 难度
 * 由 levelData.js 在末尾自动合并到 level.difficulties
 *
 * 设计原则：
 * - easy (默认主体)：填空入门，3 个验证点，~5 分钟
 * - normal：需要写完整逻辑，5-6 个验证点，~15 分钟
 * - hard：综合应用+实战级别，~30 分钟（未来扩展）
 */

const variants = {

  // ============================================================
  // Week 1：Python 山谷
  // ============================================================

  '1-1': {
    normal: {
      initialCode: `# ⚔️ 任务：温度转换器 + 数据报表
# 公式：°F = °C × 9/5 + 32

# === 第一部分：基础变量 ===
celsius = ___
fahrenheit = ___
print(f"{celsius}°C = {fahrenheit}°F")

# === 第二部分：批量转换 ===
temps_c = [0, 20, 37, 100]
temps_f = []
for c in temps_c:
    temps_f.append(c * 9 / 5 + 32)

# 计算平均华氏温度
avg_f = ___
print(f"avg_fahrenheit: {avg_f:.1f}")

# === 第三部分：字符串处理 ===
title = "temperature report"
print(f"title: {title.upper()}")
separator = ___
print(f"separator: {separator}")
`,
      objectives: [
        { id: 'obj1', text: '创建 celsius = 100' },
        { id: 'obj2', text: '计算 fahrenheit = 212.0' },
        { id: 'obj3', text: '打印温度转换结果' },
        { id: 'obj4', text: '计算平均华氏温度' },
        { id: 'obj5', text: '字符串 upper()' },
        { id: 'obj6', text: '字符串乘法' },
      ],
      validation: { checks: [
        { type: 'variable_check', objectiveId: 'obj1', variable: 'celsius', expected: 100, displayValue: 'celsius=100 ✓', speechText: '变量命中！', errorText: 'celsius = 100' },
        { type: 'variable_check', objectiveId: 'obj2', variable: 'fahrenheit', expected: 212.0, displayValue: 'fahrenheit=212 ✓', speechText: '计算精准！', errorText: 'celsius * 9/5 + 32' },
        { type: 'output_contains', objectiveId: 'obj3', expected: '100°C = 212.0°F', displayValue: '转换输出 ✓', speechText: 'f-string！', errorText: '检查 print 格式' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'avg_fahrenheit: 9', displayValue: '平均值 ✓', speechText: 'sum/len 组合！', errorText: 'sum(temps_f) / len(temps_f)' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'title: TEMPERATURE REPORT', displayValue: 'upper() ✓', speechText: '字符串方法！', errorText: 'title.upper()' },
        { type: 'output_contains', objectiveId: 'obj6', expected: 'separator: --------------------', displayValue: '乘法 ✓', speechText: '终结！', errorText: '"-" * 20' },
      ]},
      hints: ['💡 celsius=100, fahrenheit=celsius*9/5+32', '💡 avg_f=sum(temps_f)/len(temps_f)', '💡 separator="-"*20'],
      rewards: { xp: 80 },
      scene: { theme: 'cave', monster: 'slime', totalObjectives: 6 },
    },
  },

  '1-2': {
    normal: {
      initialCode: `# ⚔️ 任务：列表全面操作

# === 基础 ===
treasures = ["diamond", "sword", "shield", "scroll", "orb"]
chosen = ___
top_three = ___
total = ___
print(f"chosen: {chosen}")
print(f"top_three: {top_three}")
print(f"total: {total}")

# === 进阶：分数分析 ===
scores = [85, 92, 78, 95, 60, 88, 73, 91]

# 获取最后 3 个分数
last_three = ___
print(f"last_three: {last_three}")

# 反转列表
reversed_scores = ___
print(f"reversed: {reversed_scores}")

# 最高分和最低分
high = ___
low = ___
print(f"high: {high}, low: {low}")
`,
      objectives: [
        { id: 'obj1', text: '索引获取 "shield"' },
        { id: 'obj2', text: '切片获取前 3 个' },
        { id: 'obj3', text: 'len() 获取总数' },
        { id: 'obj4', text: '负索引获取最后 3 个' },
        { id: 'obj5', text: '步长反转列表' },
        { id: 'obj6', text: 'max/min 找极值' },
      ],
      validation: { checks: [
        { type: 'variable_check', objectiveId: 'obj1', variable: 'chosen', expected: 'shield', displayValue: 'chosen ✓', speechText: '索引命中！', errorText: 'treasures[2]' },
        { type: 'output_contains', objectiveId: 'obj2', expected: "top_three: ['diamond', 'sword', 'shield']", displayValue: '切片 ✓', speechText: '切片攻击！', errorText: 'treasures[:3]' },
        { type: 'variable_check', objectiveId: 'obj3', variable: 'total', expected: 5, displayValue: 'total=5 ✓', speechText: 'len()！', errorText: 'len(treasures)' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'last_three: [73, 91]', displayValue: '负索引 ✓', speechText: '负索引！', errorText: 'scores[-3:]' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'reversed: [91, 73, 88, 60, 95, 78, 92, 85]', displayValue: '反转 ✓', speechText: '反转术！', errorText: 'scores[::-1]' },
        { type: 'variable_check', objectiveId: 'obj6', variable: 'high', expected: 95, displayValue: 'high=95 ✓', speechText: '终结！', errorText: 'max(scores)' },
      ]},
      hints: ['💡 treasures[2], treasures[:3], len(treasures)', '💡 scores[-3:], scores[::-1]', '💡 max(scores), min(scores)'],
      rewards: { xp: 100 },
      scene: { theme: 'maze', monster: 'skeleton', totalObjectives: 6 },
    },
  },

  '1-3': {
    normal: {
      initialCode: `# ⚔️ 任务：字典全面操作

# === 基础 ===
hero = {"name": "Python Knight", "level": 1, "hp": 100, "attack": 25}

hero_name = ___
___  # hero["defense"] = 15
all_attrs = ___

print(f"hero_name: {hero_name}")
print(f"defense: {hero['defense']}")
print(f"attrs: {all_attrs}")

# === 进阶：安全取值 ===
magic = ___  # hero.get("magic", 0)
print(f"magic: {magic}")

# 遍历字典
for key, value in hero.items():
    print(f"  {key}: {value}")

# === 嵌套字典 ===
equipment = {
    "weapon": {"name": "Iron Sword", "damage": 15},
    "armor": {"name": "Leather Armor", "defense": 10},
}
weapon_damage = ___
total_stats = equipment["weapon"]["damage"] + equipment["armor"]["defense"]
print(f"weapon_damage: {weapon_damage}")
print(f"total_stats: {total_stats}")
`,
      objectives: [
        { id: 'obj1', text: '获取英雄名字' },
        { id: 'obj2', text: '添加 defense 属性' },
        { id: 'obj3', text: '获取所有属性名' },
        { id: 'obj4', text: '安全取值 get()' },
        { id: 'obj5', text: '访问嵌套字典' },
        { id: 'obj6', text: '计算装备总属性' },
      ],
      validation: { checks: [
        { type: 'variable_check', objectiveId: 'obj1', variable: 'hero_name', expected: 'Python Knight', displayValue: 'hero_name ✓', speechText: '取值命中！', errorText: 'hero["name"]' },
        { type: 'expression_check', objectiveId: 'obj2', expression: 'hero.get("defense")', expected: 15, displayValue: 'defense=15 ✓', speechText: '新属性！', errorText: 'hero["defense"]=15' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'attrs:', displayValue: 'keys() ✓', speechText: 'keys()！', errorText: 'list(hero.keys())' },
        { type: 'variable_check', objectiveId: 'obj4', variable: 'magic', expected: 0, displayValue: 'magic=0 ✓', speechText: 'get()安全取值！', errorText: 'hero.get("magic", 0)' },
        { type: 'variable_check', objectiveId: 'obj5', variable: 'weapon_damage', expected: 15, displayValue: 'weapon_damage ✓', speechText: '嵌套访问！', errorText: 'equipment["weapon"]["damage"]' },
        { type: 'output_contains', objectiveId: 'obj6', expected: 'total_stats: 25', displayValue: 'total=25 ✓', speechText: '终结！', errorText: '检查嵌套字典访问' },
      ]},
      hints: ['💡 hero["name"], hero["defense"]=15', '💡 hero.get("magic", 0)', '💡 equipment["weapon"]["damage"]'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 6 },
    },
  },

  '1-4': {
    normal: {
      initialCode: `# ⚔️ 任务：完整战斗函数库

# === 基础函数 ===
def attack_power(base, multiplier):
    ___

def heal(current_hp, amount=___):
    ___

damage = attack_power(25, 3)
new_hp = heal(60)
full_heal = heal(90, 30)
print(f"damage: {damage}")
print(f"new_hp: {new_hp}")
print(f"full_heal: {full_heal}")

# === 进阶：*args 可变参数 ===
def average(*args):
    if not args:
        return 0
    return ___

avg = average(10, 20, 30, 40)
print(f"avg: {avg}")

# === 进阶：clamp 函数 ===
def clamp(value, min_val, max_val):
    ___

print(f"clamp1: {clamp(150, 0, 100)}")
print(f"clamp2: {clamp(-5, 0, 100)}")
print(f"clamp3: {clamp(50, 0, 100)}")
`,
      objectives: [
        { id: 'obj1', text: 'attack_power 函数' },
        { id: 'obj2', text: 'heal 默认参数' },
        { id: 'obj3', text: 'full_heal 上限 100' },
        { id: 'obj4', text: 'average *args' },
        { id: 'obj5', text: 'clamp 边界限制' },
      ],
      validation: { checks: [
        { type: 'function_call', objectiveId: 'obj1', function: 'attack_power', args: [25, 3], expected: 75, displayValue: 'attack=75 ✓', speechText: '函数攻击！', errorText: 'return base * multiplier' },
        { type: 'function_call', objectiveId: 'obj2', function: 'heal', args: [60], expected: 80, displayValue: 'heal=80 ✓', speechText: '默认参数！', errorText: 'amount=20, min(current_hp+amount,100)' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'full_heal: 100', displayValue: 'min()上限 ✓', speechText: 'min()防溢出！', errorText: 'heal(90,30)应返回100' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'avg: 25.0', displayValue: 'average ✓', speechText: '*args 解锁！', errorText: 'sum(args)/len(args)' },
        { type: 'function_call', objectiveId: 'obj5', function: 'clamp', args: [150, 0, 100], expected: 100, displayValue: 'clamp ✓', speechText: '终结！函数大师！', errorText: 'max(min_val, min(value, max_val))' },
      ]},
      hints: ['💡 return base*multiplier; amount=20', '💡 return sum(args)/len(args)', '💡 return max(min_val, min(value, max_val))'],
      rewards: { xp: 120 },
      scene: { theme: 'forest', monster: 'dragon', totalObjectives: 5 },
    },
  },

  '1-5': {
    normal: {
      initialCode: `# ⚔️ 任务：完整战斗系统

# === 基础类 ===
class Hero:
    def __init__(self, name, hp=100, attack=25):
        ___  # self.name, self.hp, self.attack

    def take_damage(self, damage):
        ___  # self.hp 减少，最低 0
        return self.hp

    def is_alive(self):
        ___  # return self.hp > 0

    def status(self):
        state = "alive" if self.is_alive() else "dead"
        return f"{self.name} [HP:{self.hp} ATK:{self.attack}] {state}"

knight = Hero("Python Knight", 100, 30)
print(knight.status())
knight.take_damage(40)
print(f"hp_after: {knight.hp}")
print(f"alive: {knight.is_alive()}")

# === 继承与战斗 ===
class BattleHero(Hero):
    def __init__(self, name, hp=100, attack=25):
        super().__init__(name, hp, attack)
        self.kills = 0

    def attack_target(self, target):
        target.take_damage(self.attack)
        if not target.is_alive():
            self.kills += 1
        return self.attack

    def battle_report(self):
        return f"{self.name}: {self.kills} kills, HP={self.hp}"

warrior = BattleHero("Warrior", 120, 35)
enemy1 = BattleHero("Goblin", 30, 10)
enemy2 = BattleHero("Orc", 50, 15)
warrior.attack_target(enemy1)
warrior.attack_target(enemy2)
enemy2.attack_target(warrior)
print(warrior.battle_report())
print(f"enemy1_alive: {enemy1.is_alive()}")
print(f"enemy2_hp: {enemy2.hp}")
`,
      objectives: [
        { id: 'obj1', text: '__init__ 方法' },
        { id: 'obj2', text: 'take_damage 方法' },
        { id: 'obj3', text: 'is_alive 方法' },
        { id: 'obj4', text: 'Goblin 被击杀' },
        { id: 'obj5', text: 'Warrior 战斗报告' },
      ],
      validation: { checks: [
        { type: 'expression_check', objectiveId: 'obj1', expression: 'knight.name', expected: 'Python Knight', displayValue: 'knight.name ✓', speechText: '__init__！', errorText: 'self.name=name,self.hp=hp,self.attack=attack' },
        { type: 'expression_check', objectiveId: 'obj2', expression: 'knight.hp', expected: 60, displayValue: 'hp=60 ✓', speechText: '方法调用！', errorText: 'self.hp=max(self.hp-damage,0)' },
        { type: 'expression_check', objectiveId: 'obj3', expression: 'knight.is_alive()', expected: true, displayValue: 'alive ✓', speechText: '布尔返回值！', errorText: 'return self.hp > 0' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'enemy1_alive: False', displayValue: 'Goblin击杀 ✓', speechText: '继承+攻击！', errorText: '__init__和take_damage要正确' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'Warrior: 1 kills', displayValue: '战斗报告 ✓', speechText: '终结！OOP大师！', errorText: '确保take_damage正确' },
      ]},
      hints: ['💡 self.name=name; self.hp=hp; self.attack=attack', '💡 self.hp=max(self.hp-damage,0)', '💡 return self.hp>0'],
      rewards: { xp: 150 },
      scene: { theme: 'temple', monster: 'wizard', totalObjectives: 5 },
    },
  },

  // ============================================================
  // Week 2：进阶峡谷
  // ============================================================

  '2-1': {
    normal: {
      initialCode: `# ⚔️ 任务：完整的等级评定系统

score = 85

# 1. 用 if/elif/else 判断等级
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"

# 2. 判断是否通过
passed = ___

# 3. 三元表达式
result = "优秀" if score >= 90 else ___

print(f"score: {score}, grade: {grade}")
print(f"passed: {passed}")
print(f"result: {result}")

# === 进阶：FizzBuzz ===
output = []
for i in range(1, 16):
    if i % 15 == 0:
        output.append("FizzBuzz")
    elif i % 3 == 0:
        output.append("Fizz")
    elif i % 5 == 0:
        output.append("Buzz")
    else:
        output.append(str(i))

print(f"fizzbuzz: {','.join(output[:5])}")

# === 进阶：嵌套条件 ===
age = 25
has_ticket = True
can_enter = ___  # age >= 18 and has_ticket
print(f"can_enter: {can_enter}")
`,
      objectives: [
        { id: 'obj1', text: 'if/elif 判断等级 B' },
        { id: 'obj2', text: '布尔判断 passed' },
        { id: 'obj3', text: '三元表达式 result' },
        { id: 'obj4', text: 'FizzBuzz 输出' },
        { id: 'obj5', text: '逻辑运算 and' },
      ],
      validation: { checks: [
        { type: 'variable_check', objectiveId: 'obj1', variable: 'grade', expected: 'B', displayValue: 'grade=B ✓', speechText: 'if/elif 精准！', errorText: 'score=85走elif>=80' },
        { type: 'variable_check', objectiveId: 'obj2', variable: 'passed', expected: true, displayValue: 'passed=True ✓', speechText: '布尔判断！', errorText: 'passed = score >= 60' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'result: 良好', displayValue: 'result ✓', speechText: '三元表达式！', errorText: '"良好"' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'fizzbuzz: 1,2,Fizz,4,Buzz', displayValue: 'FizzBuzz ✓', speechText: 'FizzBuzz 经典！', errorText: '检查 FizzBuzz 逻辑' },
        { type: 'variable_check', objectiveId: 'obj5', variable: 'can_enter', expected: true, displayValue: 'can_enter ✓', speechText: '终结！逻辑大师！', errorText: 'age >= 18 and has_ticket' },
      ]},
      hints: ['💡 passed = score >= 60', '💡 else "良好"', '💡 can_enter = age >= 18 and has_ticket'],
      rewards: { xp: 100 },
      scene: { theme: 'cave', monster: 'slime', totalObjectives: 5 },
    },
  },

  '2-4': {
    normal: {
      initialCode: `# ⚔️ 任务：推导式综合应用

# === 基础推导 ===
squares = ___  # [x**2 for x in range(1, 11)]
even_squares = ___  # [x for x in squares if x % 2 == 0]
square_dict = ___  # {i: str(i**2) for i in range(1, 6)}

print(f"squares: {squares}")
print(f"even_squares: {even_squares}")
print(f"square_dict: {square_dict}")

# === 进阶：文本处理 ===
words = ["Hello", "World", "Python", "AI"]
# 全部转小写
lower_words = ___  # [w.lower() for w in words]
print(f"lower: {lower_words}")

# 只保留长度 > 3 的单词
long_words = ___  # [w for w in words if len(w) > 3]
print(f"long: {long_words}")

# === 进阶：嵌套推导（矩阵展平）===
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = ___  # [x for row in matrix for x in row]
print(f"flat: {flat}")
`,
      objectives: [
        { id: 'obj1', text: '平方数列表' },
        { id: 'obj2', text: '过滤偶数平方' },
        { id: 'obj3', text: '字典推导式' },
        { id: 'obj4', text: '字符串推导' },
        { id: 'obj5', text: '条件过滤推导' },
        { id: 'obj6', text: '嵌套推导（矩阵展平）' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]', displayValue: 'squares ✓', speechText: '列表推导！', errorText: '[x**2 for x in range(1,11)]' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'even_squares: [4, 16, 36, 64, 100]', displayValue: 'even ✓', speechText: '条件推导！', errorText: '[x for x in squares if x%2==0]' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'square_dict: {1:', displayValue: 'dict ✓', speechText: '字典推导！', errorText: '{i:str(i**2) for i in range(1,6)}' },
        { type: 'output_contains', objectiveId: 'obj4', expected: "lower: ['hello', 'world', 'python', 'ai']", displayValue: 'lower ✓', speechText: '字符串处理！', errorText: '[w.lower() for w in words]' },
        { type: 'output_contains', objectiveId: 'obj5', expected: "long: ['Hello', 'World', 'Python']", displayValue: 'filter ✓', speechText: '条件过滤！', errorText: '[w for w in words if len(w)>3]' },
        { type: 'output_contains', objectiveId: 'obj6', expected: 'flat: [1, 2, 3, 4, 5, 6, 7, 8, 9]', displayValue: 'flat ✓', speechText: '终结！推导大师！', errorText: '[x for row in matrix for x in row]' },
      ]},
      hints: ['💡 [x**2 for x in range(1,11)]', '💡 [w.lower() for w in words]', '💡 [x for row in matrix for x in row]'],
      rewards: { xp: 120 },
      scene: { theme: 'forest', monster: 'dragon', totalObjectives: 6 },
    },
  },

  // ============================================================
  // Week 3-4：后端基础（AI 前置知识）
  // ============================================================

  '3-1': {
    normal: {
      initialCode: `# ⚔️ 任务：完整的 HTTP 路由系统

# 路由表：路径 → 处理函数
def handle_users():
    return [{"name": "Alice"}, {"name": "Bob"}]

def handle_user_detail(user_id):
    users = {"1": "Alice", "2": "Bob"}
    return users.get(str(user_id), "Not Found")

def handle_create_user(name):
    return {"name": name, "id": 3, "created": True}

# 1. 构建路由表（字典映射）
routes = {
    "GET /users": ___,
    "GET /users/1": ___,
    "POST /users": ___,
}

# 2. 路由分发函数
def dispatch(method, path, **kwargs):
    key = f"{method} {path}"
    handler = routes.get(key)
    if handler is None:
        return {"error": 404, "message": "Not Found"}
    if kwargs:
        return handler(**kwargs)
    return handler()

# 3. 测试路由
r1 = dispatch("GET", "/users")
r2 = dispatch("GET", "/users/1")
r3 = dispatch("POST", "/users", name="Charlie")
r4 = dispatch("DELETE", "/users/1")

print(f"r1: {r1}")
print(f"r2: {r2}")
print(f"r3_created: {r3['created']}")
print(f"r4_error: {r4['error']}")
`,
      objectives: [
        { id: 'obj1', text: 'GET /users 路由' },
        { id: 'obj2', text: 'GET /users/1 路由' },
        { id: 'obj3', text: 'POST 创建用户' },
        { id: 'obj4', text: '404 处理' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: "r1: [{'name': 'Alice'}", displayValue: 'GET路由 ✓', speechText: '路由命中！', errorText: 'routes["GET /users"] = handle_users' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'r2: Alice', displayValue: '详情路由 ✓', speechText: '参数路由！', errorText: '使用 lambda: handle_user_detail(1)' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'r3_created: True', displayValue: 'POST ✓', speechText: '创建成功！', errorText: 'lambda name: handle_create_user(name)' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'r4_error: 404', displayValue: '404 ✓', speechText: '终结！路由大师！', errorText: 'dispatch 中 routes.get 返回 None' },
      ]},
      hints: ['💡 routes["GET /users"] = handle_users', '💡 使用 lambda 包装带参数的handler', '💡 routes.get(key) 找不到返回 None'],
      rewards: { xp: 100 },
      scene: { theme: 'cave', monster: 'slime', totalObjectives: 4 },
    },
  },

  // ============================================================
  // Week 5-6：AI 核心基础（最关键）
  // ============================================================

  '5-1': {
    normal: {
      initialCode: `# ⚔️ 任务：完整的 Token 计费系统

# === Token 估算 ===
def estimate_tokens(text):
    """简单估算：英文按空格分词，中文每个字算 2 token"""
    words = text.split()
    count = 0
    for w in words:
        has_cjk = any('\\u4e00' <= ch <= '\\u9fff' for ch in w)
        count += len(w) * 2 if has_cjk else 1
    return count

# 测试
en_text = "Hello World this is a test"
cn_text = "你好 世界 这是 测试"
en_tokens = estimate_tokens(en_text)
cn_tokens = estimate_tokens(cn_text)
print(f"en_tokens: {en_tokens}")
print(f"cn_tokens: {cn_tokens}")

# === 费用计算 ===
PRICING = {
    "gpt-4": {"input": 0.03, "output": 0.06},
    "gpt-3.5": {"input": 0.001, "output": 0.002},
    "gpt-4o-mini": {"input": 0.00015, "output": 0.0006},
}

def calc_cost(model, input_tokens, output_tokens):
    """计算 API 调用费用（美元/千 token）"""
    price = PRICING.get(model)
    if not price:
        return -1
    return ___  # (input_tokens * price["input"] + output_tokens * price["output"]) / 1000

cost_4 = calc_cost("gpt-4", 1000, 500)
cost_mini = calc_cost("gpt-4o-mini", 1000, 500)
print(f"gpt4_cost: {cost_4:.4f}")
print(f"mini_cost: {cost_mini:.5f}")
print(f"savings: {(1 - cost_mini / cost_4) * 100:.0f}%")

# === Temperature 对比 ===
def simulate_temp(text, temperature):
    if temperature == 0:
        return text  # 确定性输出
    return text + " [随机变体]"

r1 = simulate_temp("Hello", 0)
r2 = simulate_temp("Hello", 0.7)
print(f"temp0: {r1}")
print(f"temp07: {r2}")
`,
      objectives: [
        { id: 'obj1', text: 'Token 估算（英文）' },
        { id: 'obj2', text: 'Token 估算（中文更多）' },
        { id: 'obj3', text: '实现费用计算' },
        { id: 'obj4', text: '计算 gpt-4o-mini 省多少钱' },
        { id: 'obj5', text: 'Temperature 效果' },
      ],
      validation: { checks: [
        { type: 'variable_check', objectiveId: 'obj1', variable: 'en_tokens', expected: 6, displayValue: 'en=6 ✓', speechText: 'Token计数！', errorText: '英文按空格分6个词' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'cn_tokens:', displayValue: 'cn_tokens ✓', speechText: '中文Token更多！', errorText: '中文每字算2token' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'gpt4_cost: 0.0600', displayValue: '费用计算 ✓', speechText: 'API计费！', errorText: '(input*price_in + output*price_out)/1000' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'savings: 99%', displayValue: '省99% ✓', speechText: '成本优化！', errorText: '检查 calc_cost 公式' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'temp0: Hello', displayValue: 'temp=0 ✓', speechText: '终结！Token大师！', errorText: 'temperature=0确定性输出' },
      ]},
      hints: ['💡 (input_tokens * price["input"] + output_tokens * price["output"]) / 1000', '💡 gpt-4o-mini 比 gpt-4 便宜约 99%', '💡 temperature=0 每次相同输出'],
      rewards: { xp: 120 },
      scene: { theme: 'cave', monster: 'slime', totalObjectives: 5 },
    },
  },

  '5-2': {
    normal: {
      initialCode: `# ⚔️ 任务：Prompt 工程实战

# === 消息格式 ===
def build_messages(system_prompt, user_input, examples=None):
    messages = [{"role": ___, "content": system_prompt}]
    if examples:
        for ex in examples:
            messages.append({"role": "user", "content": ex["input"]})
            messages.___({"role": "assistant", "content": ex["output"]})
    messages.append({"role": "user", "content": user_input})
    return messages

# 1. 基础 Prompt
basic = build_messages("你是 Python 专家", "什么是列表？")
print(f"basic_len: {len(basic)}")
print(f"basic_roles: {[m['role'] for m in basic]}")

# 2. Few-shot Prompt（带示例）
examples = [
    {"input": "苹果", "output": "水果"},
    {"input": "猫", "output": "动物"},
]
fewshot = build_messages(
    "对输入进行分类，只输出类别",
    "Python",
    examples=examples,
)
print(f"fewshot_len: {len(fewshot)}")

# 3. Prompt 质量评分
def score_prompt(prompt):
    score = 0
    if "角色" in prompt or "你是" in prompt:
        score += 30
    if "格式" in prompt or "JSON" in prompt:
        score += 25
    if "示例" in prompt or "例如" in prompt:
        score += 25
    if len(prompt) > 20:
        score += 20
    return min(score, 100)

s1 = score_prompt("翻译这句话")
s2 = score_prompt("你是翻译专家，请将以下文本翻译为英文，以JSON格式输出，例如{}")
print(f"score_bad: {s1}")
print(f"score_good: {s2}")
`,
      objectives: [
        { id: 'obj1', text: '基础消息构建' },
        { id: 'obj2', text: 'Few-shot 消息' },
        { id: 'obj3', text: 'Prompt 质量评分' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: "basic_roles: ['system', 'user']", displayValue: 'basic ✓', speechText: '消息格式！', errorText: 'system + user 消息' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'fewshot_len: 6', displayValue: 'fewshot ✓', speechText: 'Few-shot！', errorText: 'system + 2对示例 + user = 6' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'score_good: 100', displayValue: '评分 ✓', speechText: '终结！Prompt大师！', errorText: '好的Prompt包含角色+格式+示例' },
      ]},
      hints: ['💡 build_messages 已实现，观察输出', '💡 fewshot: system + 2*example + user = 6条', '💡 好Prompt = 角色+格式+示例'],
      rewards: { xp: 100 },
      scene: { theme: 'maze', monster: 'skeleton', totalObjectives: 3 },
    },
  },

  '6-1': {
    normal: {
      initialCode: `# ⚔️ 任务：向量相似度搜索引擎

import math

# === 余弦相似度 ===
def cosine_similarity(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x ** 2 for x in a))
    norm_b = math.sqrt(sum(x ** 2 for x in b))
    if norm_a == 0 or norm_b == 0:
        return 0
    return ___  # dot / (norm_a * norm_b)

# 测试
v1 = [1, 0, 0]
v2 = [0, 1, 0]
v3 = [1, 0, 1]
v4 = [1, 0, 0]

sim_same = cosine_similarity(v1, v4)
sim_ortho = cosine_similarity(v1, v2)
sim_partial = cosine_similarity(v1, v3)

print(f"sim_same: {sim_same:.2f}")
print(f"sim_ortho: {sim_ortho:.2f}")
print(f"sim_partial: {sim_partial:.2f}")

# === 语义搜索 ===
documents = {
    "Python入门": [0.9, 0.1, 0.2],
    "机器学习": [0.3, 0.8, 0.6],
    "Web开发": [0.7, 0.2, 0.1],
    "深度学习": [0.2, 0.9, 0.7],
}

def search(query_vec, docs, top_k=2):
    results = []
    for name, vec in docs.items():
        sim = cosine_similarity(query_vec, vec)
        results.append((name, round(sim, 3)))
    results.sort(key=lambda x: x[1], reverse=___)
    return results[:top_k]

# 搜索"AI相关"
query = [0.2, 0.9, 0.8]
results = search(query, documents)
print(f"top1: {results[0][0]}")
print(f"top2: {results[1][0]}")
`,
      objectives: [
        { id: 'obj1', text: '余弦相似度（相同向量=1）' },
        { id: 'obj2', text: '正交向量相似度=0' },
        { id: 'obj3', text: '搜索最相关文档' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'sim_same: 1.00', displayValue: 'cosine=1 ✓', speechText: '余弦相似度！', errorText: 'return dot/(norm_a*norm_b)' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'sim_ortho: 0.00', displayValue: '正交=0 ✓', speechText: '向量空间理解！', errorText: '正交向量点积为0' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'top1: 深度学习', displayValue: '搜索 ✓', speechText: '终结！向量搜索大师！', errorText: 'query=[0.2,0.9,0.8]最接近深度学习' },
      ]},
      hints: ['💡 return dot / (norm_a * norm_b)', '💡 相同向量余弦=1，正交=0', '💡 搜索结果按相似度降序排列'],
      rewards: { xp: 120 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 3 },
    },
  },

  // ============================================================
  // Week 9-10：RAG（核心 AI 技能）
  // ============================================================

  '9-1': {
    normal: {
      initialCode: `# ⚔️ 任务：构建完整 RAG Pipeline

# === 1. 文本分割 ===
def chunk_text(text, chunk_size=50, overlap=10):
    """将文本按固定大小分割，支持重叠"""
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        start += ___  # chunk_size - overlap
    return chunks

doc = "Python是一门强大的编程语言。它简洁优雅，适合初学者。AI领域大量使用Python，包括机器学习、深度学习和自然语言处理。RAG是检索增强生成的缩写，它结合了搜索和AI生成。"
chunks = chunk_text(doc, chunk_size=30, overlap=5)
print(f"chunks_count: {len(chunks)}")
print(f"chunk_0: {chunks[0]}")

# === 2. 模拟 Embedding ===
def fake_embed(text):
    """用字符频率模拟向量（教学用）"""
    vec = [0] * 5
    for ch in text:
        code = ord(ch) % 5
        vec[code] += 1
    norm = sum(v ** 2 for v in vec) ** 0.5
    return [round(v / norm, 3) if norm > 0 else 0 for v in vec]

# === 3. RAG 搜索 ===
import math

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = math.sqrt(sum(x**2 for x in a))
    nb = math.sqrt(sum(x**2 for x in b))
    return dot / (na * nb) if na and nb else 0

def rag_search(query, chunks, top_k=2):
    q_vec = fake_embed(query)
    scored = []
    for i, chunk in enumerate(chunks):
        c_vec = fake_embed(chunk)
        sim = cosine(q_vec, c_vec)
        scored.append((i, chunk, round(sim, 3)))
    scored.sort(key=lambda x: x[2], reverse=True)
    return scored[:top_k]

results = rag_search("AI和机器学习", chunks)
print(f"top_chunk_idx: {results[0][0]}")
print(f"top_similarity: {results[0][2]}")

# === 4. 生成 Prompt ===
def build_rag_prompt(query, context_chunks):
    context = "\\n".join([c[1] for c in context_chunks])
    return f\"\"\"基于以下参考资料回答问题。

参考资料：
{context}

问题：{query}
请基于参考资料回答，如果资料中没有相关信息，回答"我不知道"。\"\"\"

prompt = build_rag_prompt("什么是RAG？", results)
print(f"prompt_has_context: {'参考资料' in prompt}")
print(f"prompt_has_query: {'什么是RAG' in prompt}")
`,
      objectives: [
        { id: 'obj1', text: '文本分割（重叠切片）' },
        { id: 'obj2', text: 'RAG 搜索返回结果' },
        { id: 'obj3', text: '生成带上下文的 Prompt' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'chunks_count:', displayValue: '分割 ✓', speechText: '文本分割！', errorText: 'chunk_size - overlap' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'top_similarity:', displayValue: '搜索 ✓', speechText: 'RAG搜索！', errorText: '检查cosine和search逻辑' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'prompt_has_context: True', displayValue: 'Prompt ✓', speechText: '终结！RAG大师！', errorText: 'Prompt应包含参考资料' },
      ]},
      hints: ['💡 start += chunk_size - overlap（重叠分割）', '💡 RAG = 搜索相关文档 → 拼入 Prompt → 让 AI 回答', '💡 Prompt 模板：参考资料 + 问题 + 指令'],
      rewards: { xp: 150 },
      scene: { theme: 'cave', monster: 'slime', totalObjectives: 3 },
    },
  },

  // ============================================================
  // Week 11-12：Agent（高级 AI）
  // ============================================================

  '11-1': {
    normal: {
      initialCode: `# ⚔️ 任务：构建 AI Agent 系统

# === 工具注册 ===
tools = {}

def register_tool(name, description):
    def decorator(func):
        ___[name] = {
            "function": func,
            "description": description,
        }
        return func
    return decorator

@register_tool("calculator", "执行数学计算")
def calculator(expression):
    return eval(expression)

@register_tool("weather", "查询天气")
def weather(city):
    data = {"北京": "晴天 25°C", "上海": "多云 22°C"}
    return data.get(city, "未知城市")

@register_tool("search", "搜索信息")
def search_info(query):
    return f"搜索结果：关于'{query}'的信息..."

# 验证工具注册
print(f"tools_count: {len(tools)}")
print(f"tool_names: {sorted(tools.keys())}")

# === Agent 执行循环 ===
class SimpleAgent:
    def __init__(self, tools):
        self.tools = tools
        self.history = []

    def call_tool(self, tool_name, **kwargs):
        tool = self.tools.get(tool_name)
        if not tool:
            return f"错误：工具 '{tool_name}' 不存在"
        result = tool["function"](**kwargs)
        self.history.append({
            "tool": tool_name,
            "args": kwargs,
            "result": result,
        })
        return result

    def get_trace(self):
        return [f"{h['tool']}({h['args']}) -> {h['result']}" for h in self.history]

agent = SimpleAgent(tools)

# 模拟 Agent 决策
r1 = agent.call_tool("weather", city="北京")
r2 = agent.call_tool("calculator", expression="2 ** 10")
r3 = agent.call_tool("search", query="Python教程")

print(f"weather: {r1}")
print(f"calc: {r2}")
print(f"trace_len: {len(agent.get_trace())}")
print(f"trace_0: {agent.get_trace()[0]}")
`,
      objectives: [
        { id: 'obj1', text: '3 个工具注册' },
        { id: 'obj2', text: 'Agent 调用天气工具' },
        { id: 'obj3', text: 'Agent 调用计算器' },
        { id: 'obj4', text: 'Agent 执行追踪' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'tools_count: 3', displayValue: '3工具 ✓', speechText: '工具注册！', errorText: '3个@register_tool' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'weather: 晴天 25°C', displayValue: '天气 ✓', speechText: 'Function Calling！', errorText: '检查 weather 工具' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'calc: 1024', displayValue: '计算 ✓', speechText: '计算工具！', errorText: '2**10=1024' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'trace_len: 3', displayValue: '追踪 ✓', speechText: '终结！Agent大师！', errorText: '3次调用3条trace' },
      ]},
      hints: ['💡 @register_tool 装饰器自动注册工具', '💡 Agent 通过 call_tool 调用工具', '💡 history 记录每次调用的工具、参数和结果'],
      rewards: { xp: 150 },
      scene: { theme: 'cave', monster: 'slime', totalObjectives: 4 },
    },
  },


  // ============================================================
  // Batch 1: 进阶峡谷 + 后端基础
  // ============================================================

  '2-2': {
    normal: {
      initialCode: `# ⚔️ 任务：循环综合挑战\n\n# 1. 用 for + enumerate 打印带序号的英雄\nheroes = [\"Alice\", \"Bob\", \"Charlie\", \"Diana\"]\nfor idx, name in ___(heroes, 1):\n    print(f\"hero_{idx}: {name}\")\n\n# 2. 嵌套循环：乘法表 (1-3)\ntable = []\nfor i in range(1, 4):\n    for j in range(i, 4):\n        table.append(f\"{i}x{j}={___}\")\nprint(f\"table_len: {len(table)}\")\n\n# 3. while+break：找第一个被7整除的数(从50起)\nn = 50\nwhile True:\n    if ___:\n        break\n    n += 1\nprint(f\"div7: {n}\")\n\n# 4. continue：收集1-20中不被3整除的数\nfiltered = []\nfor i in range(1, 21):\n    if i % 3 == 0:\n        ___\n    filtered.append(i)\nprint(f\"filtered_count: {len(filtered)}\")\n\n# 5. 累加奇数直到超过50\ntotal = 0\ncount = 0\nfor i in range(1, 100, ___):\n    total += i\n    count += 1\n    if total > 50:\n        break\nprint(f\"odd_sum: {total}\")\nprint(f\"odd_count: {count}\")`,
      objectives: [
        { id: 'obj1', text: 'enumerate 打印英雄' },
        { id: 'obj2', text: '嵌套循环乘法表' },
        { id: 'obj3', text: 'while+break 找56' },
        { id: 'obj4', text: 'continue 过滤' },
        { id: 'obj5', text: '累加奇数超50' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'hero_4: Diana', displayValue: 'enumerate ✓', speechText: 'enumerate!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'table_len: 6', displayValue: '嵌套 ✓', speechText: '嵌套循环!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'div7: 56', displayValue: 'break ✓', speechText: '精准break!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'filtered_count: 13', displayValue: 'continue ✓', speechText: 'continue!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'odd_count: 5', displayValue: '综合 ✓', speechText: '循环大师!' },
      ]},
      hints: ['💡 enumerate(list,start)从start编号', '💡 n%7==0判断整除', '💡 range第三参数是步长,奇数用2'],
      rewards: { xp: 100 },
      scene: { theme: 'maze', monster: 'skeleton', totalObjectives: 5 },
    },
  },

  '2-3': {
    normal: {
      initialCode: `# ⚔️ 任务：异常处理综合挑战\n\ndef safe_divide(a, b):\n    try:\n        result = a / b\n        return round(result, 2)\n    except ___:\n        return \"除零错误\"\n    except ___:\n        return \"类型错误\"\n\ndef read_config(data):\n    status = \"未知\"\n    try:\n        value = data[\"key\"]\n        status = \"成功\"\n        return value\n    except KeyError:\n        status = \"键不存在\"\n        return None\n    ___:\n        print(f\"read_status: {status}\")\n\nclass InsufficientFundsError(___):\n    def __init__(self, balance, amount):\n        self.balance = balance\n        self.amount = amount\n        super().__init__(f\"余额{balance}不足以支付{amount}\")\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        ___ InsufficientFundsError(balance, amount)\n    return balance - amount\n\nprint(f\"r1: {safe_divide(10, 3)}\")\nprint(f\"r2: {safe_divide(10, 0)}\")\nprint(f\"r3: {safe_divide('a', 2)}\")\nv1 = read_config({\"key\": \"value123\"})\nv2 = read_config({})\nprint(f\"v1: {v1}\")\nprint(f\"v2: {v2}\")\ntry:\n    withdraw(100, 200)\nexcept InsufficientFundsError as e:\n    print(f\"error: {e.balance}\")`,
      objectives: [
        { id: 'obj1', text: 'ZeroDivisionError捕获' },
        { id: 'obj2', text: 'TypeError捕获' },
        { id: 'obj3', text: 'finally执行' },
        { id: 'obj4', text: '自定义异常' },
        { id: 'obj5', text: '异常携带数据' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'r2: 除零错误', displayValue: '除零 ✓', speechText: '异常捕获!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'r3: 类型错误', displayValue: '类型 ✓', speechText: '多异常!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'read_status: 成功', displayValue: 'finally ✓', speechText: 'finally!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'read_status: 键不存在', displayValue: 'KeyError ✓', speechText: '异常链!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'error: 100', displayValue: '自定义 ✓', speechText: '异常大师!' },
      ]},
      hints: ['💡 ZeroDivisionError和TypeError', '💡 finally无论如何都执行', '💡 继承Exception,用raise抛出'],
      rewards: { xp: 110 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 5 },
    },
  },

  '2-5': {
    normal: {
      initialCode: `# ⚔️ 任务：装饰器综合挑战\nimport time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = ___(*args, **kwargs)\n        elapsed = round((time.time() - start) * 1000, 2)\n        print(f\"timer_{func.__name__}: {elapsed}ms\")\n        return result\n    return wrapper\n\ndef memoize(func):\n    cache = {}\n    def wrapper(*args):\n        if args not in ___:\n            cache[args] = func(*args)\n        return cache[args]\n    wrapper.cache = cache\n    return wrapper\n\ndef require_role(role):\n    def decorator(func):\n        def wrapper(user, *args, **kwargs):\n            if user.get(\"role\") != ___:\n                return f\"权限不足: 需要 {role}\"\n            return func(user, *args, **kwargs)\n        return wrapper\n    return decorator\n\n@timer\ndef slow_add(a, b):\n    return a + b\n\n@memoize\ndef fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\n@require_role(\"admin\")\ndef delete_user(user, target):\n    return f\"已删除 {target}\"\n\nr1 = slow_add(10, 20)\nfib10 = fibonacci(10)\nr2 = delete_user({\"role\": \"admin\"}, \"Bob\")\nr3 = delete_user({\"role\": \"user\"}, \"Bob\")\n\nprint(f\"add: {r1}\")\nprint(f\"fib10: {fib10}\")\nprint(f\"cached: {len(fibonacci.cache) > 0}\")\nprint(f\"admin: {r2}\")\nprint(f\"denied: {'权限不足' in r3}\")`,
      objectives: [
        { id: 'obj1', text: '计时装饰器' },
        { id: 'obj2', text: '缓存fib(10)=55' },
        { id: 'obj3', text: '缓存命中' },
        { id: 'obj4', text: '管理员通过' },
        { id: 'obj5', text: '权限拒绝' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'add: 30', displayValue: '计时 ✓', speechText: '装饰器!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'fib10: 55', displayValue: '缓存 ✓', speechText: '缓存加速!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'cached: True', displayValue: '命中 ✓', speechText: '缓存命中!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'admin: 已删除 Bob', displayValue: '权限 ✓', speechText: '权限校验!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'denied: True', displayValue: '拒绝 ✓', speechText: '装饰器大师!' },
      ]},
      hints: ['💡 wrapper中调用func(*args,**kwargs)', '💡 cache字典存储结果', '💡 role来自外层参数'],
      rewards: { xp: 120 },
      scene: { theme: 'temple', monster: 'wizard', totalObjectives: 5 },
    },
  },

  'boss-1': {
    normal: {
      initialCode: `# ⚔️ BOSS：Python 综合实战\n\nclass Calculator:\n    def __init__(self):\n        self.history = []\n    def add(self, a, b):\n        result = ___\n        self.history.append(f\"{a}+{b}={result}\")\n        return result\n    def multiply(self, a, b):\n        result = ___\n        self.history.append(f\"{a}*{b}={result}\")\n        return result\n    def chain(self, value, operations):\n        for op, arg in operations:\n            if op == \"add\": value = self.add(value, arg)\n            elif op == \"mul\": value = self.multiply(value, arg)\n        return value\n\ndef pipeline(data, *transforms):\n    for fn in ___:\n        data = fn(data)\n    return data\n\ndef safe(func):\n    def wrapper(*args, **kwargs):\n        try:\n            return {\"ok\": True, \"result\": func(*args, **kwargs)}\n        except Exception as e:\n            return {\"ok\": ___, \"error\": str(e)}\n    return wrapper\n\n@safe\ndef divide(a, b):\n    return a / b\n\ncalc = Calculator()\nr1 = calc.chain(10, [(\"add\", 5), (\"mul\", 3)])\nr2 = pipeline([3,1,4,1,5], sorted, lambda x: x[-3:], sum)\nr3 = divide(10, 2)\nr4 = divide(10, 0)\n\nprint(f\"chain: {r1}\")\nprint(f\"history: {len(calc.history)}\")\nprint(f\"pipeline: {r2}\")\nprint(f\"safe_ok: {r3['ok']}\")\nprint(f\"safe_err: {r4['ok']}\")`,
      objectives: [
        { id: 'obj1', text: 'chain=(10+5)*3=45' },
        { id: 'obj2', text: '2次操作历史' },
        { id: 'obj3', text: 'pipeline流转' },
        { id: 'obj4', text: 'safe正常' },
        { id: 'obj5', text: 'safe捕获异常' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'chain: 45', displayValue: '链式 ✓', speechText: 'BOSS第一击!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'history: 2', displayValue: '历史 ✓', speechText: '记录完美!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'pipeline: 12', displayValue: '管道 ✓', speechText: 'Pipeline!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'safe_ok: True', displayValue: '安全 ✓', speechText: '装饰器!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'safe_err: False', displayValue: '异常 ✓', speechText: '🏆 BOSS击败!' },
      ]},
      hints: ['💡 add返回a+b,multiply返回a*b', '💡 pipeline遍历transforms', '💡 异常时ok为False'],
      rewards: { xp: 250 },
      scene: { theme: 'temple', monster: 'dragon', totalObjectives: 5 },
    },
  },

  '3-2': {
    normal: {
      initialCode: `# ⚔️ 任务：数据验证挑战\nfrom dataclasses import dataclass, field\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    stock: int = 0\n    def __post_init__(self):\n        if self.price < 0:\n            raise ValueError(\"价格不能为负\")\n        if self.stock < 0:\n            raise ___\n        if not self.name.strip():\n            raise ___\n\ndef validate(data):\n    try:\n        p = Product(**data)\n        return {\"valid\": True, \"product\": f\"{p.name}(¥{p.price})\"}\n    except (TypeError, ValueError) as e:\n        return {\"valid\": ___, \"error\": str(e)}\n\ndef batch_validate(items):\n    results = {\"valid\": 0, \"invalid\": 0}\n    for item in items:\n        r = validate(item)\n        if r[\"valid\"]:\n            results[\"valid\"] += 1\n        else:\n            results[___] += 1\n    return results\n\nr1 = validate({\"name\": \"iPhone\", \"price\": 5999, \"stock\": 10})\nr2 = validate({\"name\": \"\", \"price\": 100})\nr3 = validate({\"name\": \"Bug\", \"price\": -1})\nbatch = batch_validate([\n    {\"name\": \"A\", \"price\": 10},\n    {\"name\": \"\", \"price\": 5},\n    {\"name\": \"C\", \"price\": -1},\n    {\"name\": \"D\", \"price\": 20, \"stock\": 5},\n])\n\nprint(f\"r1_valid: {r1['valid']}\")\nprint(f\"r2_valid: {r2['valid']}\")\nprint(f\"r3_error: {'负' in r3['error']}\")\nprint(f\"batch_valid: {batch['valid']}\")\nprint(f\"batch_invalid: {batch['invalid']}\")`,
      objectives: [
        { id: 'obj1', text: '合法验证通过' },
        { id: 'obj2', text: '空名称失败' },
        { id: 'obj3', text: '负价格错误' },
        { id: 'obj4', text: '批量通过2' },
        { id: 'obj5', text: '批量失败2' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'r1_valid: True', displayValue: '验证 ✓', speechText: '验证通过!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'r2_valid: False', displayValue: '空名 ✓', speechText: '边界!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'r3_error: True', displayValue: '负价 ✓', speechText: '错误信息!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'batch_valid: 2', displayValue: '批量通过 ✓', speechText: '批量验证!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'batch_invalid: 2', displayValue: '批量失败 ✓', speechText: '验证大师!' },
      ]},
      hints: ['💡 raise ValueError("消息")', '💡 验证失败返回False', '💡 用"invalid"作key'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'skeleton', totalObjectives: 5 },
    },
  },

  '3-3': {
    normal: {
      initialCode: `# ⚔️ 任务：数据库 CRUD 挑战\n\nclass SimpleDB:\n    def __init__(self):\n        self.data = {}\n        self._id = 0\n    def insert(self, record):\n        self._id += 1\n        self.data[self._id] = {**record, \"id\": self._id}\n        return self._id\n    def get(self, id):\n        return self.data.___(id)\n    def query(self, **filters):\n        results = []\n        for rec in self.data.values():\n            if all(rec.get(k) == v for k, v in filters.___):\n                results.append(rec)\n        return results\n    def update(self, id, updates):\n        if id in self.data:\n            self.data[id].___(updates)\n            return True\n        return False\n    def delete(self, id):\n        if id in self.data:\n            ___ self.data[id]\n            return True\n        return False\n    def count(self):\n        return ___(self.data)\n\ndb = SimpleDB()\nid1 = db.insert({\"name\": \"Alice\", \"role\": \"admin\", \"score\": 95})\nid2 = db.insert({\"name\": \"Bob\", \"role\": \"user\", \"score\": 80})\nid3 = db.insert({\"name\": \"Charlie\", \"role\": \"user\", \"score\": 90})\n\nadmins = db.query(role=\"admin\")\nhigh = [r for r in db.query(role=\"user\") if r[\"score\"] >= 85]\ndb.update(id2, {\"score\": 88})\ndb.delete(id3)\n\nprint(f\"total: {db.count()}\")\nprint(f\"admins: {len(admins)}\")\nprint(f\"high_scorers: {len(high)}\")\nprint(f\"bob_score: {db.get(id2)['score']}\")\nprint(f\"charlie: {db.get(id3)}\")`,
      objectives: [
        { id: 'obj1', text: '删后剩2条' },
        { id: 'obj2', text: '1个admin' },
        { id: 'obj3', text: '高分筛选' },
        { id: 'obj4', text: 'Bob更新88' },
        { id: 'obj5', text: 'Charlie删除' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'total: 2', displayValue: '计数 ✓', speechText: 'CRUD!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'admins: 1', displayValue: '查询 ✓', speechText: '过滤!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'high_scorers: 1', displayValue: '筛选 ✓', speechText: '聚合!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'bob_score: 88', displayValue: '更新 ✓', speechText: '更新!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'charlie: None', displayValue: '删除 ✓', speechText: 'CRUD大师!' },
      ]},
      hints: ['💡 dict.get(key)找不到返回None', '💡 filters.items()取键值对', '💡 del删除字典元素'],
      rewards: { xp: 110 },
      scene: { theme: 'cave', monster: 'golem', totalObjectives: 5 },
    },
  },

  '3-4': {
    normal: {
      initialCode: `# ⚔️ 任务：中间件管道挑战\n\nclass Pipeline:\n    def __init__(self):\n        self.middlewares = []\n    def use(self, middleware):\n        self.middlewares.___(middleware)\n    def execute(self, request):\n        for mw in self.middlewares:\n            result = ___(request)\n            if \"error\" in result:\n                return result\n            request.update(result)\n        return request\n\ndef cors_mw(req):\n    return {\"cors\": True}\n\ndef auth_mw(req):\n    if not req.get(\"token\"):\n        return {\"error\": \"401 Unauthorized\"}\n    return {\"user\": \"authenticated\"}\n\ndef log_mw(req):\n    return {\"logged\": True, \"method\": req.___(\"method\", \"GET\")}\n\napp = Pipeline()\napp.use(cors_mw)\napp.use(auth_mw)\napp.use(log_mw)\n\nr1 = app.execute({\"path\": \"/api\", \"token\": \"abc123\", \"method\": \"POST\"})\nr2 = app.execute({\"path\": \"/api\"})\n\nprint(f\"auth: {r1.get('user')}\")\nprint(f\"cors: {r1.get('cors')}\")\nprint(f\"logged: {r1.get('logged')}\")\nprint(f\"method: {r1.get('method')}\")\nprint(f\"blocked: {'error' in r2}\")`,
      objectives: [
        { id: 'obj1', text: '认证通过' },
        { id: 'obj2', text: 'CORS正确' },
        { id: 'obj3', text: '日志记录' },
        { id: 'obj4', text: 'POST方法' },
        { id: 'obj5', text: '无token拦截' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'auth: authenticated', displayValue: '认证 ✓', speechText: '中间件!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'cors: True', displayValue: 'CORS ✓', speechText: '跨域!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'logged: True', displayValue: '日志 ✓', speechText: '管道!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'method: POST', displayValue: 'POST ✓', speechText: '请求!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'blocked: True', displayValue: '拦截 ✓', speechText: '中间件大师!' },
      ]},
      hints: ['💡 append添加元素', '💡 mw(request)调用中间件', '💡 dict.get(key,default)带默认值'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'wizard', totalObjectives: 5 },
    },
  },

  '3-5': {
    normal: {
      initialCode: `# ⚔️ 任务：分页排序挑战\n\ndata = [\n    {\"name\": \"Alice\", \"score\": 85},\n    {\"name\": \"Bob\", \"score\": 92},\n    {\"name\": \"Charlie\", \"score\": 78},\n    {\"name\": \"Diana\", \"score\": 95},\n    {\"name\": \"Eve\", \"score\": 88},\n    {\"name\": \"Frank\", \"score\": 70},\n    {\"name\": \"Grace\", \"score\": 91},\n    {\"name\": \"Hank\", \"score\": 83},\n]\n\ndef paginate(items, page=1, per_page=3):\n    start = (page - 1) * ___\n    end = start + per_page\n    total_pages = -(-len(items) // per_page)\n    return {\"items\": items[start:end], \"total\": len(items), \"pages\": total_pages}\n\ndef sort_by(items, field, reverse=False):\n    return sorted(items, key=lambda x: x[___], reverse=reverse)\n\ndef filter_by(items, field, min_val):\n    return [i for i in items if i[field] ___ min_val]\n\nsorted_data = sort_by(data, \"score\", reverse=True)\npage1 = paginate(sorted_data, page=1, per_page=3)\npage3 = paginate(sorted_data, page=3, per_page=3)\nhigh = filter_by(data, \"score\", 85)\n\nprint(f\"top1: {page1['items'][0]['name']}\")\nprint(f\"pages: {page1['pages']}\")\nprint(f\"p3_count: {len(page3['items'])}\")\nprint(f\"high_count: {len(high)}\")\nprint(f\"total: {page1['total']}\")`,
      objectives: [
        { id: 'obj1', text: 'Diana排第一' },
        { id: 'obj2', text: '3页' },
        { id: 'obj3', text: '第三页2条' },
        { id: 'obj4', text: '85+分5人' },
        { id: 'obj5', text: '总8条' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'top1: Diana', displayValue: '排序 ✓', speechText: '排序!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'pages: 3', displayValue: '分页 ✓', speechText: '分页!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'p3_count: 2', displayValue: '尾页 ✓', speechText: '边界!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'high_count: 5', displayValue: '过滤 ✓', speechText: '过滤!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'total: 8', displayValue: '总数 ✓', speechText: '分页大师!' },
      ]},
      hints: ['💡 start用per_page计算', '💡 lambda中用field变量', '💡 >=运算符过滤'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'skeleton', totalObjectives: 5 },
    },
  },

  '3-6': {
    normal: {
      initialCode: `# ⚔️ 任务：认证系统挑战\nimport hashlib\n\nclass AuthSystem:\n    def __init__(self, secret=\"my_secret\"):\n        self.secret = secret\n        self.users = {}\n    def register(self, username, password):\n        if username in self.users:\n            return {\"ok\": False, \"error\": \"用户已存在\"}\n        self.users[username] = hashlib.sha256(password.___()).hexdigest()\n        return {\"ok\": True}\n    def login(self, username, password):\n        pwd_hash = hashlib.sha256(password.encode()).hexdigest()\n        if self.users.get(username) != ___:\n            return {\"ok\": False}\n        sig = hashlib.md5(f\"{username}{self.secret}\".encode()).hexdigest()[:8]\n        return {\"ok\": True, \"token\": f\"{username}.{sig}\"}\n    def verify(self, token):\n        parts = token.split(\".\")\n        if len(parts) != 2: return None\n        username, sig = parts\n        expected = hashlib.md5(f\"{username}{self.secret}\".encode()).hexdigest()[:8]\n        if sig != ___: return None\n        return username\n    def protected(self, token):\n        user = self.verify(token)\n        if not user: return {\"error\": \"401\"}\n        return {\"user\": user}\n\nauth = AuthSystem()\nprint(f\"reg: {auth.register('alice', 'pass123')['ok']}\")\nprint(f\"dup: {auth.register('alice', 'xxx')['ok']}\")\nlogin_r = auth.login(\"alice\", \"pass123\")\nprint(f\"login: {login_r['ok']}\")\nbad = auth.login(\"alice\", \"wrong\")\nprint(f\"bad: {bad['ok']}\")\nresult = auth.protected(login_r[\"token\"])\nprint(f\"protected: {result.get('user', 'fail')}\")\nprint(f\"reject: {'error' in auth.protected('fake.token')}\")`,
      objectives: [
        { id: 'obj1', text: '注册成功' },
        { id: 'obj2', text: '重复注册失败' },
        { id: 'obj3', text: '登录成功' },
        { id: 'obj4', text: '错误密码' },
        { id: 'obj5', text: 'Token验证' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'reg: True', displayValue: '注册 ✓', speechText: '注册!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'dup: False', displayValue: '防重复 ✓', speechText: '去重!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'login: True', displayValue: '登录 ✓', speechText: '认证!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'bad: False', displayValue: '错密码 ✓', speechText: '密码!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'protected: alice', displayValue: '授权 ✓', speechText: '认证大师!' },
        { type: 'output_contains', objectiveId: 'obj6', expected: 'reject: True', displayValue: '拒绝 ✓', speechText: 'JWT!' },
      ]},
      hints: ['💡 encode()转字节', '💡 比对pwd_hash', '💡 比对expected签名'],
      rewards: { xp: 80 },
      scene: { theme: 'castle', monster: 'guard', totalObjectives: 6 },
    },
  },

  // ============================================================
  // Batch 2: AI 核心 + Boss
  // ============================================================

  '4-1': {
    normal: {
      initialCode: `# ⚔️ 任务：ORM 映射挑战\nfrom dataclasses import dataclass, asdict\n\n@dataclass\nclass Todo:\n    id: int\n    title: str\n    done: bool = ___\n    priority: int = 0\n    def to_dict(self):\n        return ___(self)\n\nclass TodoRepo:\n    def __init__(self):\n        self.store = {}\n        self._id = 0\n    def create(self, title, priority=0):\n        self._id += 1\n        todo = Todo(id=self._id, title=title, priority=priority)\n        self.store[self._id] = todo\n        return todo.to_dict()\n    def complete(self, id):\n        if id not in self.store: return None\n        self.store[id].done = ___\n        return self.store[id].to_dict()\n    def list_by_priority(self):\n        return sorted([t.to_dict() for t in self.store.values()], key=lambda x: -x[\"priority\"])\n    def summary(self):\n        all_t = list(self.store.values())\n        done = sum(1 for t in all_t if t.done)\n        return {\"total\": len(all_t), \"done\": done, \"pending\": len(all_t) - done}\n\nrepo = TodoRepo()\nrepo.create(\"学Python\", priority=3)\nrepo.create(\"学FastAPI\", priority=2)\nrepo.create(\"学AI\", priority=5)\nrepo.complete(1)\ntop = repo.list_by_priority()\ns = repo.summary()\n\nprint(f\"created: {s['total']}\")\nprint(f\"done: {s['done']}\")\nprint(f\"top_priority: {top[0]['title']}\")\nprint(f\"t1_done: {repo.store[1].done}\")\nprint(f\"pending: {s['pending']}\")`,
      objectives: [
        { id: 'obj1', text: '创建3个Todo' },
        { id: 'obj2', text: '完成1个' },
        { id: 'obj3', text: '优先级排序' },
        { id: 'obj4', text: '摘要统计' },
        { id: 'obj5', text: '剩余2待办' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'created: 3', displayValue: '创建 ✓', speechText: 'ORM!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'done: 1', displayValue: '完成 ✓', speechText: '状态!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'top_priority: 学AI', displayValue: '排序 ✓', speechText: '排序!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 't1_done: True', displayValue: '状态 ✓', speechText: '映射!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'pending: 2', displayValue: '待办 ✓', speechText: 'ORM大师!' },
      ]},
      hints: ['💡 done默认False', '💡 asdict(self)转字典', '💡 complete设done=True'],
      rewards: { xp: 100 },
      scene: { theme: 'cave', monster: 'skeleton', totalObjectives: 5 },
    },
  },

  '4-2': {
    normal: {
      initialCode: `# ⚔️ 任务：关联查询挑战\n\nusers = [\n    {\"id\": 1, \"name\": \"Alice\", \"dept\": \"工程\"},\n    {\"id\": 2, \"name\": \"Bob\", \"dept\": \"产品\"},\n    {\"id\": 3, \"name\": \"Charlie\", \"dept\": \"工程\"},\n]\norders = [\n    {\"id\": 1, \"user_id\": 1, \"amount\": 100},\n    {\"id\": 2, \"user_id\": 1, \"amount\": 200},\n    {\"id\": 3, \"user_id\": 2, \"amount\": 150},\n]\n\ndef get_by_dept(users, dept):\n    return [u for u in users if u[___] == dept]\n\ndef join_data(users, orders):\n    result = []\n    for u in users:\n        user_orders = [o for o in orders if o[\"user_id\"] == u[___]]\n        result.append({\"name\": u[\"name\"], \"order_count\": len(user_orders), \"total\": sum(o[\"amount\"] for o in user_orders)})\n    return result\n\nengineers = get_by_dept(users, \"工程\")\njoined = join_data(users, orders)\nalice = [j for j in joined if j[\"name\"] == \"Alice\"][0]\n\nprint(f\"eng_count: {len(engineers)}\")\nprint(f\"alice_orders: {alice['order_count']}\")\nprint(f\"alice_total: {alice['total']}\")\nprint(f\"joined_len: {len(joined)}\")\nprint(f\"charlie_total: {[j for j in joined if j['name']=='Charlie'][0]['total']}\")`,
      objectives: [
        { id: 'obj1', text: '工程部2人' },
        { id: 'obj2', text: 'Alice有2单' },
        { id: 'obj3', text: 'Alice总额300' },
        { id: 'obj4', text: '3人关联' },
        { id: 'obj5', text: 'Charlie总额0' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'eng_count: 2', displayValue: '工程部 ✓', speechText: '过滤!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'alice_orders: 2', displayValue: '订单 ✓', speechText: '关联!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'alice_total: 300', displayValue: '总额 ✓', speechText: '聚合!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'joined_len: 3', displayValue: '关联 ✓', speechText: 'Join!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'charlie_total: 0', displayValue: '空值 ✓', speechText: '查询大师!' },
      ]},
      hints: ['💡 用"dept"作key过滤', '💡 用"id"匹配user_id', '💡 没有订单total为0'],
      rewards: { xp: 100 },
      scene: { theme: 'maze', monster: 'golem', totalObjectives: 5 },
    },
  },

  'boss-2': {
    normal: {
      initialCode: `# ⚔️ BOSS：短链服务实战\nimport hashlib\n\nclass URLShortener:\n    def __init__(self):\n        self.url_map = {}\n        self.clicks = {}\n    def shorten(self, url):\n        if not url.startswith(\"http\"):\n            return {\"error\": \"Invalid URL\"}\n        code = hashlib.md5(url.___()).hexdigest()[:6]\n        self.url_map[code] = url\n        self.clicks[code] = 0\n        return {\"code\": code, \"short\": f\"s/{code}\"}\n    def resolve(self, code):\n        url = self.url_map.___(code)\n        if url:\n            self.clicks[code] = self.clicks.___(code, 0) + 1\n        return url\n    def stats(self):\n        return {\"total\": len(self.url_map), \"clicks\": sum(self.clicks.values())}\n\napp = URLShortener()\nr1 = app.shorten(\"https://example.com\")\nr2 = app.shorten(\"not-a-url\")\nurl = app.resolve(r1[\"code\"])\napp.resolve(r1[\"code\"])\nst = app.stats()\n\nprint(f\"code_len: {len(r1['code'])}\")\nprint(f\"error: {'error' in r2}\")\nprint(f\"resolved: {url == 'https://example.com'}\")\nprint(f\"clicks: {app.clicks[r1['code']]}\")\nprint(f\"total: {st['total']}\")`,
      objectives: [
        { id: 'obj1', text: '短码6位' },
        { id: 'obj2', text: '无效URL报错' },
        { id: 'obj3', text: '还原URL' },
        { id: 'obj4', text: '点击计数' },
        { id: 'obj5', text: '统计正确' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'code_len: 6', displayValue: '短码 ✓', speechText: '短链!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'error: True', displayValue: '拦截 ✓', speechText: '校验!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'resolved: True', displayValue: '还原 ✓', speechText: '还原!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'clicks: 2', displayValue: '点击 ✓', speechText: '统计!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'total: 1', displayValue: '总数 ✓', speechText: '🏆 BOSS击败!' },
      ]},
      hints: ['💡 encode()转字节给md5', '💡 dict.get(key)找不到返回None', '💡 get(key,0)+1累加'],
      rewards: { xp: 200 },
      scene: { theme: 'temple', monster: 'dragon', totalObjectives: 5 },
    },
  },

  '5-3': {
    normal: {
      initialCode: `# ⚔️ 任务：流式输出挑战\n\ndef stream_text(text, chunk_size=10):\n    for i in range(0, ___(text), chunk_size):\n        chunk = text[i:i+chunk_size]\n        ___ chunk\n\ndef collect_stream(stream):\n    collected = []\n    for chunk in stream:\n        collected.___(chunk)\n    return \"\".join(collected)\n\ndef count_chunks(text, chunk_size=10):\n    return -(-len(text) // chunk_size)\n\ntext = \"Hello World, this is a streaming test for AI applications!\"\nchunks = list(stream_text(text, 15))\nfull = collect_stream(stream_text(text, 15))\n\nprint(f\"chunk_count: {len(chunks)}\")\nprint(f\"first: {chunks[0]}\")\nprint(f\"restored: {full == text}\")\nprint(f\"calc_chunks: {count_chunks(text, 15)}\")\nprint(f\"full_len: {len(full)}\")`,
      objectives: [
        { id: 'obj1', text: '分块数量' },
        { id: 'obj2', text: '首个分块' },
        { id: 'obj3', text: '还原完整' },
        { id: 'obj4', text: '计算分块' },
        { id: 'obj5', text: '长度一致' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'first: Hello World, th', displayValue: '首块 ✓', speechText: '流式!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'restored: True', displayValue: '还原 ✓', speechText: '完整!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'full_len: 57', displayValue: '长度 ✓', speechText: 'Streaming大师!' },
      ]},
      hints: ['💡 len(text)获取长度', '💡 yield产出值', '💡 append添加元素'],
      rewards: { xp: 100 },
      scene: { theme: 'cave', monster: 'wizard', totalObjectives: 3 },
    },
  },

  '5-4': {
    normal: {
      initialCode: `# ⚔️ 任务：结构化输出挑战\n\ndef validate_schema(data, schema):\n    errors = []\n    for field in schema.get(___, []):\n        if field not in ___:\n            errors.append(f\"缺少: {field}\")\n    for field, ftype in schema.get(\"types\", {}).items():\n        if field in data and not isinstance(data[field], ftype):\n            errors.append(f\"类型错误: {field}\")\n    return {\"valid\": len(errors) == 0, \"errors\": errors}\n\nschema = {\n    \"required\": [\"name\", \"age\", \"email\"],\n    \"types\": {\"name\": str, \"age\": int, \"email\": str}\n}\n\nr1 = validate_schema({\"name\": \"Alice\", \"age\": 25, \"email\": \"a@b.c\"}, schema)\nr2 = validate_schema({\"name\": \"Bob\"}, schema)\nr3 = validate_schema({\"name\": \"Charlie\", \"age\": \"25\", \"email\": \"c@d\"}, schema)\n\nprint(f\"r1_valid: {r1['valid']}\")\nprint(f\"r2_errors: {len(r2['errors'])}\")\nprint(f\"r3_valid: {r3['valid']}\")\nprint(f\"r3_type_err: {'类型错误' in str(r3['errors'])}\")\nprint(f\"r1_errors: {len(r1['errors'])}\")`,
      objectives: [
        { id: 'obj1', text: '完整数据通过' },
        { id: 'obj2', text: '缺2字段' },
        { id: 'obj3', text: '类型错误' },
        { id: 'obj4', text: '类型错误信息' },
        { id: 'obj5', text: '无错误' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'r1_valid: True', displayValue: '验证 ✓', speechText: 'Schema!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'r2_errors: 2', displayValue: '缺字段 ✓', speechText: '必填!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'r3_valid: False', displayValue: '类型 ✓', speechText: '类型!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'r3_type_err: True', displayValue: '错误 ✓', speechText: '校验!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'r1_errors: 0', displayValue: '完美 ✓', speechText: '结构化大师!' },
      ]},
      hints: ['💡 "required"是必填字段key', '💡 data是待验证字典', '💡 isinstance检查类型'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 5 },
    },
  },

  '6-2': {
    normal: {
      initialCode: `# ⚔️ 任务：向量数据库挑战\nimport math\n\nclass VectorDB:\n    def __init__(self):\n        self.vectors = {}\n        self._id = 0\n    def add(self, text, vector):\n        self._id += 1\n        self.vectors[self._id] = {\"text\": text, \"vector\": vector}\n        return self._id\n    def add_batch(self, items):\n        ids = []\n        for text, vec in items:\n            ids.___(self.add(text, vec))\n        return ids\n    def _cosine(self, a, b):\n        dot = ___(x*y for x,y in zip(a,b))\n        ma = math.sqrt(sum(x**2 for x in a))\n        mb = math.sqrt(sum(x**2 for x in b))\n        return dot/(ma*mb) if ma and mb else 0\n    def search(self, query, top_k=2):\n        scored = []\n        for id, v in self.vectors.items():\n            score = round(self._cosine(query, v[\"vector\"]), 4)\n            scored.___(( score, id, v[\"text\"]))\n        scored.sort(reverse=True)\n        return scored[:top_k]\n    def count(self):\n        return ___(self.vectors)\n\ndb = VectorDB()\ndb.add(\"Python编程\", [1,0,0])\ndb.add_batch([(\"AI学习\",[0,1,0]),(\"Web开发\",[0,0,1]),(\"PythonAI\",[0.7,0.7,0])])\nresults = db.search([0.8,0.6,0], top_k=2)\n\nprint(f\"count: {db.count()}\")\nprint(f\"results: {len(results)}\")\nprint(f\"top: {results[0][2]}\")\nprint(f\"score: {results[0][0] > 0.5}\")\nprint(f\"del_miss: {99 not in db.vectors}\")`,
      objectives: [
        { id: 'obj1', text: '存储4条' },
        { id: 'obj2', text: '搜索2条' },
        { id: 'obj3', text: '最匹配PythonAI' },
        { id: 'obj4', text: '分数>0.5' },
        { id: 'obj5', text: '99不存在' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'count: 4', displayValue: '存储 ✓', speechText: '入库!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'results: 2', displayValue: '搜索 ✓', speechText: 'TopK!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'top: PythonAI', displayValue: '匹配 ✓', speechText: '搜索!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'score: True', displayValue: '分数 ✓', speechText: '向量!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'del_miss: True', displayValue: '边界 ✓', speechText: '向量大师!' },
      ]},
      hints: ['💡 append添加到列表', '💡 sum求和', '💡 len获取长度'],
      rewards: { xp: 120 },
      scene: { theme: 'cave', monster: 'golem', totalObjectives: 5 },
    },
  },

  'boss-3': {
    normal: {
      initialCode: `# ⚔️ BOSS：RAG Pipeline\nimport math\n\ndef chunk_text(text, size=50):\n    return [text[i:i+___] for i in range(0, len(text), size)]\n\ndef simple_embed(text):\n    words = set(text.lower().split())\n    vocab = [\"python\",\"ai\",\"学习\",\"编程\",\"数据\",\"模型\",\"训练\",\"代码\"]\n    return [1 if w in words else 0 for w in vocab]\n\ndef cosine(a, b):\n    dot = sum(x*y for x,y in zip(a,b))\n    ma = math.sqrt(sum(x**2 for x in a))\n    mb = math.sqrt(sum(x**2 for x in b))\n    return round(dot/(ma*mb), 4) if ma and mb else 0\n\ndef search(query, db, top_k=2):\n    qv = simple_embed(query)\n    scored = [{\"text\": d[\"text\"], \"score\": cosine(qv, d[\"vec\"])} for d in db]\n    return sorted(scored, key=lambda x: -x[\"score\"])[:___]\n\ntext = \"Python是AI编程的基础。学习Python可以进行数据分析和模型训练。代码质量很重要。\"\nchunks = chunk_text(text, 20)\ndb = [{\"text\": c, \"vec\": simple_embed(c)} for c in chunks]\nresults = search(\"Python编程\", db, top_k=2)\n\nprint(f\"chunks: {len(chunks)}\")\nprint(f\"results: {len(results)}\")\nprint(f\"top_score: {results[0]['score'] > 0}\")\nprint(f\"has_python: {'Python' in results[0]['text']}\")\nprint(f\"db_size: {len(db)}\")`,
      objectives: [
        { id: 'obj1', text: '分块正确' },
        { id: 'obj2', text: '搜索2条' },
        { id: 'obj3', text: '分数>0' },
        { id: 'obj4', text: '含Python' },
        { id: 'obj5', text: 'DB大小' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'results: 2', displayValue: '搜索 ✓', speechText: 'RAG!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'top_score: True', displayValue: '分数 ✓', speechText: '相似度!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'has_python: True', displayValue: '匹配 ✓', speechText: '检索!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'db_size: ', displayValue: 'DB ✓', speechText: '🏆 BOSS击败!' },
      ]},
      hints: ['💡 size是分块大小', '💡 top_k限制返回数量', '💡 余弦相似度衡量相关性'],
      rewards: { xp: 200 },
      scene: { theme: 'temple', monster: 'dragon', totalObjectives: 4 },
    },
  },

  // ============================================================
  // Batch 3: 对话系统 + 应用
  // ============================================================

  '7-1': {
    normal: {
      initialCode: `# ⚔️ 任务：聊天记忆挑战\n\nclass ChatMemory:\n    def __init__(self, max_turns=10):\n        self.messages = []\n        self.max = max_turns\n    def add(self, role, content):\n        self.messages.___(({\"role\": role, \"content\": content}))\n    def get_recent(self, n=5):\n        return self.messages[-___:]\n    def count(self):\n        return len(self.messages)\n    def clear(self):\n        self.messages = []\n\nmem = ChatMemory(max_turns=10)\nmem.add(\"user\", \"你好\")\nmem.add(\"assistant\", \"你好！有什么可以帮助你的？\")\nmem.add(\"user\", \"介绍一下Python\")\nmem.add(\"assistant\", \"Python是一门编程语言\")\nrecent = mem.get_recent(2)\n\nprint(f\"total: {mem.count()}\")\nprint(f\"recent: {len(recent)}\")\nprint(f\"last_role: {recent[-1]['role']}\")\nprint(f\"first_msg: {mem.messages[0]['content']}\")\nmem.clear()\nprint(f\"after_clear: {mem.count()}\")`,
      objectives: [
        { id: 'obj1', text: '4条消息' },
        { id: 'obj2', text: '最近2条' },
        { id: 'obj3', text: '最后assistant' },
        { id: 'obj4', text: '首条你好' },
        { id: 'obj5', text: '清空0' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'total: 4', displayValue: '总数 ✓', speechText: '记忆!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'recent: 2', displayValue: '最近 ✓', speechText: '窗口!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'last_role: assistant', displayValue: '角色 ✓', speechText: '对话!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'first_msg: 你好', displayValue: '首条 ✓', speechText: '记忆!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'after_clear: 0', displayValue: '清空 ✓', speechText: '记忆大师!' },
      ]},
      hints: ['💡 append添加消息', '💡 切片[-n:]取最后n条', '💡 clear清空列表'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 5 },
    },
  },

  '7-2': {
    normal: {
      initialCode: `# ⚔️ 任务：对话格式化挑战\n\ndef format_chat(messages):\n    formatted = []\n    for msg in messages:\n        role = msg[\"role\"]\n        content = msg[\"content\"]\n        if role == \"user\":\n            formatted.___(f\"👤 {content}\")\n        elif role == \"assistant\":\n            formatted.___(f\"🤖 {content}\")\n        else:\n            formatted.___(f\"⚙️ {content}\")\n    return formatted\n\ndef token_count(text):\n    return ___(text.split())\n\ndef truncate(messages, max_tokens=20):\n    total = 0\n    result = []\n    for msg in reversed(messages):\n        t = token_count(msg[\"content\"])\n        if total + t > max_tokens: break\n        result.insert(0, msg)\n        total += t\n    return result\n\nmsgs = [\n    {\"role\": \"system\", \"content\": \"You are helpful\"},\n    {\"role\": \"user\", \"content\": \"Hello world\"},\n    {\"role\": \"assistant\", \"content\": \"Hi there\"},\n    {\"role\": \"user\", \"content\": \"Tell me about Python\"},\n]\nfmt = format_chat(msgs)\ntrunc = truncate(msgs, max_tokens=8)\n\nprint(f\"formatted: {len(fmt)}\")\nprint(f\"has_emoji: {'👤' in fmt[1]}\")\nprint(f\"system: {'⚙️' in fmt[0]}\")\nprint(f\"truncated: {len(trunc)}\")\nprint(f\"token_test: {token_count('hello world')}\")`,
      objectives: [
        { id: 'obj1', text: '格式化4条' },
        { id: 'obj2', text: '用户emoji' },
        { id: 'obj3', text: '系统emoji' },
        { id: 'obj4', text: '截断正确' },
        { id: 'obj5', text: 'token计数' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'formatted: 4', displayValue: '格式 ✓', speechText: '格式化!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'has_emoji: True', displayValue: 'emoji ✓', speechText: 'UI!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'system: True', displayValue: '系统 ✓', speechText: '角色!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'token_test: 2', displayValue: 'token ✓', speechText: '对话大师!' },
      ]},
      hints: ['💡 append添加格式化文本', '💡 len计算单词数', '💡 reversed反向遍历'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'wizard', totalObjectives: 5 },
    },
  },

  '7-3': {
    normal: {
      initialCode: `# ⚔️ 任务：多模型适配挑战\n\nclass ModelRouter:\n    def __init__(self):\n        self.adapters = {}\n    def register(self, name, adapter):\n        self.adapters[___] = adapter\n    def get_adapter(self, name):\n        return self.adapters.___(name)\n    def route(self, model, prompt):\n        adapter = self.get_adapter(model)\n        if not adapter:\n            return {\"error\": f\"{model} not found\"}\n        response = adapter(prompt)\n        return {\"model\": model, \"response\": response}\n\ndef gpt_adapter(prompt):\n    return f\"GPT: {prompt[:20]}\"\ndef claude_adapter(prompt):\n    return f\"Claude: {prompt[:20]}\"\n\nrouter = ModelRouter()\nrouter.register(\"gpt\", gpt_adapter)\nrouter.register(\"claude\", claude_adapter)\n\nr1 = router.route(\"gpt\", \"Hello World\")\nr2 = router.route(\"claude\", \"Test prompt\")\nr3 = router.route(\"unknown\", \"test\")\n\nprint(f\"gpt: {r1['response']}\")\nprint(f\"claude: {r2['response']}\")\nprint(f\"error: {'error' in r3}\")\nprint(f\"adapters: {len(router.adapters)}\")\nprint(f\"has_gpt: {'gpt' in router.adapters}\")`,
      objectives: [
        { id: 'obj1', text: 'GPT响应' },
        { id: 'obj2', text: 'Claude响应' },
        { id: 'obj3', text: '未知模型报错' },
        { id: 'obj4', text: '2个适配器' },
        { id: 'obj5', text: '含gpt' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'gpt: GPT: Hello World', displayValue: 'GPT ✓', speechText: 'GPT!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'claude: Claude: Test prompt', displayValue: 'Claude ✓', speechText: 'Claude!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'error: True', displayValue: '未知 ✓', speechText: '路由!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'adapters: 2', displayValue: '数量 ✓', speechText: '适配!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'has_gpt: True', displayValue: '注册 ✓', speechText: '适配大师!' },
      ]},
      hints: ['💡 name是注册的键名', '💡 get(name)找不到返回None', '💡 适配器是函数'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'skeleton', totalObjectives: 5 },
    },
  },

  '7-4': {
    normal: {
      initialCode: `# ⚔️ 任务：AI 防护盾挑战\n\ndef content_filter(text, blocklist):\n    text_lower = text.lower()\n    for word in blocklist:\n        if word in text_lower:\n            return {\"safe\": ___, \"reason\": f\"包含: {word}\"}\n    return {\"safe\": ___, \"reason\": \"\"}\n\ndef length_guard(text, max_len=100):\n    if len(text) > max_len:\n        return {\"safe\": False, \"reason\": f\"超长: {len(text)}/{max_len}\"}\n    return {\"safe\": True, \"reason\": \"\"}\n\ndef multi_guard(text, guards):\n    for guard in guards:\n        result = guard(text)\n        if not result[\"safe\"]:\n            return result\n    return {\"safe\": True, \"reason\": \"通过\"}\n\nblocklist = [\"hack\", \"inject\", \"drop table\"]\nguards = [\n    lambda t: content_filter(t, blocklist),\n    lambda t: length_guard(t, 50),\n]\n\nr1 = multi_guard(\"正常请求\", guards)\nr2 = multi_guard(\"try to hack the system\", guards)\nr3 = multi_guard(\"a\" * 60, guards)\n\nprint(f\"r1_safe: {r1['safe']}\")\nprint(f\"r2_safe: {r2['safe']}\")\nprint(f\"r2_reason: {'hack' in r2['reason']}\")\nprint(f\"r3_safe: {r3['safe']}\")\nprint(f\"r3_reason: {'超长' in r3['reason']}\")`,
      objectives: [
        { id: 'obj1', text: '正常通过' },
        { id: 'obj2', text: 'hack拦截' },
        { id: 'obj3', text: '原因含hack' },
        { id: 'obj4', text: '超长拦截' },
        { id: 'obj5', text: '原因含超长' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'r1_safe: True', displayValue: '通过 ✓', speechText: '安全!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'r2_safe: False', displayValue: '拦截 ✓', speechText: '过滤!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'r2_reason: True', displayValue: '原因 ✓', speechText: '防护!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'r3_safe: False', displayValue: '超长 ✓', speechText: '长度!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'r3_reason: True', displayValue: '超长 ✓', speechText: '防护大师!' },
      ]},
      hints: ['💡 匹配到返回False', '💡 未匹配返回True', '💡 guards按顺序检查'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'wizard', totalObjectives: 5 },
    },
  },

  '7-5': {
    normal: {
      initialCode: `# ⚔️ 任务：成本优化挑战\n\nclass CostOptimizer:\n    def __init__(self):\n        self.cache = {}\n        self.stats = {\"hits\": 0, \"misses\": 0}\n    def get_cached(self, key):\n        if key in self.___:\n            self.stats[\"hits\"] += 1\n            return self.cache[key]\n        self.stats[\"misses\"] += 1\n        return None\n    def set_cache(self, key, value):\n        self.cache[key] = value\n    def estimate_cost(self, tokens, rate=0.002):\n        return round(tokens * ___, 4)\n    def report(self):\n        total = self.stats[\"hits\"] + self.stats[\"misses\"]\n        hit_rate = self.stats[\"hits\"] / total if total > 0 else 0\n        return {\"total\": total, \"hit_rate\": round(hit_rate, 2), \"saved\": self.stats[\"hits\"]}\n\nopt = CostOptimizer()\nopt.set_cache(\"q1\", \"answer1\")\nr1 = opt.get_cached(\"q1\")\nr2 = opt.get_cached(\"q2\")\nr3 = opt.get_cached(\"q1\")\ncost = opt.estimate_cost(1000)\nrpt = opt.report()\n\nprint(f\"cached: {r1}\")\nprint(f\"miss: {r2}\")\nprint(f\"hits: {rpt['hit_rate']}\")\nprint(f\"cost: {cost}\")\nprint(f\"total: {rpt['total']}\")`,
      objectives: [
        { id: 'obj1', text: '缓存命中' },
        { id: 'obj2', text: '缓存未命中' },
        { id: 'obj3', text: '命中率' },
        { id: 'obj4', text: '成本计算' },
        { id: 'obj5', text: '总请求数' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'cached: answer1', displayValue: '命中 ✓', speechText: '缓存!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'miss: None', displayValue: '未中 ✓', speechText: '缓存!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'cost: 2.0', displayValue: '成本 ✓', speechText: '计算!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'total: 3', displayValue: '总数 ✓', speechText: '优化大师!' },
      ]},
      hints: ['💡 cache是缓存字典', '💡 rate是每token单价', '💡 命中率=hits/total'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'skeleton', totalObjectives: 4 },
    },
  },

  '8-1': {
    normal: {
      initialCode: `# ⚔️ 任务：Markdown 解析挑战\nimport re\n\ndef parse_line(line):\n    if line.startswith(\"### \"):\n        return f\"<h3>{line[4:]}</h3>\"\n    if line.startswith(\"## \"):\n        return f\"<h2>{line[3:]}</h2>\"\n    if line.startswith(\"# \"):\n        return f\"<h1>{line[___:]}</h1>\"\n    if line.startswith(\"- \"):\n        return f\"<li>{line[2:]}</li>\"\n    return f\"<p>{line}</p>\"\n\ndef md_to_html(text):\n    lines = text.split(\"\\n\")\n    parts = [parse_line(l) for l in lines if l.strip()]\n    return \"\\n\".___(parts)\n\ndef count_elements(html):\n    tags = [\"h1\",\"h2\",\"h3\",\"li\",\"p\"]\n    return {t: html.count(f\"<{t}>\") for t in tags}\n\nmd = \"\"\"# 标题一\n## 标题二\n### 标题三\n普通段落\n- 列表项1\n- 列表项2\"\"\"\nhtml = md_to_html(md)\ncounts = count_elements(html)\n\nprint(f\"h1: {counts['h1']}\")\nprint(f\"h2: {counts['h2']}\")\nprint(f\"li: {counts['li']}\")\nprint(f\"p: {counts['p']}\")\nprint(f\"has_h3: {counts['h3'] > 0}\")`,
      objectives: [
        { id: 'obj1', text: '1个h1' },
        { id: 'obj2', text: '1个h2' },
        { id: 'obj3', text: '2个li' },
        { id: 'obj4', text: '1个p' },
        { id: 'obj5', text: '有h3' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'h1: 1', displayValue: 'H1 ✓', speechText: '标题!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'h2: 1', displayValue: 'H2 ✓', speechText: '二级!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'li: 2', displayValue: '列表 ✓', speechText: '列表!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'p: 1', displayValue: '段落 ✓', speechText: '段落!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'has_h3: True', displayValue: 'H3 ✓', speechText: 'Markdown大师!' },
      ]},
      hints: ['💡 "# "占2个字符所以从2开始切', '💡 join连接列表', '💡 count统计元素数'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 5 },
    },
  },

  '8-2': {
    normal: {
      initialCode: `# ⚔️ 任务：对话持久化挑战\nimport json\n\nclass ChatStore:\n    def __init__(self):\n        self.conversations = {}\n    def create(self, name):\n        self.conversations[___] = []\n        return name\n    def add_message(self, name, role, content):\n        if name not in self.conversations:\n            return False\n        self.conversations[name].___(({\"role\": role, \"content\": content}))\n        return True\n    def get_history(self, name):\n        return self.conversations.get(name, [])\n    def export(self):\n        return json.___(self.conversations)\n    def list_conversations(self):\n        return list(self.conversations.___())\n\nstore = ChatStore()\nstore.create(\"chat1\")\nstore.create(\"chat2\")\nstore.add_message(\"chat1\", \"user\", \"你好\")\nstore.add_message(\"chat1\", \"assistant\", \"你好！\")\nstore.add_message(\"chat2\", \"user\", \"测试\")\n\nhistory = store.get_history(\"chat1\")\nexported = store.export()\nconvs = store.list_conversations()\n\nprint(f\"convs: {len(convs)}\")\nprint(f\"chat1_msgs: {len(history)}\")\nprint(f\"exported: {len(exported) > 0}\")\nprint(f\"has_chat2: {'chat2' in convs}\")\nprint(f\"empty: {len(store.get_history('none'))}\")`,
      objectives: [
        { id: 'obj1', text: '2个对话' },
        { id: 'obj2', text: 'chat1有2条' },
        { id: 'obj3', text: '导出非空' },
        { id: 'obj4', text: '含chat2' },
        { id: 'obj5', text: '空历史' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'convs: 2', displayValue: '对话 ✓', speechText: '持久化!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'chat1_msgs: 2', displayValue: '消息 ✓', speechText: '记录!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'exported: True', displayValue: '导出 ✓', speechText: 'JSON!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'has_chat2: True', displayValue: '列表 ✓', speechText: '管理!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'empty: 0', displayValue: '空值 ✓', speechText: '持久化大师!' },
      ]},
      hints: ['💡 name作为字典key', '💡 append添加消息', '💡 dumps序列化,keys()取键'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'wizard', totalObjectives: 5 },
    },
  },

  'boss-5': {
    normal: {
      initialCode: `# ⚔️ BOSS：MiniChat 综合实战\n\nclass MiniChat:\n    def __init__(self):\n        self.tools = {}\n        self.context = []\n    def register_tool(self, name, func):\n        self.___[name] = func\n    def add_context(self, msg):\n        self.context.___(msg)\n    def call_tool(self, name, **args):\n        if name not in self.tools:\n            return {\"error\": f\"工具{name}不存在\"}\n        result = self.tools[name](**___)\n        return {\"tool\": name, \"result\": result}\n    def chat(self, user_msg):\n        self.add_context({\"role\": \"user\", \"content\": user_msg})\n        reply = f\"收到: {user_msg[:20]}\"\n        self.add_context({\"role\": \"assistant\", \"content\": reply})\n        return reply\n\nbot = MiniChat()\nbot.register_tool(\"calc\", lambda expr: eval(expr))\nbot.register_tool(\"upper\", lambda text: text.upper())\n\nr1 = bot.chat(\"你好世界\")\nr2 = bot.call_tool(\"calc\", expr=\"2**10\")\nr3 = bot.call_tool(\"upper\", text=\"hello\")\nr4 = bot.call_tool(\"unknown\")\n\nprint(f\"reply: {r1}\")\nprint(f\"calc: {r2['result']}\")\nprint(f\"upper: {r3['result']}\")\nprint(f\"error: {'error' in r4}\")\nprint(f\"context: {len(bot.context)}\")`,
      objectives: [
        { id: 'obj1', text: '聊天回复' },
        { id: 'obj2', text: '计算1024' },
        { id: 'obj3', text: '大写HELLO' },
        { id: 'obj4', text: '未知工具' },
        { id: 'obj5', text: '上下文2条' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'calc: 1024', displayValue: '计算 ✓', speechText: '工具!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'upper: HELLO', displayValue: '大写 ✓', speechText: '转换!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'error: True', displayValue: '错误 ✓', speechText: '防御!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'context: 2', displayValue: '上下文 ✓', speechText: '🏆 BOSS击败!' },
      ]},
      hints: ['💡 tools字典存储工具函数', '💡 append添加上下文', '💡 **args解包关键字参数'],
      rewards: { xp: 250 },
      scene: { theme: 'fortress', monster: 'dragon', totalObjectives: 4 },
    },
  },

  // ============================================================
  // Batch 4: 高级应用 + 终极Boss
  // ============================================================

  '9-2': {
    normal: {
      initialCode: `# ⚔️ 任务：文档解析挑战\n\ndef parse_doc(text):\n    sections = []\n    current = {\"title\": \"\", \"content\": []}\n    for line in text.___(\"\\n\"):\n        if line.startswith(\"# \"):\n            if current[\"title\"]:\n                sections.___(current)\n            current = {\"title\": line[2:], \"content\": []}\n        elif line.strip():\n            current[\"content\"].append(line)\n    if current[\"title\"]:\n        sections.append(current)\n    return sections\n\ndoc = \"\"\"# Python基础\n变量和数据类型\n控制流语句\n# AI入门\n机器学习概念\n神经网络基础\n# 实战项目\n构建聊天机器人\"\"\"\n\nsections = parse_doc(doc)\n\nprint(f\"sections: {len(sections)}\")\nprint(f\"first: {sections[0]['title']}\")\nprint(f\"content: {len(sections[0]['content'])}\")\nprint(f\"last: {sections[-1]['title']}\")\nprint(f\"total_lines: {sum(len(s['content']) for s in sections)}\")`,
      objectives: [
        { id: 'obj1', text: '3个章节' },
        { id: 'obj2', text: '第一章Python' },
        { id: 'obj3', text: '首章2行' },
        { id: 'obj4', text: '最后实战' },
        { id: 'obj5', text: '总5行' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'sections: 3', displayValue: '章节 ✓', speechText: '解析!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'first: Python基础', displayValue: '首章 ✓', speechText: '标题!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'content: 2', displayValue: '内容 ✓', speechText: '段落!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'last: 实战项目', displayValue: '末章 ✓', speechText: '结构!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'total_lines: 5', displayValue: '总行 ✓', speechText: '解析大师!' },
      ]},
      hints: ['💡 split("\n")按行分割', '💡 append添加章节', '💡 startswith检查标题'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'skeleton', totalObjectives: 5 },
    },
  },

  '9-3': {
    normal: {
      initialCode: `# ⚔️ 任务：重排序挑战\nimport math\n\ndef bm25_score(query, doc, k1=1.5, b=0.75, avg_dl=20):\n    words = query.lower().___()\n    doc_lower = doc.lower()\n    dl = len(doc_lower.split())\n    score = 0\n    for w in words:\n        tf = doc_lower.split().count(w)\n        idf = 1.0\n        score += idf * (tf * (k1+1)) / (tf + k1*(1-b+b*dl/avg_dl))\n    return round(score, 4)\n\ndef rerank(query, docs):\n    scored = [{\"text\": d, \"score\": bm25_score(query, d)} for d in docs]\n    return sorted(scored, key=lambda x: -x[___])\n\ndocs = [\n    \"Python is great for AI development\",\n    \"JavaScript is used for web development\",\n    \"Python and AI are closely related\",\n    \"Web development with React\",\n]\n\nresults = rerank(\"Python AI\", docs)\n\nprint(f\"top: {'Python' in results[0]['text']}\")\nprint(f\"count: {len(results)}\")\nprint(f\"scored: {results[0]['score'] > 0}\")\nprint(f\"last: {results[-1]['score'] < results[0]['score']}\")\nprint(f\"all: {all(r['score'] >= 0 for r in results)}\")`,
      objectives: [
        { id: 'obj1', text: 'Python排第一' },
        { id: 'obj2', text: '4条结果' },
        { id: 'obj3', text: '分数>0' },
        { id: 'obj4', text: '末尾分数低' },
        { id: 'obj5', text: '全部>=0' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'top: True', displayValue: '排序 ✓', speechText: '重排序!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'count: 4', displayValue: '数量 ✓', speechText: '全量!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'scored: True', displayValue: '分数 ✓', speechText: 'BM25!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'last: True', displayValue: '排序 ✓', speechText: '降序!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'all: True', displayValue: '非负 ✓', speechText: '重排大师!' },
      ]},
      hints: ['💡 split()按空格分词', '💡 "score"是排序key', '💡 BM25衡量文档相关性'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 5 },
    },
  },

  '10-1': {
    normal: {
      initialCode: `# ⚔️ 任务：知识库管理挑战\n\nclass KnowledgeBase:\n    def __init__(self):\n        self.docs = {}\n        self.counter = 0\n    def add(self, content, tags=None):\n        self.___ += 1\n        doc_id = f\"doc_{self.counter}\"\n        self.docs[doc_id] = {\"content\": content, \"tags\": tags or []}\n        return doc_id\n    def search(self, keyword):\n        return [v for v in self.docs.values() if keyword in v[\"content\"]]\n    def by_tag(self, tag):\n        return [v for v in self.docs.values() if tag in v[\"tags\"]]\n    def count(self):\n        return ___(self.docs)\n\nkb = KnowledgeBase()\nkb.add(\"Python是AI编程语言\", [\"python\",\"ai\"])\nkb.add(\"JavaScript用于Web开发\", [\"js\",\"web\"])\nkb.add(\"Python数据分析很强\", [\"python\",\"data\"])\n\npy = kb.search(\"Python\")\nai_docs = kb.by_tag(\"python\")\n\nprint(f\"total: {kb.count()}\")\nprint(f\"python_docs: {len(py)}\")\nprint(f\"tagged: {len(ai_docs)}\")\nprint(f\"js_docs: {len(kb.search('JavaScript'))}\")\nprint(f\"empty: {len(kb.search('Ruby'))}\")`,
      objectives: [
        { id: 'obj1', text: '总3文档' },
        { id: 'obj2', text: 'Python匹配2' },
        { id: 'obj3', text: 'python标签2' },
        { id: 'obj4', text: 'JS匹配1' },
        { id: 'obj5', text: 'Ruby匹配0' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'total: 3', displayValue: '总数 ✓', speechText: '知识库!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'python_docs: 2', displayValue: '搜索 ✓', speechText: '关键词!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'tagged: 2', displayValue: '标签 ✓', speechText: '分类!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'js_docs: 1', displayValue: 'JS ✓', speechText: '精确!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'empty: 0', displayValue: '空 ✓', speechText: '知识库大师!' },
      ]},
      hints: ['💡 counter递增生成ID', '💡 len获取长度', '💡 in运算符检查包含'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'skeleton', totalObjectives: 5 },
    },
  },

  '10-2': {
    normal: {
      initialCode: `# ⚔️ 任务：可观测性挑战\nimport time\n\nclass Tracer:\n    def __init__(self):\n        self.spans = []\n        self.metrics = {}\n    def start_span(self, name):\n        return {\"name\": name, \"start\": time.time()}\n    def end_span(self, span):\n        span[\"duration\"] = round(time.time() - span[\"start\"], 4)\n        self.spans.___(span)\n        return span\n    def record(self, name, value):\n        self.metrics[name] = self.metrics.___(name, 0) + value\n    def summary(self):\n        return {\"spans\": len(self.spans), \"metrics\": dict(self.metrics)}\n\ntracer = Tracer()\ns1 = tracer.start_span(\"query\")\ntracer.record(\"tokens\", 100)\ntracer.record(\"tokens\", 50)\ntracer.end_span(s1)\ns2 = tracer.start_span(\"embed\")\ntracer.end_span(s2)\nsummary = tracer.summary()\n\nprint(f\"spans: {summary['spans']}\")\nprint(f\"tokens: {summary['metrics']['tokens']}\")\nprint(f\"has_duration: {'duration' in tracer.spans[0]}\")\nprint(f\"span_name: {tracer.spans[0]['name']}\")\nprint(f\"metrics_count: {len(summary['metrics'])}\")`,
      objectives: [
        { id: 'obj1', text: '2个span' },
        { id: 'obj2', text: '150tokens' },
        { id: 'obj3', text: '有duration' },
        { id: 'obj4', text: '首span=query' },
        { id: 'obj5', text: '1个指标' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'spans: 2', displayValue: 'span ✓', speechText: '追踪!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'tokens: 150', displayValue: 'token ✓', speechText: '累加!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'has_duration: True', displayValue: '耗时 ✓', speechText: '计时!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'span_name: query', displayValue: '名称 ✓', speechText: '命名!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'metrics_count: 1', displayValue: '指标 ✓', speechText: '可观测大师!' },
      ]},
      hints: ['💡 append添加span', '💡 get(name,0)默认值累加', '💡 duration=结束-开始'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 5 },
    },
  },

  'boss-6': {
    normal: {
      initialCode: `# ⚔️ BOSS：DocMind 综合实战\n\nclass DocMind:\n    def __init__(self):\n        self.kb = {}\n        self.history = []\n    def add_doc(self, topic, content):\n        self.kb[topic] = content\n    def search(self, query):\n        results = []\n        for topic, content in self.kb.___():\n            if query.lower() in content.lower():\n                results.___(({\"topic\": topic, \"content\": content[:50]}))\n        return results\n    def ask(self, query):\n        results = self.search(query)\n        answer = f\"找到{len(results)}条相关文档\"\n        self.history.___(({\"query\": query, \"answer\": answer, \"refs\": len(results)}))\n        return answer\n\nmind = DocMind()\nmind.add_doc(\"Python\", \"Python是一门强大的编程语言，适合AI开发\")\nmind.add_doc(\"AI\", \"AI人工智能是计算机科学的重要分支\")\nmind.add_doc(\"Web\", \"Web开发包括前端和后端技术\")\n\nr1 = mind.ask(\"Python\")\nr2 = mind.ask(\"AI\")\nr3 = mind.ask(\"Go\")\n\nprint(f\"r1: {r1}\")\nprint(f\"r2: {r2}\")\nprint(f\"r3: {r3}\")\nprint(f\"history: {len(mind.history)}\")\nprint(f\"kb_size: {len(mind.kb)}\")`,
      objectives: [
        { id: 'obj1', text: 'Python找到1+条' },
        { id: 'obj2', text: 'AI找到1+条' },
        { id: 'obj3', text: 'Go找到0条' },
        { id: 'obj4', text: '3次查询' },
        { id: 'obj5', text: '知识库3条' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: '找到', displayValue: '搜索 ✓', speechText: '检索!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'history: 3', displayValue: '历史 ✓', speechText: '记录!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'kb_size: 3', displayValue: '知识库 ✓', speechText: '🏆 BOSS击败!' },
      ]},
      hints: ['💡 items()遍历键值对', '💡 append添加结果', '💡 lower()忽略大小写'],
      rewards: { xp: 250 },
      scene: { theme: 'fortress', monster: 'dragon', totalObjectives: 5 },
    },
  },

  'boss-final': {
    normal: {
      initialCode: `# ⚔️ 终极 BOSS：AI 全栈毕业考核\n\nclass AIGraduate:\n    def __init__(self, name):\n        self.name = name\n        self.skills = {}\n        self.projects = []\n    def learn(self, skill, score):\n        self.skills[skill] = score\n    def add_project(self, name, stars):\n        self.projects.___(({\"name\": name, \"stars\": stars}))\n    def grade(self):\n        if not self.skills: return \"F\"\n        avg = sum(self.skills.values()) / ___(self.skills)\n        return \"A\" if avg >= 85 else \"B\" if avg >= 75 else \"C\"\n    def portfolio(self):\n        total_stars = ___(p[\"stars\"] for p in self.projects)\n        strong = [k for k, v in self.skills.items() if v >= ___]\n        return {\"grade\": self.grade(), \"stars\": total_stars, \"strong\": strong, \"projects\": len(self.projects)}\n\nstudent = AIGraduate(\"小明\")\nstudent.learn(\"Python\", 90)\nstudent.learn(\"AI基础\", 85)\nstudent.learn(\"RAG\", 92)\nstudent.learn(\"Agent\", 88)\nstudent.add_project(\"ChatBot\", 50)\nstudent.add_project(\"RAG系统\", 80)\n\npf = student.portfolio()\n\nprint(f\"grade: {pf['grade']}\")\nprint(f\"stars: {pf['stars']}\")\nprint(f\"strong: {len(pf['strong'])}\")\nprint(f\"projects: {pf['projects']}\")\nprint(f\"name: {student.name}\")`,
      objectives: [
        { id: 'obj1', text: '成绩A' },
        { id: 'obj2', text: '130星' },
        { id: 'obj3', text: '4项强技能' },
        { id: 'obj4', text: '2个项目' },
        { id: 'obj5', text: '名字小明' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'grade: A', displayValue: '成绩 ✓', speechText: '优秀!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'stars: 130', displayValue: '星 ✓', speechText: '作品!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'strong: 4', displayValue: '强项 ✓', speechText: '全能!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'projects: 2', displayValue: '项目 ✓', speechText: '实战!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'name: 小明', displayValue: '毕业 ✓', speechText: '🏆 终极BOSS击败! AI全栈毕业!' },
      ]},
      hints: ['💡 append添加项目', '💡 len获取数量', '💡 sum求和,85分以上算强项'],
      rewards: { xp: 500 },
      scene: { theme: 'temple', monster: 'dragon', totalObjectives: 5 },
    },
  },

  '11-2': {
    normal: {
      initialCode: `# ⚔️ 任务：ReAct 循环挑战\n\nclass ReActAgent:\n    def __init__(self):\n        self.trace = []\n    def think(self, question):\n        if \"计算\" in question:\n            return {\"action\": \"calc\", \"input\": question}\n        elif \"搜索\" in question:\n            return {\"action\": \"search\", \"input\": question}\n        return {\"action\": \"answer\", \"input\": question}\n    def act(self, thought):\n        action = thought[\"action\"]\n        if action == \"calc\":\n            return \"计算结果: 42\"\n        elif action == \"search\":\n            return \"搜索结果: Python是编程语言\"\n        return f\"回答: {thought['input'][:20]}\"\n    def step(self, question):\n        thought = self.___(question)\n        observation = self.act(thought)\n        self.trace.___(({\"thought\": thought, \"observation\": observation}))\n        return observation\n    def run(self, question, max_steps=3):\n        for i in range(max_steps):\n            result = self.step(question)\n            if \"回答\" in result:\n                break\n        return self.trace[-1][\"observation\"]\n\nagent = ReActAgent()\nr1 = agent.step(\"计算 1+1\")\nr2 = agent.step(\"搜索 Python\")\nr3 = agent.step(\"你好世界\")\n\nprint(f\"r1: {r1}\")\nprint(f\"r2: {'Python' in r2}\")\nprint(f\"r3: {'回答' in r3}\")\nprint(f\"trace: {len(agent.trace)}\")\nprint(f\"actions: {agent.trace[0]['thought']['action']}\")`,
      objectives: [
        { id: 'obj1', text: '计算结果' },
        { id: 'obj2', text: '搜索含Python' },
        { id: 'obj3', text: '回答类型' },
        { id: 'obj4', text: '3步追踪' },
        { id: 'obj5', text: '首步calc' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'r1: 计算结果: 42', displayValue: '计算 ✓', speechText: 'ReAct!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'r2: True', displayValue: '搜索 ✓', speechText: '搜索!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'r3: True', displayValue: '回答 ✓', speechText: '推理!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'trace: 3', displayValue: '追踪 ✓', speechText: '循环!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'actions: calc', displayValue: '动作 ✓', speechText: 'ReAct大师!' },
      ]},
      hints: ['💡 think方法做推理决策', '💡 append记录每步', '💡 act执行动作返回观察'],
      rewards: { xp: 120 },
      scene: { theme: 'cave', monster: 'wizard', totalObjectives: 5 },
    },
  },

  '11-3': {
    normal: {
      initialCode: `# ⚔️ 任务：LangGraph 状态机挑战\n\nclass StateGraph:\n    def __init__(self):\n        self.nodes = {}\n        self.edges = {}\n    def add_node(self, name, func):\n        self.___[name] = func\n    def add_edge(self, from_node, to_node):\n        self.edges[from_node] = to_node\n    def run(self, start, state):\n        current = start\n        visited = []\n        while current and current != \"END\":\n            if current in self.nodes:\n                state = self.nodes[current](state)\n            visited.___(current)\n            current = self.edges.get(current, \"END\")\n        return {\"state\": state, \"path\": visited}\n\ndef classify(state):\n    state[\"type\"] = \"question\" if \"?\" in state.get(\"input\",\"\") else \"statement\"\n    return state\n\ndef process(state):\n    state[\"processed\"] = True\n    return state\n\ndef respond(state):\n    state[\"response\"] = f\"处理完成: {state.get('type','unknown')}\"\n    return state\n\ng = StateGraph()\ng.add_node(\"classify\", classify)\ng.add_node(\"process\", process)\ng.add_node(\"respond\", respond)\ng.add_edge(\"classify\", \"process\")\ng.add_edge(\"process\", \"respond\")\ng.add_edge(\"respond\", \"END\")\n\nresult = g.run(\"classify\", {\"input\": \"What is AI?\"})\n\nprint(f\"type: {result['state']['type']}\")\nprint(f\"processed: {result['state']['processed']}\")\nprint(f\"response: {'处理完成' in result['state']['response']}\")\nprint(f\"path: {len(result['path'])}\")\nprint(f\"nodes: {len(g.nodes)}\")`,
      objectives: [
        { id: 'obj1', text: '分类question' },
        { id: 'obj2', text: '已处理' },
        { id: 'obj3', text: '响应正确' },
        { id: 'obj4', text: '3步路径' },
        { id: 'obj5', text: '3个节点' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'type: question', displayValue: '分类 ✓', speechText: '分类!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'processed: True', displayValue: '处理 ✓', speechText: '状态!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'response: True', displayValue: '响应 ✓', speechText: '流转!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'path: 3', displayValue: '路径 ✓', speechText: '图!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'nodes: 3', displayValue: '节点 ✓', speechText: 'LangGraph大师!' },
      ]},
      hints: ['💡 nodes字典存储节点函数', '💡 append记录访问路径', '💡 edges定义转移关系'],
      rewards: { xp: 120 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 5 },
    },
  },

  '12-1': {
    normal: {
      initialCode: `# ⚔️ 任务：MCP 协议挑战\n\nclass MCPServer:\n    def __init__(self, name):\n        self.name = name\n        self.tools = {}\n        self.call_log = []\n    def register(self, name, desc, func):\n        self.tools[name] = {\"description\": desc, \"func\": func}\n    def call(self, name, **args):\n        if name not in self.tools:\n            self.call_log.___(({\"tool\": name, \"ok\": False}))\n            return {\"error\": f\"{name} not found\"}\n        try:\n            result = self.tools[name][___](**args)\n            self.call_log.append({\"tool\": name, \"ok\": True, \"result\": result})\n            return {\"result\": result}\n        except Exception as e:\n            self.call_log.append({\"tool\": name, \"ok\": False})\n            return {\"error\": str(e)}\n    def stats(self):\n        ok = ___(1 for l in self.call_log if l[\"ok\"])\n        return {\"total\": len(self.call_log), \"success\": ok}\n\nserver = MCPServer(\"my-server\")\nserver.register(\"add\", \"加法\", lambda a, b: a + b)\nserver.register(\"upper\", \"大写\", lambda text: text.upper())\n\nr1 = server.call(\"add\", a=10, b=20)\nr2 = server.call(\"upper\", text=\"hello\")\nr3 = server.call(\"unknown\")\nst = server.stats()\n\nprint(f\"add: {r1['result']}\")\nprint(f\"upper: {r2['result']}\")\nprint(f\"error: {'error' in r3}\")\nprint(f\"total: {st['total']}\")\nprint(f\"success: {st['success']}\")`,
      objectives: [
        { id: 'obj1', text: '加法30' },
        { id: 'obj2', text: '大写HELLO' },
        { id: 'obj3', text: '未知报错' },
        { id: 'obj4', text: '3次调用' },
        { id: 'obj5', text: '2次成功' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'add: 30', displayValue: '加法 ✓', speechText: '工具!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'upper: HELLO', displayValue: '大写 ✓', speechText: '调用!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'error: True', displayValue: '错误 ✓', speechText: '防御!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'total: 3', displayValue: '总数 ✓', speechText: '日志!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'success: 2', displayValue: '成功 ✓', speechText: 'MCP大师!' },
      ]},
      hints: ['💡 append记录调用日志', '💡 "func"是工具函数的key', '💡 sum统计成功次数'],
      rewards: { xp: 120 },
      scene: { theme: 'cave', monster: 'wizard', totalObjectives: 5 },
    },
  },

  'boss-4': {
    normal: {
      initialCode: `# ⚔️ BOSS：ResearchBot 终极战\n\nclass ResearchBot:\n    def __init__(self):\n        self.sources = {}\n        self.findings = []\n    def add_source(self, name, content):\n        self.sources[name] = content\n    def search(self, query):\n        results = []\n        for name, content in self.sources.___():\n            if query.lower() in content.lower():\n                results.___(({\"source\": name, \"snippet\": content[:50]}))\n        return results\n    def research(self, query):\n        found = self.search(query)\n        self.findings.extend(found)\n        return {\"query\": query, \"count\": len(found), \"findings\": found}\n    def report(self):\n        sources_used = set(f[\"source\"] for f in self.findings)\n        return {\"total_findings\": len(self.findings), \"sources_used\": len(sources_used)}\n\nbot = ResearchBot()\nbot.add_source(\"wiki\", \"Python是一门高级编程语言\")\nbot.add_source(\"docs\", \"Python用于AI和数据科学\")\nbot.add_source(\"blog\", \"JavaScript是Web开发的核心\")\n\nr1 = bot.research(\"Python\")\nr2 = bot.research(\"AI\")\nrpt = bot.report()\n\nprint(f\"py_count: {r1['count']}\")\nprint(f\"ai_count: {r2['count']}\")\nprint(f\"total: {rpt['total_findings']}\")\nprint(f\"sources: {rpt['sources_used']}\")\nprint(f\"kb_size: {len(bot.sources)}\")`,
      objectives: [
        { id: 'obj1', text: 'Python匹配2' },
        { id: 'obj2', text: 'AI匹配1' },
        { id: 'obj3', text: '总发现3' },
        { id: 'obj4', text: '2个来源' },
        { id: 'obj5', text: '知识库3' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'py_count: 2', displayValue: 'Python ✓', speechText: '搜索!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'ai_count: 1', displayValue: 'AI ✓', speechText: '检索!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'total: 3', displayValue: '发现 ✓', speechText: '聚合!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'sources: 2', displayValue: '来源 ✓', speechText: '去重!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'kb_size: 3', displayValue: '知识库 ✓', speechText: '🏆 BOSS击败!' },
      ]},
      hints: ['💡 items()遍历键值对', '💡 append添加结果', '💡 set去重统计来源'],
      rewards: { xp: 250 },
      scene: { theme: 'temple', monster: 'dragon', totalObjectives: 5 },
    },
  },

  '13-1': {
    normal: {
      initialCode: `# ⚔️ 任务：浏览器端 AI 挑战\n\nclass TinyModel:\n    def __init__(self, name, weights):\n        self.name = name\n        self.weights = weights\n        self.size_mb = len(weights) * ___\n    def predict(self, inputs):\n        score = sum(w * i for w, i in zip(self.weights, inputs))\n        return \"正面\" if score > 0 else \"负面\"\n    def quantize(self):\n        q_weights = [round(w * 10) / 10 for w in self.weights]\n        return TinyModel(f\"{self.name}_q\", q_weights)\n    def info(self):\n        return {\"name\": self.name, \"params\": len(self.weights), \"size_mb\": self.size_mb}\n\nmodel = TinyModel(\"sentiment\", [0.5, -0.3, 0.8, -0.2, 0.6])\nq_model = model.quantize()\n\nr1 = model.predict([1, 0, 1, 0, 1])\nr2 = model.predict([-1, 1, -1, 1, -1])\ninfo = model.info()\nq_info = q_model.info()\n\nprint(f\"pred1: {r1}\")\nprint(f\"pred2: {r2}\")\nprint(f\"params: {info['params']}\")\nprint(f\"name_q: {'_q' in q_info['name']}\")\nprint(f\"size: {info['size_mb']}\")`,
      objectives: [
        { id: 'obj1', text: '正面预测' },
        { id: 'obj2', text: '负面预测' },
        { id: 'obj3', text: '5参数' },
        { id: 'obj4', text: '量化命名' },
        { id: 'obj5', text: '模型大小' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'pred1: 正面', displayValue: '正面 ✓', speechText: '推理!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'pred2: 负面', displayValue: '负面 ✓', speechText: '分类!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'params: 5', displayValue: '参数 ✓', speechText: '模型!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'name_q: True', displayValue: '量化 ✓', speechText: '压缩!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'size: 20', displayValue: '大小 ✓', speechText: '浏览器AI大师!' },
      ]},
      hints: ['💡 每个权重占4字节(float32)', '💡 量化减小精度降低体积', '💡 score>0判正面'],
      rewards: { xp: 100 },
      scene: { theme: 'cave', monster: 'golem', totalObjectives: 5 },
    },
  },

  '13-2': {
    normal: {
      initialCode: `# ⚔️ 任务：多模态融合挑战\n\nclass MultiModal:\n    def __init__(self):\n        self.processors = {}\n    def register(self, modality, processor):\n        self.processors[modality] = processor\n    def process(self, inputs):\n        results = {}\n        for item in inputs:\n            mod = item[\"type\"]\n            if mod in self.processors:\n                results[mod] = self.processors[mod](item[\"data\"])\n            else:\n                results[mod] = {\"error\": f\"不支持: {mod}\"}\n        return results\n    def supported(self):\n        return list(self.processors.___())\n\ndef text_proc(data):\n    return {\"words\": len(data.split()), \"chars\": ___(data)}\n\ndef image_proc(data):\n    return {\"width\": data.get(\"w\", 0), \"height\": data.get(\"h\", 0)}\n\nmm = MultiModal()\nmm.register(\"text\", text_proc)\nmm.register(\"image\", image_proc)\n\ninputs = [\n    {\"type\": \"text\", \"data\": \"Hello World AI\"},\n    {\"type\": \"image\", \"data\": {\"w\": 640, \"h\": 480}},\n    {\"type\": \"audio\", \"data\": \"test.mp3\"},\n]\nresults = mm.process(inputs)\n\nprint(f\"text_words: {results['text']['words']}\")\nprint(f\"img_w: {results['image']['width']}\")\nprint(f\"audio_err: {'不支持' in str(results.get('audio',{}))}\")\nprint(f\"supported: {len(mm.supported())}\")\nprint(f\"text_chars: {results['text']['chars']}\")`,
      objectives: [
        { id: 'obj1', text: '文本3词' },
        { id: 'obj2', text: '图片宽640' },
        { id: 'obj3', text: '音频不支持' },
        { id: 'obj4', text: '2种模态' },
        { id: 'obj5', text: '文本14字符' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'text_words: 3', displayValue: '文本 ✓', speechText: 'NLP!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'img_w: 640', displayValue: '图片 ✓', speechText: '视觉!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'audio_err: True', displayValue: '音频 ✓', speechText: '防御!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'supported: 2', displayValue: '模态 ✓', speechText: '注册!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'text_chars: 14', displayValue: '字符 ✓', speechText: '多模态大师!' },
      ]},
      hints: ['💡 keys()获取所有模态名', '💡 len计算字符数', '💡 不支持的模态返回error'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'wizard', totalObjectives: 5 },
    },
  },

  '14-1': {
    normal: {
      initialCode: `# ⚔️ 任务：AI 评估体系挑战\n\ndef confusion_matrix(y_true, y_pred):\n    tp = ___(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)\n    fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)\n    fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)\n    tn = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 0)\n    return {\"tp\": tp, \"fp\": fp, \"fn\": fn, \"tn\": tn}\n\ndef precision(cm):\n    return round(cm[\"tp\"] / (cm[\"tp\"] + cm[___]), 4) if (cm[\"tp\"] + cm[\"fp\"]) > 0 else 0\n\ndef recall(cm):\n    return round(cm[\"tp\"] / (cm[\"tp\"] + cm[\"fn\"]), 4) if (cm[\"tp\"] + cm[\"fn\"]) > 0 else 0\n\ndef f1(p, r):\n    return round(___ * p * r / (p + r), 4) if (p + r) > 0 else 0\n\ny_true = [1, 1, 0, 1, 0, 1, 0, 0, 1, 0]\ny_pred = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0]\n\ncm = confusion_matrix(y_true, y_pred)\np = precision(cm)\nr = recall(cm)\n\nprint(f\"tp: {cm['tp']}\")\nprint(f\"precision: {p}\")\nprint(f\"recall: {r}\")\nprint(f\"f1: {f1(p, r)}\")\nprint(f\"total: {sum(cm.values())}\")`,
      objectives: [
        { id: 'obj1', text: 'TP=4' },
        { id: 'obj2', text: '精确率' },
        { id: 'obj3', text: '召回率' },
        { id: 'obj4', text: 'F1分数' },
        { id: 'obj5', text: '总数10' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'tp: 4', displayValue: 'TP ✓', speechText: '混淆矩阵!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'precision:', displayValue: '精确 ✓', speechText: 'Precision!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'recall:', displayValue: '召回 ✓', speechText: 'Recall!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'f1:', displayValue: 'F1 ✓', speechText: 'F1!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'total: 10', displayValue: '总数 ✓', speechText: '评估大师!' },
      ]},
      hints: ['💡 sum统计满足条件的数量', '💡 "fp"是假正例key', '💡 F1=2*P*R/(P+R)'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'golem', totalObjectives: 5 },
    },
  },

  '14-2': {
    normal: {
      initialCode: `# ⚔️ 任务：AI 测试场挑战\n\ndef test_case(name, question, expected_keywords, answer):\n    hits = ___(1 for kw in expected_keywords if kw in answer)\n    score = round(hits / len(expected_keywords) * 100)\n    return {\"name\": name, \"score\": score, \"pass\": score >= 60}\n\ndef run_suite(cases):\n    results = []\n    for c in cases:\n        r = test_case(c[\"name\"], c[\"q\"], c[\"kw\"], c[\"answer\"])\n        results.___(r)\n    avg = round(sum(r[\"score\"] for r in results) / len(results))\n    passed = sum(1 for r in results if r[\"pass\"])\n    return {\"results\": results, \"avg\": avg, \"passed\": passed, \"total\": len(results)}\n\ncases = [\n    {\"name\": \"t1\", \"q\": \"什么是Python?\", \"kw\": [\"编程\",\"语言\"], \"answer\": \"Python是一门编程语言\"},\n    {\"name\": \"t2\", \"q\": \"AI是什么?\", \"kw\": [\"人工\",\"智能\",\"计算机\"], \"answer\": \"AI是人工智能\"},\n    {\"name\": \"t3\", \"q\": \"1+1?\", \"kw\": [\"2\",\"二\"], \"answer\": \"答案是2\"},\n]\n\nresult = run_suite(cases)\n\nprint(f\"avg: {result['avg']}\")\nprint(f\"passed: {result['passed']}\")\nprint(f\"total: {result['total']}\")\nprint(f\"t1_pass: {result['results'][0]['pass']}\")\nprint(f\"t1_score: {result['results'][0]['score']}\")`,
      objectives: [
        { id: 'obj1', text: '平均分' },
        { id: 'obj2', text: '通过数' },
        { id: 'obj3', text: '总数3' },
        { id: 'obj4', text: 't1通过' },
        { id: 'obj5', text: 't1满分' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'passed:', displayValue: '通过 ✓', speechText: '测试!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'total: 3', displayValue: '总数 ✓', speechText: '覆盖!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 't1_pass: True', displayValue: 't1 ✓', speechText: '用例!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 't1_score: 100', displayValue: '满分 ✓', speechText: '测试大师!' },
      ]},
      hints: ['💡 sum统计关键词命中数', '💡 append添加结果', '💡 score>=60算通过'],
      rewards: { xp: 100 },
      scene: { theme: 'cave', monster: 'skeleton', totalObjectives: 4 },
    },
  },

  '15-1': {
    normal: {
      initialCode: `# ⚔️ 任务：作品集生成器挑战\n\nclass Portfolio:\n    def __init__(self, name):\n        self.name = name\n        self.projects = []\n    def add(self, name, desc, tags, stars=0):\n        self.projects.___(({\"name\": name, \"desc\": desc, \"tags\": tags, \"stars\": stars}))\n    def by_stars(self):\n        return sorted(self.projects, key=lambda x: x[\"stars\"], reverse=___)\n    def by_tag(self, tag):\n        return [p for p in self.projects if tag in p[\"tags\"]]\n    def summary(self):\n        all_tags = set()\n        for p in self.projects:\n            all_tags.update(p[\"tags\"])\n        total_stars = ___(p[\"stars\"] for p in self.projects)\n        return {\"projects\": len(self.projects), \"tags\": len(all_tags), \"stars\": total_stars}\n\npf = Portfolio(\"小明\")\npf.add(\"ChatBot\", \"AI聊天机器人\", [\"ai\",\"python\"], 50)\npf.add(\"RAG系统\", \"检索增强生成\", [\"ai\",\"rag\"], 80)\npf.add(\"个人网站\", \"响应式网站\", [\"web\",\"js\"], 30)\n\ntop = pf.by_stars()\nai_projects = pf.by_tag(\"ai\")\ns = pf.summary()\n\nprint(f\"top: {top[0]['name']}\")\nprint(f\"ai_count: {len(ai_projects)}\")\nprint(f\"total_stars: {s['stars']}\")\nprint(f\"tags: {s['tags']}\")\nprint(f\"projects: {s['projects']}\")`,
      objectives: [
        { id: 'obj1', text: 'RAG排第一' },
        { id: 'obj2', text: 'AI项目2个' },
        { id: 'obj3', text: '总160星' },
        { id: 'obj4', text: '5个标签' },
        { id: 'obj5', text: '3个项目' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'top: RAG系统', displayValue: '排序 ✓', speechText: '排名!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'ai_count: 2', displayValue: 'AI ✓', speechText: '标签!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'total_stars: 160', displayValue: '星 ✓', speechText: '人气!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'projects: 3', displayValue: '项目 ✓', speechText: '作品集大师!' },
      ]},
      hints: ['💡 append添加项目', '💡 reverse=True降序排列', '💡 sum求总星数'],
      rewards: { xp: 100 },
      scene: { theme: 'fortress', monster: 'skeleton', totalObjectives: 4 },
    },
  },

  '15-2': {
    normal: {
      initialCode: `# ⚔️ 任务：部署发射台挑战\n\nclass Deployer:\n    def __init__(self, app_name):\n        self.app_name = app_name\n        self.env_vars = {}\n        self.steps = []\n    def set_env(self, key, value, secret=False):\n        self.env_vars[key] = {\"value\": value if not secret else \"***\", \"secret\": secret}\n    def add_step(self, name, command):\n        self.steps.___(({\"name\": name, \"cmd\": command, \"status\": \"pending\"}))\n    def run_deploy(self):\n        for step in self.steps:\n            step[\"status\"] = \"done\"\n        return {\"app\": self.app_name, \"steps\": len(self.steps), \"status\": \"deployed\"}\n    def dockerfile(self):\n        lines = [\n            \"FROM python:3.11\",\n            \"___ /app\",\n            \"COPY . .\",\n            \"RUN pip install -r requirements.txt\",\n            f\"CMD [\\\"python\\\", \\\"{self.app_name}.py\\\"]\"\n        ]\n        return \"\\n\".___(lines)\n\nd = Deployer(\"myapp\")\nd.set_env(\"DB_URL\", \"postgres://localhost\", secret=False)\nd.set_env(\"API_KEY\", \"sk-123\", secret=True)\nd.add_step(\"test\", \"pytest\")\nd.add_step(\"build\", \"docker build .\")\nd.add_step(\"deploy\", \"docker push\")\n\nresult = d.run_deploy()\ndf = d.dockerfile()\n\nprint(f\"status: {result['status']}\")\nprint(f\"steps: {result['steps']}\")\nprint(f\"secret: {d.env_vars['API_KEY']['value']}\")\nprint(f\"has_from: {'FROM' in df}\")\nprint(f\"env_count: {len(d.env_vars)}\")`,
      objectives: [
        { id: 'obj1', text: '部署完成' },
        { id: 'obj2', text: '3个步骤' },
        { id: 'obj3', text: '密钥隐藏' },
        { id: 'obj4', text: 'Dockerfile有FROM' },
        { id: 'obj5', text: '2个环境变量' },
      ],
      validation: { checks: [
        { type: 'output_contains', objectiveId: 'obj1', expected: 'status: deployed', displayValue: '部署 ✓', speechText: '发射!' },
        { type: 'output_contains', objectiveId: 'obj2', expected: 'steps: 3', displayValue: '步骤 ✓', speechText: '流水线!' },
        { type: 'output_contains', objectiveId: 'obj3', expected: 'secret: ***', displayValue: '密钥 ✓', speechText: '安全!' },
        { type: 'output_contains', objectiveId: 'obj4', expected: 'has_from: True', displayValue: 'Docker ✓', speechText: '容器!' },
        { type: 'output_contains', objectiveId: 'obj5', expected: 'env_count: 2', displayValue: '环境 ✓', speechText: '部署大师!' },
      ]},
      hints: ['💡 append添加步骤', '💡 WORKDIR设置工作目录', '💡 join连接Dockerfile行'],
      rewards: { xp: 100 },
      scene: { theme: 'temple', monster: 'wizard', totalObjectives: 5 },
    },
  },
};

export default variants;
