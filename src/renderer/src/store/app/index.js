import { defineStore } from 'pinia';
import { ref } from 'vue';

// app相关的属性配置
export const useApp = defineStore(
  'app',
  () => {
    // on: 打开 off: 关闭
    const leftPanel = ref('on');
    // 左侧面板默认的宽度
    const leftWidth = ref(200);

    const setLeftPanel = (status) => {
      leftPanel.value = status;
    };

    return { leftPanel, leftWidth, setLeftPanel };
  },
  { persist: true }
);
