"""
CodeQuest Manim 动画 — 批次 2
渲染命令: manim -ql --format=webm batch2.py -a
"""
from manim import *


class Level_2_4_ListComp(Scene):
    """2-4 列表推导式：变换流水线"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("列表推导式 = map + filter", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 原始数据
        data = [1, 2, 3, 4, 5, 6]
        boxes = VGroup()
        for i, v in enumerate(data):
            box = Square(side_length=0.7, color=WHITE, stroke_width=2)
            box.move_to(LEFT * 3.5 + RIGHT * i * 0.85 + UP * 1)
            val = Text(str(v), font_size=20, color=WHITE).move_to(box)
            boxes.add(VGroup(box, val))

        input_label = Text("原始列表", font_size=16, color=GREY).next_to(boxes, LEFT, buff=0.3)
        self.play(Create(boxes), Write(input_label))

        # filter: x % 2 == 0
        filter_text = Text("if x % 2 == 0", font_size=20, color=YELLOW).move_to(ORIGIN + UP * 1)
        filter_arrow = Arrow(UP * 1.8, ORIGIN + UP * 0.3, color=YELLOW, buff=0.15)
        self.play(Write(filter_text))

        # 高亮偶数
        for i, v in enumerate(data):
            if v % 2 == 0:
                self.play(boxes[i][0].animate.set_color(GREEN), run_time=0.3)
            else:
                self.play(boxes[i].animate.set_opacity(0.2), run_time=0.3)

        # 结果
        evens = [2, 4, 6]
        result_boxes = VGroup()
        for i, v in enumerate(evens):
            box = Square(side_length=0.7, color=GREEN, stroke_width=2)
            box.move_to(LEFT * 1.5 + RIGHT * i * 0.85 + DOWN * 0.5)
            val = Text(str(v), font_size=20, color=WHITE).move_to(box)
            result_boxes.add(VGroup(box, val))

        self.play(FadeIn(result_boxes))

        # map: x * 2
        map_text = Text("x * 2", font_size=20, color=PURPLE).next_to(result_boxes, RIGHT, buff=0.5)
        self.play(Write(map_text))

        final = [4, 8, 12]
        final_boxes = VGroup()
        for i, v in enumerate(final):
            box = Square(side_length=0.7, color=PURPLE, stroke_width=2)
            box.move_to(LEFT * 1.5 + RIGHT * i * 0.85 + DOWN * 1.8)
            val = Text(str(v), font_size=20, color=WHITE).move_to(box)
            final_boxes.add(VGroup(box, val))

        self.play(Transform(result_boxes.copy(), final_boxes))

        # 一行代码
        code = Text("[x*2 for x in arr if x%2==0]", font_size=22, color=GREEN_A).to_edge(DOWN)
        self.play(Write(code))
        self.wait(1)


class Level_3_1_HTTPRouting(Scene):
    """3-1 HTTP 路由：请求→路由器→Handler"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("HTTP 路由分发", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 客户端
        client = RoundedRectangle(width=2, height=1.2, color=GREEN, corner_radius=0.2)
        client.move_to(LEFT * 5)
        client_txt = Text("客户端\nGET /users", font_size=14, color=GREEN_A).move_to(client)
        self.play(Create(client), Write(client_txt))

        # 路由器
        router = RoundedRectangle(width=2, height=2.5, color=YELLOW, corner_radius=0.2)
        router.move_to(LEFT * 1.5)
        router_txt = Text("路由表\n/users → fn1\n/posts → fn2\n/login → fn3", font_size=12, color=YELLOW_A).move_to(router)
        self.play(Create(router), Write(router_txt))

        # 箭头：请求到路由
        arr1 = Arrow(client.get_right(), router.get_left(), color=WHITE, buff=0.15)
        self.play(Create(arr1))

        # Handler 们
        handlers = []
        colors = [GREEN, BLUE, RED]
        names = ["list_users()", "list_posts()", "do_login()"]
        for i, (c, n) in enumerate(zip(colors, names)):
            h = RoundedRectangle(width=2.2, height=0.8, color=c, corner_radius=0.15)
            h.move_to(RIGHT * 3 + UP * (1 - i))
            txt = Text(n, font_size=14, color=c).move_to(h)
            handlers.append(VGroup(h, txt))
            self.play(Create(h), Write(txt), run_time=0.4)

        # 高亮匹配
        arr2 = Arrow(router.get_right(), handlers[0][0].get_left(), color=GREEN, buff=0.15, stroke_width=4)
        highlight = SurroundingRectangle(handlers[0], color=GREEN, buff=0.05)
        self.play(Create(arr2), Create(highlight))

        # 响应
        response = Text("→ 200 OK  [{...}]", font_size=18, color=GREEN_A).to_edge(DOWN)
        self.play(Write(response))
        self.wait(1)


