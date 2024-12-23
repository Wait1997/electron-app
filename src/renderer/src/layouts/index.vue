<template>
  <div class="su-layout-wrapper">
    <div class="su-toggle-wrapper">
      <el-button @click="handleClick">Toggle Theme {{ isDark ? 'Dark' : 'Light' }}</el-button>
      <el-button @click="toggleLang">Toggle Language {{ locale }}</el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { isDark } from '@renderer/composables';
import { useToggle } from '@vueuse/core';
import { useLang } from '@renderer/hooks';

const { locale, setLang } = useLang();
const toggleDark = useToggle(isDark);

const handleClick = () => {
  console.log('toggle dark');
  toggleDark();
};
const toggleLang = () => {
  const lang = locale.value === 'zh-cn' ? 'en' : 'zh-cn';
  setLang(lang);
};
</script>

<style lang="scss" scoped>
.su-layout-wrapper {
  height: 100%;
  background-color: var(--s-color-bg-primary);

  .su-toggle-wrapper {
    display: inline-flex;
    align-items: center;
  }
}
</style>
