<template>
  <el-config-provider :locale="locale.value">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { onMounted } from 'vue';
import { userStore } from '@renderer/store';
import { storeToRefs } from 'pinia';
import { useEnv, useLang } from '@renderer/hooks';

// electron web
const env = useEnv();
const { locale } = useLang();

const { getUserNamne, tokenInfo } = storeToRefs(userStore());
// 输出当前用户信息
console.log(getUserNamne.value);
// 输出当前用户token
console.log(tokenInfo.value);

onMounted(() => {
  if (env.value === 'electron') {
    // 输出 0 ~ 10 的随机数
    window.api.randomInt(0, 10);
  }

  userStore().setUser('Hello World');

  // 测试接口 启用的本地服务
  // userStore().testApiGet();
  // userStore().testApiPost();
});
</script>
