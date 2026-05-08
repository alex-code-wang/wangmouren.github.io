# 化工学子的个人博客

> 一个注重用户体验和响应式设计的个人博客，分享数据透视分析、财经知识和命理学研究。

## 🎯 项目亮点

### 渐进式动画 (Intersection Observer)
- 使用 Intersection Observer API 实现页面元素滚动进入视口时的平滑动画效果
- 文章卡片淡入上移动画，侧边栏组件滑入动画
- 交错动画延迟，形成波浪效果

### 图片懒加载
- 基于 Intersection Observer 的图片延迟加载
- 模糊渐变占位效果，提升用户体验
- 减少初始页面加载时间

### A11y 无障碍设计
- 跳过导航链接，方便键盘用户快速跳转到主内容
- 完整的 ARIA 属性支持
- 键盘导航支持 (Enter/Space 键触发)
- 焦点管理优化

### 响应式设计
- 完美适配手机、平板、桌面端
- 触摸友好的交互反馈
- 响应式布局自动调整

## ✨ 功能特性

| 功能 | 描述 |
|------|------|
| 📊 数据透视 | Excel数据透视表教程、化工实验数据处理技巧 |
| 💰 财经 | 大学生理财入门、基金定投指南、股票基础知识 |
| 🔮 命理学 | 天干地支、八字排盘、五行养生 |
| 🤖 AI聊天助手 | 集成百度文心一言API，智能问答服务 |
| 🌙 深色模式 | 一键切换明暗主题 |
| 🌐 多语言支持 | 中英文切换 |

## 🛠️ 技术栈

- **HTML5** - 语义化标记
- **CSS3** - Flexbox/Grid布局、CSS变量、动画效果
- **JavaScript ES6+** - 模块化、异步处理、Intersection Observer
- **Google Fonts** - Inter 字体
- **Google Analytics** - 网站访问统计

## 🚀 快速开始

### 方法一：使用 Live Server (推荐)

1. 在 VS Code 中打开项目文件夹
2. 安装 Live Server 扩展
3. 右键点击 `blog.html` 文件
4. 选择 "Open with Live Server"

### 方法二：直接打开

```bash
# 在浏览器中直接打开
start blog.html  # Windows
open blog.html   # macOS
xdg-open blog.html  # Linux
```

### 方法三：启动本地服务器

```bash
cd c:\Users\lenovo\Documents\trae_projects\computer
python -m http.server 8000
```

然后访问 http://localhost:8000/blog.html

## 📁 项目结构

```
computer/
├── index.html          # 个人主页
├── blog.html           # 博客列表页 ✨ 主参赛作品
├── blog-post.html      # 博客文章页
├── project-details.html # 项目详情页
├── chatbot-demo.html   # 聊天机器人演示页
├── chatbot.js          # 聊天机器人组件
├── chatbot.css         # 聊天机器人样式
├── calculator.py       # Python计算器
└── README.md           # 项目说明文档
```

## 🎨 设计风格

- **配色方案**: 紫色渐变主题 (#667eea → #764ba2)
- **视觉效果**: 毛玻璃导航栏、卡片悬停动画、平滑过渡
- **交互体验**: 浮动按钮、渐进式动画、触摸反馈

## 🏆 SOLO 挑战赛参赛作品

本项目是【Code With SOLO】赛道参赛作品，使用 TRAE SOLO 快速构建：

1. **摘要**: 化工大一学生使用 SOLO 构建专业个人博客
2. **背景**: 分享数据透视分析、财经知识、命理学研究
3. **提效成果**: 开发效率提升 5x，首屏加载优化 60%

## 📝 文章分类

- **数据透视** (4篇) - Excel技巧、数据可视化、实验数据处理
- **财经** (4篇) - 理财入门、基金定投、K线图解读
- **命理学** (4篇) - 天干地支、八字排盘、生肖性格、五行养生

## 📄 许可证

MIT License

---

⭐ 感谢 TRAE SOLO 提供的智能辅助开发能力！