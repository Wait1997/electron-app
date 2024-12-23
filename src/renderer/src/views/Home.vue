<template>
  <div class="su-home-wrapper">
    <el-button type="primary" @click="handleClick">Primary</el-button>
    <div class="su-text">首页，根据主题改变颜色</div>
  </div>
</template>

<script setup>
import { useEnv } from '@renderer/hooks/useEnv';
// import { useI18n } from 'vue-i18n';

// const { t, locale } = useI18n();

// electron or web
const env = useEnv();

const handleClick = () => {
  if (env.value === 'electron') {
    window.electron.ipcRenderer.send('ping');
  } else {
    console.log('Hello World');
  }
};
</script>

<style lang="scss" scoped>
.su-home-wrapper {
  width: 100%;

  .su-text {
    color: var(--s-color-text-primary);
  }
}
</style>
