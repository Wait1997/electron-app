# electron-app

An Electron application with Vue

## 使用 `electron-vite` 构建

- [electron-vite](https://cn.electron-vite.org/guide/) - 基于 Vite 的 Electron 开发工具
- 项目配置在根目录 `electron.vite.config.mjs` 中，可以根据需要进行配置
- eslint 配置在根目录 `eslintrc.cjs` 中，可以根据需要进行配置
- prettier 配置在根目录 `prettierrc.yaml` 中，可以根据需要进行配置

## `.vscode` 配置

- settings.json 中配置与本项目相关的配置 覆盖默认系统的配置
```json
# ctrl + s 自动格式化代码 根据 eslint、prettier 规则

"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll": "explicit"
}
```
- launch.json 设置 debug 配置

## 启动项目

> 使用npm 或 pnpm 或 yarn 安装依赖

### 安装依赖 Install

```shell
pnpm install
```

### 开发模式 Development

```shell
pnpm dev
```

### 生产模式 Build

```shell
# For windows
pnpm build:win

# For macOS
pnpm build:mac

# For Linux
pnpm build:linux
```
## `tailwindcss` 配置
> 使用 taillwindcss 进行样式配置，tailwindcss.config.js 中设置自定义样式以及默认样式覆盖，配合全局自定义主题色使用

```js
function genSimilarColorsName(brandName) {
  return {
    lighter: `var(--s-color-${brandName}-lighter)`,
    light: `var(--s-color-${brandName}-light)`,
    normal: `var(--s-color-${brandName})`,
    dark: `var(--s-color-${brandName}-dark)`,
    darker: `var(--s-color-${brandName}-darker)`
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/src/**/*.{vue,js,ts,jsx,tsx}', './src/renderer/index.html'],
  theme: {
    extend: {
      colors: {
        // 自定义colors 优先级最高
        primary: genSimilarColorsName('primary'),
        info: genSimilarColorsName('info'),
        success: genSimilarColorsName('success'),
        warning: genSimilarColorsName('warning'),
        danger: genSimilarColorsName('danger'),
        'text-primary': 'var(--s-color-text-primary)',
        'bg-primary': 'var(--s-color-bg-primary)',
        'border-primary': 'var(--s-color-border-primary)'
      },
      fontFamily: {
        inter: 'var(--s-font-family)'
      },
      fontSize: {
        base: ['15px', '24px'],
        'base-strong': [
          '15px',
          {
            lineHeight: '24px',
            fontWeight: '500',
            fontFamily: 'var(--s-font-family)'
          }
        ],
        'base-xs': [
          '12px',
          {
            lineHeight: '18px',
            fontFamily: 'var(--s-font-family)'
          }
        ],
        'base-xs-strong': [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '500',
            fontFamily: 'var(--s-font-family)'
          }
        ]
      }
    }
  },
  plugins: [],
  darkMode: 'selector' // or 'media'
};
```