class Level_3_4_Middleware(Scene):
    """3-4 中间件：洋葱模型管道"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("中间件 = 洋葱模型", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        layers = [
            ("CORS", BLUE, 2.8),
            ("Auth", YELLOW, 2.0),
            ("Logger", GREEN, 1.2),
        ]

        circles = []
        labels = []
        for name, color, r in layers:
            c = RoundedRectangle(width=r*2, height=r*1.2, color=color,
                                  corner_radius=0.15, fill_opacity=0.08)
            lbl = Text(name, font_size=16, color=color)
            lbl.move_to(c.get_top() + DOWN * 0.2)
            circles.append(c)
            labels.append(lbl)
            self.play(Create(c), Write(lbl), run_time=0.5)

        # 核心 Handler
        core = RoundedRectangle(width=1.6, height=0.7, color=RED, corner_radius=0.1, fill_opacity=0.3)
        core_txt = Text("Handler", font_size=14, color=RED_A).move_to(core)
        self.play(Create(core), Write(core_txt))

        # 请求箭头（从左进入）
        req = Arrow(LEFT * 5, LEFT * 2.9, color=WHITE, stroke_width=3, buff=0.1)
        req_label = Text("请求 →", font_size=14, color=WHITE).next_to(req, UP, buff=0.1)
        self.play(Create(req), Write(req_label))

        # 穿过每层
        for i in range(3):
            flash = circles[i].copy().set_color(WHITE).set_stroke(width=3)
            self.play(FadeIn(flash), run_time=0.2)
            self.play(FadeOut(flash), run_time=0.2)

        # 响应箭头（从右出去）
        resp = Arrow(RIGHT * 2.9, RIGHT * 5, color=GREEN, stroke_width=3, buff=0.1)
        resp_label = Text("← 响应", font_size=14, color=GREEN_A).next_to(resp, UP, buff=0.1)
        self.play(Create(resp), Write(resp_label))

        explain = Text("请求逐层进入 → Handler 处理 → 响应逐层返回", font_size=16, color=GREY_A).to_edge(DOWN)
        self.play(Write(explain))
        self.wait(1)


class Level_5_1_Token(Scene):
    """5-1 Token 化 + Temperature"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("Token 化 & Temperature", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # Token 化演示
        sentence = Text('"Hello World"', font_size=24, color=WHITE).move_to(UP * 2)
        self.play(Write(sentence))

        tokens = ["Hello", " World"]
        token_boxes = VGroup()
        for i, t in enumerate(tokens):
            box = RoundedRectangle(width=2, height=0.8, color=GREEN, corner_radius=0.15)
            box.move_to(LEFT * 1.5 + RIGHT * i * 2.5 + UP * 0.8)
            txt = Text(t, font_size=18, color=GREEN_A).move_to(box)
            idx = Text(f"Token {i+1}", font_size=12, color=GREY).next_to(box, DOWN, buff=0.1)
            token_boxes.add(VGroup(box, txt, idx))

        self.play(FadeIn(token_boxes))
        self.wait(0.3)

        # Temperature 曲线
        temp_title = Text("Temperature 影响输出随机性", font_size=20, color=YELLOW).move_to(DOWN * 0.5)
        self.play(Write(temp_title))

        # 三个柱状图
        bar_groups = []
        temps = [("T=0", [0.95, 0.03, 0.02], GREEN),
                 ("T=0.7", [0.5, 0.3, 0.2], YELLOW),
                 ("T=2.0", [0.35, 0.33, 0.32], RED)]
        words = ["猫", "狗", "鼠"]

        for ti, (temp_label, probs, color) in enumerate(temps):
            x_offset = LEFT * 3.5 + RIGHT * ti * 3.5
            label = Text(temp_label, font_size=16, color=color).move_to(x_offset + DOWN * 1)
            self.play(Write(label), run_time=0.3)

            for wi, (word, prob) in enumerate(zip(words, probs)):
                bar_h = prob * 2
                bar = Rectangle(width=0.5, height=bar_h, color=color,
                               fill_opacity=0.6, stroke_width=1)
                bar.move_to(x_offset + RIGHT * (wi - 1) * 0.7 + DOWN * (3 - bar_h/2))
                w_txt = Text(word, font_size=10, color=GREY).next_to(bar, DOWN, buff=0.05)
                p_txt = Text(f"{prob:.0%}", font_size=10, color=WHITE).next_to(bar, UP, buff=0.05)
                bar_groups.append(VGroup(bar, w_txt, p_txt))
                self.play(Create(bar), Write(w_txt), Write(p_txt), run_time=0.15)

        self.wait(1)


