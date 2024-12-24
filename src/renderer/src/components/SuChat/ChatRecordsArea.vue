<template>
  <div class="chat-records-area records">聊天记录</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.chat-records-area {
  flex: 1 1 0%;
  overflow: hidden auto;

  &.records {
    display: flex;
    flex-direction: column;
  }
}
</style>
