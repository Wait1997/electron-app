<template>
  <div class="chat-input-area" :style="{ 'min-height': `${props.minHeight}px` }">
    <div class="optionsClass">
      <div class="leftClass">
        <!-- <ModelSelect :agent-id="currentAgent.id" />
        <FileSelect @file-selected="onUploadFileSelected" /> -->
      </div>
    </div>
    <div>
      <el-input
        v-model="inputValue"
        type="textarea"
        :maxlength="8192"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="Please input"
      />
    </div>
    <div>
      <button @click="sendChatMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const props = defineProps({
  minHeight: {
    type: Number,
    default: 160
  }
});

const inputValue = ref('');

const sendChatMessage = useDebounceFn(() => {
  console.log('send chat message');
}, 300);
</script>

<style lang="scss" scoped>
.chat-input-area {
  display: flex;
  flex-direction: column;
  padding: 12px 0 16px;
  height: 200px;
  gap: 8px;
}
</style>
