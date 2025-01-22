<template>
  <div class="draggable-panel-wrapper">
    <slot></slot>
    <DraggablePanel
      v-model:height="panelHeight"
      :min-height="props.minHeight"
      :max-height="props.maxHeight"
      direction="horizontal"
    >
      <div class="chat-input-area">
        <div class="flex items-center jutify-between shrink-0 grow-0 px-[16px] w-full">
          <div class="flex items-center flex-auto">
            <!-- <ModelSelect :agent-id="currentAgent.id" /> -->
            <!-- <FileSelect @file-selected="onUploadFileSelected" /> -->
          </div>
          <div class="flex items-center gap-[4px] shrink-1 grow-0 basis-0">
            <el-tooltip
              :offset="5"
              :show-after="300"
              effect="dark"
              :content="$t('agent.clearSession')"
              placement="bottom"
            >
              <div class="inline-flex items-center justify-center w-[36px] h-[36px] cursor-pointer">
                <MessageSquarePlus style="width: 20px" />
              </div>
            </el-tooltip>
            <el-tooltip
              :offset="5"
              :show-after="300"
              effect="dark"
              :content="$t('agent.expandInput')"
              placement="bottom"
            >
              <div class="inline-flex items-center justify-center w-[36px] h-[36px] cursor-pointer">
                <MessageSquarePlus style="width: 20px" />
              </div>
            </el-tooltip>
          </div>
        </div>
        <TextArea v-model="inputValue" :rows="2" :autosize="false" />
        <div class="inline-flex items-center justify-end px-[24px]">
          <div class="mr-[12px]"></div>
          <div class="flex items-center gap-[8px]">
            <el-tooltip
              :offset="5"
              :show-after="300"
              effect="dark"
              :content="$t('agent.newSession')"
              placement="top"
            >
              <div
                class="inline-flex items-center justify-center w-[36px] h-[36px] bg-[#fff] rounded-[5px] cursor-pointer"
                @click="newChat"
              >
                <MessageSquarePlus style="width: 16px" />
              </div>
            </el-tooltip>
            <el-button type="primary" @click="sendChatMessage">Send</el-button>
          </div>
        </div>
      </div>
    </DraggablePanel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { useAgent } from '@renderer/store';
import { useDebounceFn } from '@vueuse/core';
import TextArea from './TextArea.vue';
import ModelSelect from './ModelSelect.vue';
import { MessageSquarePlus } from 'lucide-vue-next';
import DraggablePanel from '@renderer/components/DraggablePanel/index.vue';

const props = defineProps({
  minHeight: {
    type: Number,
    default: 160
  },
  maxHeight: {
    type: Number,
    default: 520
  }
});

const inputValue = ref('');

const panelHeight = ref(200);

const sendChatMessage = useDebounceFn(() => {
  console.log('send chat message');
}, 300);
</script>

<style lang="scss" scoped>
.draggable-panel-wrapper {
  // border-top: 1px solid var(--s-color-border-primary);

  .chat-input-area {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px 0 16px;
    // height: 200px;
    gap: 8px;

    :deep(.el-button) {
      height: 36px;
    }
  }
}
</style>
