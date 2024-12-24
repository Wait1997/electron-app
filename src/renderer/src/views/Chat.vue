<template>
  <div class="su-chat-wrapper">
    <div class="chat-content">
      <ChatRecordsArea />
      <ChatInputArea />
    </div>
  </div>
</template>

<script setup>
import ChatRecordsArea from '@renderer/components/SuChat/ChatRecordsArea.vue';
import ChatInputArea from '@renderer/components/SuChat/ChatInputArea.vue';
</script>

<style lang="scss" scoped>
.su-chat-wrapper {
  width: 100%;
  height: 100%;

  .chat-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
}
</style>
