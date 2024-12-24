<template>
  <div class="su-header-wrapper">
    <!-- 自定义标题栏 -->
    <slot name="header">
      <div class="su-header">
        <span class="text-slate-500 dark:text-slate-400">{{ props.title }}</span>
        <ToolBar />
      </div>
    </slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ToolBar from './ToolBar.vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.su-header-wrapper {
  width: 100%;
  height: 50px;
  -webkit-app-region: drag;
  user-select: none;

  .su-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-bottom: 0.5px solid var(--s-color-border-primary);
  }
}
</style>
