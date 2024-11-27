<template>
  <img alt="logo" class="logo" src="../assets/electron.svg" />
  <div class="creator">{{ $t('layout.title') }}</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
    <div class="action">
      <el-button type="primary">Primary</el-button>
    </div>
  </div>
  <Versions />
</template>

<script setup>
// import { useI18n } from 'vue-i18n';
import Versions from '@renderer/components/Versions.vue';

// const { t, locale } = useI18n();

const ipcHandle = () => window.electron.ipcRenderer.send('ping');
</script>

<style lang="scss" scoped></style>
