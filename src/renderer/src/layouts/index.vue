<template>
  <div>
    <el-button @click="handleClick">Toggle Dark</el-button>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const handleClick = () => {
  console.log('toggle dark');
  toggleDark();
};
</script>

<style lang="scss" scoped></style>