class Level_5_2_Prompt(Scene):
    """5-2 Prompt 工程：消息拼装"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("Prompt Engineering", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 消息块
        messages = [
            ("system", "你是一个 Python 专家", BLUE),
            ("user", "什么是装饰器？", GREEN),
            ("assistant", "装饰器是...", YELLOW),
            ("user", "能给个例子吗？", GREEN),
        ]

        blocks = VGroup()
        for i, (role, content, color) in enumerate(messages):
            block = RoundedRectangle(width=8, height=0.7, color=color,
                                      corner_radius=0.1, fill_opacity=0.1)
            block.move_to(UP * 1.5 + DOWN * i * 0.85)
            role_txt = Text(role, font_size=14, color=color, weight=BOLD)
            role_txt.move_to(block.get_left() + RIGHT * 0.8)
            content_txt = Text(content, font_size=14, color=WHITE)
            content_txt.move_to(block)
            blocks.add(VGroup(block, role_txt, content_txt))
            self.play(FadeIn(blocks[i]), run_time=0.4)

        # 箭头到 LLM
        arrow = Arrow(DOWN * 1.5, DOWN * 2.3, color=WHITE, buff=0.1)
        self.play(Create(arrow))

        # LLM 盒子
        llm = RoundedRectangle(width=3, height=0.8, color=PURPLE, corner_radius=0.15, fill_opacity=0.3)
        llm.move_to(DOWN * 2.8)
        llm_txt = Text("LLM", font_size=20, color=PURPLE_A).move_to(llm)
        self.play(Create(llm), Write(llm_txt))

        # 技巧提示
        tips = Text("好 Prompt = 角色 + 上下文 + 任务 + 格式",
                    font_size=18, color=GREEN_A).to_edge(DOWN, buff=0.3)
        self.play(Write(tips))
        self.wait(1)


class Level_11_1_Agent(Scene):
    """11-1 Agent 状态机"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("AI Agent = LLM + 工具", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        states = [
            ("Thinking", BLUE, LEFT * 4 + UP * 0.5),
            ("Tool Call", YELLOW, LEFT * 0.5 + UP * 0.5),
            ("Observing", GREEN, RIGHT * 3 + UP * 0.5),
            ("Responding", RED, RIGHT * 0.5 + DOWN * 2),
        ]

        nodes = {}
        for name, color, pos in states:
            circle = Circle(radius=0.7, color=color, fill_opacity=0.2)
            circle.move_to(pos)
            txt = Text(name, font_size=14, color=color).move_to(circle)
            nodes[name] = VGroup(circle, txt)
            self.play(Create(circle), Write(txt), run_time=0.4)

        # 连线
        edges = [
            ("Thinking", "Tool Call", "需要工具"),
            ("Tool Call", "Observing", "执行"),
            ("Observing", "Thinking", "继续推理"),
            ("Thinking", "Responding", "可以回答"),
        ]

        for src, dst, label in edges:
            src_node = nodes[src][0]
            dst_node = nodes[dst][0]
            arr = Arrow(src_node.get_center(), dst_node.get_center(), color=GREY,
                       buff=0.75, stroke_width=2)
            lbl = Text(label, font_size=10, color=GREY_A)
            lbl.move_to(arr.get_center() + UP * 0.25)
            self.play(Create(arr), Write(lbl), run_time=0.4)

        explain = Text("循环: Think → Act → Observe → Think...",
                       font_size=16, color=GREY_A).to_edge(DOWN)
        self.play(Write(explain))
        self.wait(1)


