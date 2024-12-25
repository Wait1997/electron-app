<template>
  <div class="su-layout-wrapper">
    <SUAsider>
      <div class="su-toggle-wrapper">
        <el-space direction="vertical">
          <el-button @click="handleClick">Toggle Theme {{ isDark ? 'Dark' : 'Light' }}</el-button>
          <el-button @click="toggleLang">Toggle Language {{ locale }}</el-button>
          <el-select v-model="value" placeholder="Select" style="width: 150px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-space>
      </div>
    </SUAsider>
    <div class="su-content-container">
      <SuHeader :title="$t('layout.header.title')" />
      <div class="su-content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { isDark } from '@renderer/composables';
import { useToggle } from '@vueuse/core';
import { useLang } from '@renderer/hooks';
import SuHeader from '@renderer/components/SuHeader/index.vue';
import SUAsider from '@renderer/components/SuAsider/index.vue';

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

const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
];
</script>

<style lang="scss" scoped>
.su-layout-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: var(--s-color-bg-primary);

  .su-content-container {
    display: flex;
    flex-direction: column;
    width: calc(100% - 200px);
    height: 100%;

    .su-content-wrapper {
      width: 100%;
      height: calc(100% - 50px);
    }
  }

  .su-toggle-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
}
</style>
