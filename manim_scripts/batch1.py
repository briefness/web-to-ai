"""
CodeQuest Manim 动画 — 批次 1
渲染命令: manim -ql --format=webm batch1.py -a
"""
from manim import *


class Level_1_1_Variables(Scene):
    """1-1 变量：赋值可视化"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("变量 = 数据的容器", font_size=36, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 显示变量名
        box1 = RoundedRectangle(width=3, height=1.2, color=GREEN, corner_radius=0.2)
        label1 = Text("name", font_size=28, color=GREEN).next_to(box1, UP, buff=0.15)
        val1 = Text('"Alice"', font_size=24, color=WHITE)
        box1.move_to(LEFT * 3)
        label1.next_to(box1, UP, buff=0.15)
        val1.move_to(box1)

        self.play(Create(box1), Write(label1))
        self.play(FadeIn(val1, shift=DOWN))
        self.wait(0.3)

        # 第二个变量
        box2 = RoundedRectangle(width=3, height=1.2, color=YELLOW, corner_radius=0.2)
        label2 = Text("age", font_size=28, color=YELLOW)
        val2 = Text("25", font_size=28, color=WHITE)
        box2.move_to(ORIGIN)
        label2.next_to(box2, UP, buff=0.15)
        val2.move_to(box2)

        self.play(Create(box2), Write(label2))
        self.play(FadeIn(val2, shift=DOWN))
        self.wait(0.3)

        # f-string
        box3 = RoundedRectangle(width=5, height=1.2, color=PURPLE, corner_radius=0.2)
        label3 = Text("result", font_size=28, color=PURPLE)
        val3 = Text('f"Hi {name}, {age}"', font_size=20, color=WHITE)
        box3.move_to(RIGHT * 3)
        label3.next_to(box3, UP, buff=0.15)
        val3.move_to(box3)

        self.play(Create(box3), Write(label3))

        # 动画：值从 box1, box2 飞入 box3
        val1_copy = val1.copy()
        val2_copy = val2.copy()
        self.play(
            val1_copy.animate.move_to(box3.get_left() + RIGHT * 1.2),
            val2_copy.animate.move_to(box3.get_right() + LEFT * 1),
        )
        self.play(FadeOut(val1_copy), FadeOut(val2_copy), FadeIn(val3))

        # 输出
        output = Text('→ "Hi Alice, 25"', font_size=24, color=GREEN_A).to_edge(DOWN)
        self.play(Write(output))
        self.wait(1)


class Level_1_2_ListSlice(Scene):
    """1-2 列表切片动画"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("列表切片 list[start:end]", font_size=36, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 创建数组可视化
        data = [0, 1, 2, 3, 4, 5]
        boxes = VGroup()
        labels = VGroup()
        indices = VGroup()

        for i, v in enumerate(data):
            box = Square(side_length=0.9, color=WHITE, stroke_width=2)
            box.move_to(LEFT * 2.5 + RIGHT * i * 1.0)
            val = Text(str(v), font_size=24, color=WHITE).move_to(box)
            idx = Text(str(i), font_size=16, color=GREY).next_to(box, DOWN, buff=0.1)
            boxes.add(box)
            labels.add(val)
            indices.add(idx)

        self.play(Create(boxes), Write(labels), Write(indices))
        self.wait(0.5)

        # 切片 [1:4]
        slice_text = Text("nums[1:4]", font_size=28, color=YELLOW).to_edge(DOWN, buff=1.5)
        self.play(Write(slice_text))

        # 高亮 index 1, 2, 3
        highlight = SurroundingRectangle(
            VGroup(boxes[1], boxes[2], boxes[3]),
            color=YELLOW, buff=0.05, corner_radius=0.1,
        )
        self.play(Create(highlight))

        result = Text("→ [1, 2, 3]", font_size=24, color=GREEN).to_edge(DOWN, buff=0.5)
        self.play(Write(result))
        self.wait(0.5)

        # 切片 [::-1] 反转
        self.play(FadeOut(highlight), FadeOut(slice_text), FadeOut(result))
        slice2 = Text("nums[::-1]", font_size=28, color=PURPLE).to_edge(DOWN, buff=1.5)
        self.play(Write(slice2))

        # 反转动画
        reversed_labels = VGroup()
        for i, v in enumerate(reversed(data)):
            t = Text(str(v), font_size=24, color=PURPLE_A)
            t.move_to(LEFT * 2.5 + RIGHT * i * 1.0)
            reversed_labels.add(t)

        self.play(
            *[Transform(labels[i], reversed_labels[5 - i]) for i in range(6)],
        )
        result2 = Text("→ [5, 4, 3, 2, 1, 0]", font_size=24, color=GREEN).to_edge(DOWN, buff=0.5)
        self.play(Write(result2))
        self.wait(1)