class Level_11_3_LangGraph(Scene):
    """11-3 LangGraph 图执行"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("LangGraph: 状态图执行引擎", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 节点
        start = Circle(radius=0.5, color=WHITE, fill_opacity=0.3).move_to(LEFT * 4 + UP * 0.5)
        start_txt = Text("START", font_size=14, color=WHITE).move_to(start)

        classify = RoundedRectangle(width=2, height=0.8, color=YELLOW, corner_radius=0.15)
        classify.move_to(LEFT * 1 + UP * 0.5)
        classify_txt = Text("分类器", font_size=14, color=YELLOW_A).move_to(classify)

        math_node = RoundedRectangle(width=2, height=0.8, color=GREEN, corner_radius=0.15)
        math_node.move_to(RIGHT * 2.5 + UP * 1.5)
        math_txt = Text("数学求解", font_size=14, color=GREEN_A).move_to(math_node)

        text_node = RoundedRectangle(width=2, height=0.8, color=PURPLE, corner_radius=0.15)
        text_node.move_to(RIGHT * 2.5 + DOWN * 0.5)
        text_txt = Text("文本处理", font_size=14, color=PURPLE_A).move_to(text_node)

        end = Circle(radius=0.5, color=RED, fill_opacity=0.3).move_to(RIGHT * 5 + UP * 0.5)
        end_txt = Text("END", font_size=14, color=RED_A).move_to(end)

        self.play(Create(start), Write(start_txt))
        self.play(Create(classify), Write(classify_txt))
        self.play(Create(math_node), Write(math_txt),
                  Create(text_node), Write(text_txt))
        self.play(Create(end), Write(end_txt))

        # 边
        self.play(Create(Arrow(start.get_right(), classify.get_left(), color=WHITE, buff=0.15)))
        # 条件边
        arr_math = Arrow(classify.get_right(), math_node.get_left(), color=GREEN, buff=0.15)
        lbl_math = Text("含数字", font_size=10, color=GREEN_A).next_to(arr_math, UP, buff=0.05)
        arr_text = Arrow(classify.get_right(), text_node.get_left(), color=PURPLE, buff=0.15)
        lbl_text = Text("纯文本", font_size=10, color=PURPLE_A).next_to(arr_text, DOWN, buff=0.05)
        self.play(Create(arr_math), Write(lbl_math), Create(arr_text), Write(lbl_text))
        self.play(
            Create(Arrow(math_node.get_right(), end.get_left(), color=GREY, buff=0.15)),
            Create(Arrow(text_node.get_right(), end.get_left(), color=GREY, buff=0.15)),
        )

        # 高亮执行路径
        input_text = Text('输入: "计算 2+3"', font_size=18, color=GREEN_A).to_edge(DOWN, buff=0.8)
        self.play(Write(input_text))
        path_hl = SurroundingRectangle(math_node, color=GREEN, buff=0.1)
        self.play(Create(path_hl))

        result = Text("→ 条件路由: 数学分支 → 结果: 5", font_size=16, color=YELLOW_A).to_edge(DOWN, buff=0.2)
        self.play(Write(result))
        self.wait(1)


class Level_14_1_Evaluation(Scene):
    """14-1 混淆矩阵"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("混淆矩阵 & F1 Score", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 2x2 矩阵
        cells = [
            (0, 0, "TP\n(正确)", GREEN, "15"),
            (0, 1, "FN\n(漏报)", RED, "3"),
            (1, 0, "FP\n(误报)", ORANGE, "5"),
            (1, 1, "TN\n(正确)", GREEN, "77"),
        ]

        matrix = VGroup()
        for row, col, label, color, count in cells:
            rect = Rectangle(width=2.2, height=1.5, color=color, fill_opacity=0.15, stroke_width=2)
            rect.move_to(LEFT * 1.2 + RIGHT * col * 2.3 + UP * 0.3 + DOWN * row * 1.6)
            label_txt = Text(label, font_size=14, color=color).move_to(rect.get_center() + UP * 0.2)
            count_txt = Text(count, font_size=20, color=WHITE, weight=BOLD).move_to(rect.get_center() + DOWN * 0.3)
            matrix.add(VGroup(rect, label_txt, count_txt))

        # 表头
        pred_pos = Text("预测正例", font_size=14, color=GREY).move_to(LEFT * 1.2 + UP * 1.5)
        pred_neg = Text("预测反例", font_size=14, color=GREY).move_to(RIGHT * 1.1 + UP * 1.5)
        true_pos = Text("实际\n正例", font_size=12, color=GREY).move_to(LEFT * 3 + UP * 0.3)
        true_neg = Text("实际\n反例", font_size=12, color=GREY).move_to(LEFT * 3 + DOWN * 1.3)

        self.play(Write(pred_pos), Write(pred_neg), Write(true_pos), Write(true_neg))
        for cell in matrix:
            self.play(FadeIn(cell), run_time=0.3)

        # 公式
        precision = Text("Precision = 15/(15+5) = 75%", font_size=16, color=GREEN_A)
        recall = Text("Recall = 15/(15+3) = 83%", font_size=16, color=YELLOW_A)
        f1 = Text("F1 = 2×0.75×0.83/(0.75+0.83) = 79%", font_size=16, color=PURPLE_A)

        precision.move_to(RIGHT * 4 + UP * 0.5)
        recall.next_to(precision, DOWN, buff=0.3)
        f1.next_to(recall, DOWN, buff=0.3)

        self.play(Write(precision))
        self.play(Write(recall))
        self.play(Write(f1))
        self.wait(1)
