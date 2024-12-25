// 生成颜色css变量名
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