class Level_1_4_Functions(Scene):
    """1-4 函数：输入→处理→输出"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("函数 = 输入 → 处理 → 输出", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 函数盒子
        func_box = RoundedRectangle(width=4, height=2, color=BLUE, corner_radius=0.3)
        func_label = Text("def add(a, b)", font_size=22, color=BLUE_A)
        func_body = Text("return a + b", font_size=18, color=WHITE)
        func_label.move_to(func_box.get_top() + DOWN * 0.4)
        func_body.move_to(func_box)

        self.play(Create(func_box), Write(func_label), Write(func_body))

        # 输入箭头
        input_a = Text("a = 3", font_size=22, color=GREEN).next_to(func_box, LEFT, buff=1.5)
        input_b = Text("b = 5", font_size=22, color=GREEN).next_to(input_a, DOWN, buff=0.3)
        arrow_in = Arrow(input_a.get_right(), func_box.get_left(), color=GREEN, buff=0.2)

        self.play(Write(input_a), Write(input_b))
        self.play(Create(arrow_in))

        # 输出箭头
        output = Text("→ 8", font_size=28, color=YELLOW).next_to(func_box, RIGHT, buff=1.5)
        arrow_out = Arrow(func_box.get_right(), output.get_left(), color=YELLOW, buff=0.2)

        self.play(Create(arrow_out), Write(output))

        # 默认参数
        default_text = Text("默认参数: def greet(name, greeting='你好')", font_size=20, color=GREY_A).to_edge(DOWN)
        self.play(Write(default_text))
        self.wait(1)


class Level_2_5_Decorator(Scene):
    """2-5 装饰器：洋葱包裹模型"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("装饰器 = 函数包裹函数", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 核心函数（内圈）
        inner = Circle(radius=0.8, color=GREEN, fill_opacity=0.3)
        inner_label = Text("原函数\nsay_hello()", font_size=16, color=GREEN_A).move_to(inner)
        self.play(Create(inner), Write(inner_label))

        # 装饰器层（外圈）
        outer = Circle(radius=1.6, color=YELLOW, fill_opacity=0.15)
        outer_label = Text("@timer\n 计时逻辑", font_size=16, color=YELLOW_A)
        outer_label.move_to(outer.get_top() + DOWN * 0.3)
        self.play(Create(outer), Write(outer_label))

        # 更外层
        outer2 = Circle(radius=2.4, color=PURPLE, fill_opacity=0.1)
        outer2_label = Text("@log\n 日志记录", font_size=16, color=PURPLE_A)
        outer2_label.move_to(outer2.get_top() + DOWN * 0.3)
        self.play(Create(outer2), Write(outer2_label))

        # 请求流向
        arrow_in = Arrow(LEFT * 4, LEFT * 2.5, color=WHITE, buff=0.1)
        call_text = Text("调用", font_size=18, color=WHITE).next_to(arrow_in, UP, buff=0.1)
        self.play(Create(arrow_in), Write(call_text))

        # 解释
        explain = Text("@log → @timer → say_hello() → timer返回 → log返回",
                        font_size=16, color=GREY_A).to_edge(DOWN)
        self.play(Write(explain))
        self.wait(1)


