<template>
  <div v-if="tooltar === 'win'" class="su-win-toolbar">
    <div class="toolbar">
      <div class="iconClass" @click="minWindow()">
        <Minus />
      </div>
      <div class="iconClass" @click="maxWindow()">
        <Maximize />
      </div>
      <div class="iconClass" @click="closeWindow()">
        <X />
      </div>
    </div>
  </div>
  <div v-if="tooltar === 'mac'" class="su-mac-tooltar">mac</div>
</template>

<script setup>
import { computed } from 'vue';
import { Minus, Maximize, X } from 'lucide-vue-next';
import { useEnv, usePlatform } from '@renderer/hooks';

// electron web
const env = useEnv();
// win32 darwin linux
const platform = usePlatform();

const tooltar = computed(() => {
  if (env.value === 'electron') {
    return platform.value === 'win32' ? 'win' : 'mac';
  }
  return 'web';
});

const minWindow = () => {
  window.api.minimize();
};

const maxWindow = () => {
  window.api.maximize();
};

const closeWindow = () => {
  window.api.closeWindow();
};
</script>

<style lang="scss" scoped>
.su-win-toolbar {
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  display: flex;
  align-items: center;
  -webkit-app-region: no-drag;

  .toolbar {
    display: inline-flex;
    align-items: center;
    padding: 5px;

    .iconClass {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: var(--s-radius-xxs);
      color: #999;
      cursor: pointer;

      &:hover {
        color: #080808;
        background-color: rgba(0, 0, 0, 0.06);
      }

      &:not(:last-child) {
        margin-right: 5px;
      }

      &:last-child:hover {
        color: #ffffff;
        background-color: #ff5f5fe1;
      }
    }
  }
}
</style>
