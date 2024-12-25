<template>
  <div class="w-full h-full flex flex-col bg-white">
    <header class="bg-white flex-shrink-0 h-16 px-6 flex justify-between items-center">
      <p class="text-black text-xl font-bold">动态主题色方案</p>
      <el-button type="primary" :icon="Operation" circle @click="settingsModalRef?.openModal()" />
      <settings-modal ref="settingsModalRef" />
    </header>
    <article :class="`flex-1 overflow-y-auto p-6`">
      <element-box />
    </article>
    <footer class="bg-black flex flex-col flex-shrink-0 h-40 p-6">
      <span
        class="bg-gradient-to-r from-primary-lighter to-primary-darker bg-clip-text text-transparent text-3xl font-bold"
      >
        我是渐变色一
      </span>
      <span class="bg-clip-text text-primary-dark text-3xl font-bold"> 我是渐变色二 </span>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Operation } from '@element-plus/icons-vue';
import ElementBox from '@renderer/components/element-box.vue';
import SettingsModal from '@renderer/components/settings-modal.vue';

const settingsModalRef = ref();
</script>

<style lang="scss" scoped></style>
