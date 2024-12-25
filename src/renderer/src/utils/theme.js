// isDark 已经配置 直接导入
import { merge } from 'lodash-es';
import { genMixColor } from './gen-color';
import { isDark } from '@renderer/composables';
import { useStorage } from '@renderer/hooks';

const THEME_KEY = 'theme-color';

// 默认主题配置
export const defaultThemeConfig = {
  colors: {
    primary: '#409eff',
    info: '#909399',
    warning: '#e6a23c',
    danger: '#f56c6c',
    error: '#f56c6c',
    success: '#67c23a'
  }
};

// 设置css变量
function setStyleProperty(propName, value) {
  document.documentElement.style.setProperty(propName, value);
}

function updateThemeColorVar({ colors }) {
  // 遍历当前主题色，生成混合色，并更新到css变量（tailwind + elementPlus）
  for (const brand in colors) {
    updateBrandExtendColorsVar(colors[brand], brand);
  }

  function updateBrandExtendColorsVar(color, name) {
    let { DEFAULT, dark, light } = genMixColor(color, isDark.value);

    // 每种主题色由浅到深分为五个阶梯以供开发者使用
    setStyleProperty(`--s-color-${name}-lighter`, light[5]);
    setStyleProperty(`--s-color-${name}-light`, light[3]);
    setStyleProperty(`--s-color-${name}`, DEFAULT);
    setStyleProperty(`--s-color-${name}-dark`, dark[2]);
    setStyleProperty(`--s-color-${name}-darker`, dark[4]);

    // elementPlus主题色更新
    setStyleProperty(`--el-color-${name}`, DEFAULT);
    setStyleProperty(`--el-color-${name}-dark-2`, dark[2]);
    setStyleProperty(`--el-color-${name}-light-3`, light[3]);
    setStyleProperty(`--el-color-${name}-light-5`, light[5]);
    setStyleProperty(`--el-color-${name}-light-7`, light[7]);
    setStyleProperty(`--el-color-${name}-light-8`, light[8]);
    setStyleProperty(`--el-color-${name}-light-9`, light[9]);
  }
}

// 获取主题对象
export const getTheme = () => {
  const theme = useStorage(THEME_KEY, { defaultValue: defaultThemeConfig, readonly: true });
  return theme.value;
};

export const setTheme = (data = defaultThemeConfig) => {
  const oldTheme = getTheme();

  // 将传入配置与旧的主题合并，以填补缺省的值
  data = merge(oldTheme, data || {});

  // 将缓存到浏览器
  const theme = useStorage(THEME_KEY, { defaultValue: data });
  theme.value = data;

  // 将主题更新到css变量中，使之生效
  updateThemeColorVar(data);
};
