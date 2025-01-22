<template>
  <div ref="dragglePanel" class="draggable-panel" :style="panelStyle">
    <slot></slot>
    <div
      class="resizer"
      :class="[props.direction, props.position]"
      @mousedown="startResizing"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emits = defineEmits(['onResize']);

const panelWidth = defineModel('width', { type: Number, default: 250 });
const panelHeight = defineModel('height', { type: Number, default: 200 });

const props = defineProps({
  minWidth: {
    type: Number,
    default: 230
  },
  maxWidth: {
    type: Number,
    default: 400
  },
  minHeight: {
    type: Number,
    default: 160
  },
  maxHeight: {
    type: Number,
    default: 520
  },
  // vertical | horizontal
  direction: {
    type: String,
    default: 'vertical'
  },
  // left | right
  position: {
    type: String,
    default: 'right'
  }
});

const panelStyle = computed(() => {
  // 水平方向
  if (props.direction === 'horizontal') {
    return {
      height: `${panelHeight.value}px`,
      minHeight: `${props.minHeight}px`,
      maxHeight: `${props.maxHeight}px`
    };
  }
  // 垂直方向
  return {
    width: `${panelWidth.value}px`,
    minWidth: `${props.minWidth}px`,
    maxWidth: `${props.maxWidth}px`
  };
});

const dragglePanel = ref(null);

// 是否正在调整大小
const isResizing = ref(false);
// 鼠标按下的初始位置
const start = ref(0);
// 面板初始宽度
const startWidth = ref(panelWidth.value);
// 面板初始高度
const startHeight = ref(panelHeight.value);

const startResizing = (event) => {
  if (event.currentTarget === event.target) {
    isResizing.value = true;
    // const rect = dragglePanel.value.getBoundingClientRect();

    if (props.direction === 'horizontal') {
      start.value = event.clientY;
      startHeight.value = panelHeight.value;
    } else {
      // 垂直方向
      start.value = event.clientX;
      startWidth.value = panelWidth.value;
    }

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  }
};

// 调整宽度
const resize = (event) => {
  if (isResizing.value) {
    // 水平方向
    if (props.direction === 'horizontal') {
      const delta = -(event.clientY - start.value);
      console.log(delta);
      console.log('startHeight.value', startHeight.value);

      if (startHeight.value + delta <= props.minHeight) {
        panelHeight.value = props.minHeight;
      } else if (startHeight.value + delta >= props.maxHeight) {
        panelHeight.value = props.maxHeight;
      } else {
        panelHeight.value = startHeight.value + delta;
      }
      console.log(panelHeight.value);
      emits('onResize', panelHeight.value);
    } else {
      // 垂直方向
      const delta = event.clientX - start.value;

      if (startWidth.value + delta <= props.minWidth) {
        panelWidth.value = props.minWidth;
      } else if (startWidth.value + delta >= props.maxWidth) {
        panelWidth.value = props.maxWidth;
      } else {
        panelWidth.value = startWidth.value + delta;
      }

      console.log('panelWidth.value', panelWidth.value);

      emits('onResize', panelWidth.value);
    }
  }
};

// 停止调整大小
const stopResizing = () => {
  if (isResizing.value) {
    isResizing.value = false;
  }
};
</script>

<style lang="scss" scoped>
.draggable-panel {
  position: relative;
  height: 100%;
  // border-right: 1px solid #e3e3e3;

  .resizer {
    position: absolute;
    top: 0;
    right: -5px;
    width: 10px;
    height: 100%;
    user-select: none;

    &.vertical {
      top: 0;
      right: -5px;
      width: 10px;
      height: 100%;
      cursor: ew-resize;

      &::before {
        content: '';
        position: absolute;
        z-index: 50;
        inset-inline-end: 50%;
        height: 100%;
        width: 1px;
        // border: 1px solid #e3e3e3;
        background-color: #e3e3e3;
        transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }

    &.horizontal {
      top: -5px;
      right: 0;
      width: 100%;
      height: 10px;
      cursor: ns-resize;

      &::before {
        content: '';
        position: absolute;
        z-index: 50;
        inset-block-start: 50%;
        width: 100%;
        height: 1px;
        background-color: #e3e3e3;
        // border: 1px solid #e3e3e3;
        transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }
  }
}
</style>
