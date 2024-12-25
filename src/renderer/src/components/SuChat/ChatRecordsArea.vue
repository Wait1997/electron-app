<template>
  <div class="chat-records-area records">
    <div class="inline-flex items-center flex-wrap gap-[8px] bg-black">
      <span class="text-white">聊天记录</span>
      <span class="text-[#eee]">聊天记录</span>
    </div>
    <div class="custom-card py-[5px] px-[5px]">
      <span>标签1</span>
    </div>
    <div class="flex gap-[10px] bg-white p-[10px]">
      <el-tag type="primary">Tag 1</el-tag>
      <el-tag type="success">Tag 2</el-tag>
      <el-tag type="info">Tag 3</el-tag>
      <el-tag type="warning">Tag 4</el-tag>
      <el-tag type="danger">Tag 5</el-tag>
    </div>
  </div>
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

  .custom-card {
    color: var(--s-color-text-primary);
    background-color: var(--s-color-primary);
  }
}
</style>
