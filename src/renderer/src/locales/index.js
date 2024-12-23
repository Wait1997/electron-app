import { createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh-CN';

const messages = {
  en,
  zh
};

// 获取浏览器语言
const language = (navigator.language ?? 'zh-cn').toLocaleLowerCase();
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') ?? language ?? 'zh-cn',
  messages
});

export default i18n;
