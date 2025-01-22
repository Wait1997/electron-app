<template>
  <el-input
    v-model="inputValue"
    class="su-textarea"
    type="textarea"
    :maxlength="props.maxlength"
    :rows="props.rows"
    :autosize="props.autosize"
    resize="none"
    placeholder="Please input"
  />
</template>

<script setup>
const inputValue = defineModel({ type: String });

const props = defineProps({
  rows: {
    type: Number,
    default: 2
  },
  autosize: {
    type: [Boolean, Object],
    default: false
  },
  maxlength: {
    type: [String, Number]
  }
});
</script>

<style lang="scss" scoped>
.su-textarea {
  height: 100%;

  :deep(.el-textarea__inner) {
    border: none;
    border-radius: 0;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    padding-block: 0;
    padding-inline: 24px;
    max-width: 100%;
    height: 100%;
  }
}
</style>
