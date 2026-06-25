# Rongcan — Portfolio

黑白极简 Apple 风格个人作品集网站。

## 项目结构

```
portfolio/
├── index.html      # 主页面
├── style.css       # 样式（黑白极简 · Apple 风格）
├── script.js       # 交互逻辑（网格渲染 · Lightbox · 滚动动效）
├── images/         # 作品图片（14 张）
│   ├── work-01.jpg
│   ├── work-02.jpg
│   ├── ...
│   └── work-14.jpg
└── README.md
```

## 图片命名规则

| 分类 | 文件 | 数量 |
|------|------|------|
| UI 设计 | `work-01.jpg` ~ `work-05.jpg` | 5 |
| 网页设计 | `work-06.jpg` ~ `work-10.jpg` | 5 |
| 品牌视觉 | `work-11.jpg` ~ `work-14.jpg` | 4 |

支持 `.jpg` / `.png` / `.webp` 格式，修改 `script.js` 中 `categories` 数组的 `src` 路径即可。

## 部署到 GitHub Pages

### 方法一：直接推送

```bash
cd portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

然后在 GitHub 仓库 **Settings → Pages** 中：
- Source: **Deploy from a branch**
- Branch: `main` → `/ (root)` → Save

### 方法二：GitHub Actions

创建 `.github/workflows/deploy.yml`（可选，静态站点无需 CI）。

## 自定义

1. **个人信息**：编辑 `index.html` 中的邮箱、简介、页脚
2. **分类文案**：编辑 `index.html` 中每个 `<section>` 的 `.category-desc`
3. **图片路径**：编辑 `script.js` 中的 `categories` 数组
4. **配色**：编辑 `style.css` 中的 `:root` 变量

## 技术栈

- 纯 HTML / CSS / JavaScript
- 无框架、无依赖
- 响应式（桌面 · 平板 · 手机）
- 系统字体栈（SF Pro / -apple-system）

## License

All rights reserved.
