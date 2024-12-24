<template>
  <div class="modelSelect">
    <el-tooltip
      effect="dark"
      :offset="5"
      :show-after="300"
      :content="$t('agent.model')"
      placement="bottom"
    >
      <el-dropdown placement="top" trigger="click">
        <div class="iconsClass">
          <Brain :size="20" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in getModelList"
              :key="item.id"
              @click="changeModel(item)"
            >
              <component :is="item.source === 'cloud' ? Cloudy : Laptop" style="scale: 0.8" />
              &nbsp;
              <span
                v-if="
                  currentAgent.model && currentAgent.model.id && item.id === currentAgent.model.id
                "
                style="color: #419eff"
                >{{ item.name }}</span
              >
              <span v-else>{{ item.name }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script setup>
import { computed, onMounted, toRefs, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { Brain, Cloudy, Laptop } from 'lucide-vue-next';
import { useChat, useModel, useAgent } from '@renderer/store';

const { t } = useI18n();

const props = defineProps({
  agentId: Number
});
const { agentId } = toRefs(props);

const { getModelList } = storeToRefs(useModel());

// 设置ai专家模型
const changeModel = (item) => {
  useChat()
    .editAgentModel(agentId.value, item.id)
    .then(() => {
      useAgent().updateSettingModel(agentId.value, item.id);
      ElMessage.success(t('chat.modelSwitchingSuccess'));
    })
    .catch((e) => {
      ElMessage.error(e.message);
    });
};

//根据agentId获取当前agent
const currentAgent = computed({
  get: () => {
    let agent = useAgent().getAgent(agentId.value);
    return agent ? agent : {};
  },
  set: (val) => {
    let agent = useAgent().getAgent(agentId.value);
    agent.value = val;
  }
});

// 切换不同配置
watch(currentAgent, (nv) => {
  useAgent()
    .queryModelById(nv.id)
    .then((d) => {
      nv.model = d.data;
    })
    .catch((e) => {
      console.log(e);
    });
});

onMounted(() => {
  useModel().queryModelList();

  if (currentAgent.value) {
    useAgent()
      .queryModelById(agentId.value)
      .then((d) => {
        currentAgent.value.model = d.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
});
</script>

<style lang="scss" scoped>
.modelSelect {
  :deep(.iconsClass) {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    height: 36px;
    width: 36px;
    color: #999;
    margin: 0 4px;
    cursor: pointer;

    &:hover {
      color: #080808;
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
