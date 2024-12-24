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

const { accessToken } = storeToRefs(userStore());
// 输出当前用户token
console.log(accessToken.value);

onMounted(() => {
  if (env.value === 'electron') {
    // 输出 0 ~ 10 的随机数
    window.api.randomInt(0, 10);
  }

  userStore().setToken('token');
});
</script>
