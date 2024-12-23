import { ref, watch } from 'vue';

// 获取当前语言
export function useLang() {
  const language = (navigator.language ?? 'zh-cn').toLocaleLowerCase();
  const lang = ref(localStorage.getItem('lang') ?? language ?? 'zh-cn');

  watch(lang, (val) => {
    localStorage.setItem('lang', val);
  });

  return lang;
}
