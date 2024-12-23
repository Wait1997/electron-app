import { useDark } from '@vueuse/core';

/**
 * useDark默认配置
 */
export const isDark = useDark({
  selector: 'html',
  storageKey: 'su-theme',
  storage: localStorage,
  valueDark: 'dark'
});
