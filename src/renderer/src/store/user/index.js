import { ref } from 'vue';
import { defineStore } from 'pinia';

// 获取用户相关的信息
export const userStore = defineStore(
  'user',
  () => {
    const accessToken = ref('');
    const userInfo = ref({});

    const setToken = (token) => {
      accessToken.value = token;
    };

    return { accessToken, userInfo, setToken };
  },
  {
    persist: true
  }
);
