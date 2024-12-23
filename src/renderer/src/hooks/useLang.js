import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

// 获取当前语言
export function useLang() {
  const { locale } = useI18n();

  const setLang = (lang) => {
    locale.value = lang;
  };

  watch(locale, (val) => {
    localStorage.setItem('lang', val);
  });

  return { locale, setLang };
}