class Level_6_1_VectorSpace(Scene):
    """6-1 向量空间：余弦相似度"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("向量空间 & 余弦相似度", font_size=32, color=BLUE).to_edge(UP)
        self.play(Write(title))

        # 坐标系
        axes = Axes(
            x_range=[0, 5, 1], y_range=[0, 5, 1],
            x_length=5, y_length=5,
            axis_config={"color": GREY},
        ).shift(LEFT * 1)
        self.play(Create(axes))

        # 向量 A: "国王"
        vec_a = axes.plot_line_graph([0, 4], [0, 3], add_vertex_dots=False,
                                     line_color=GREEN, stroke_width=3)
        arrow_a = Arrow(axes.c2p(0, 0), axes.c2p(4, 3), color=GREEN, buff=0)
        label_a = Text('"国王"', font_size=18, color=GREEN_A).next_to(axes.c2p(4, 3), RIGHT)
        self.play(Create(arrow_a), Write(label_a))

        # 向量 B: "女王"
        arrow_b = Arrow(axes.c2p(0, 0), axes.c2p(3.5, 3.5), color=YELLOW, buff=0)
        label_b = Text('"女王"', font_size=18, color=YELLOW_A).next_to(axes.c2p(3.5, 3.5), RIGHT)
        self.play(Create(arrow_b), Write(label_b))

        # 角度弧
        angle = Angle(arrow_a, arrow_b, radius=1.2, color=WHITE)
        angle_label = Text("θ 小\n→ 语义接近", font_size=14, color=WHITE)
        angle_label.next_to(angle, RIGHT)
        self.play(Create(angle), Write(angle_label))

        # 向量 C: "苹果" (方向差别大)
        arrow_c = Arrow(axes.c2p(0, 0), axes.c2p(1, 4.5), color=RED, buff=0)
        label_c = Text('"苹果"', font_size=18, color=RED_A).next_to(axes.c2p(1, 4.5), LEFT)
        self.play(Create(arrow_c), Write(label_c))

        # 公式（用 Text 替代 MathTex 避免 LaTeX 依赖）
        formula = Text("cos(θ) = A·B / (|A| × |B|)",
                          font_size=22, color=WHITE).to_edge(DOWN, buff=0.5)
        self.play(Write(formula))
        self.wait(1)


class Level_9_1_RAG(Scene):
    """9-1 RAG 完整 Pipeline"""
    def construct(self):
        self.camera.background_color = "#0a0e17"
        title = Text("RAG Pipeline", font_size=36, color=BLUE).to_edge(UP)
        self.play(Write(title))

        steps = [
            ("📄", "文档", GREEN),
            ("✂️", "分割", YELLOW),
            ("🔢", "Embedding", ORANGE),
            ("🗄️", "向量库", PURPLE),
            ("🔍", "检索", BLUE),
            ("🤖", "LLM 生成", RED),
        ]

        boxes = VGroup()
        arrows = VGroup()

        for i, (icon, label, color) in enumerate(steps):
            box = RoundedRectangle(width=1.8, height=1, color=color, corner_radius=0.15)
            box.move_to(LEFT * 4.5 + RIGHT * i * 1.9)
            txt = Text(f"{icon}\n{label}", font_size=14, color=color).move_to(box)
            grp = VGroup(box, txt)
            boxes.add(grp)

            if i > 0:
                prev_box = boxes[i - 1][0]
                arr = Arrow(prev_box.get_right(), box.get_left(), color=GREY, buff=0.05, stroke_width=2)
                arrows.add(arr)

        # 逐步显示
        self.play(FadeIn(boxes[0]))
        for i in range(1, len(steps)):
            self.play(Create(arrows[i - 1]), FadeIn(boxes[i]))
            self.wait(0.2)

        # 用户提问
        question = Text('用户: "Python 是什么?"', font_size=18, color=GREEN_A).to_edge(DOWN, buff=1)
        self.play(Write(question))

        # 高亮检索步骤
        hl = SurroundingRectangle(boxes[4], color=YELLOW, buff=0.1)
        self.play(Create(hl))

        answer = Text('→ 基于检索结果生成回答（非幻觉）', font_size=16, color=YELLOW_A).to_edge(DOWN, buff=0.3)
        self.play(Write(answer))
        self.wait(1)
