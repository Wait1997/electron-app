import { defineStore } from 'pinia';
import {
  apiCreateSession,
  apiDeleteSession,
  apiQueryRecordsList,
  apiQuerySessionsBySettingId
} from '@renderer/services';

export const useChat = defineStore('chat', {
  state: () => {
    return {
      sessionList: [],
      currentRecords: [],
      currentSessionId: 0,
      currentModel: 1
    };
  },
  getters: {
    getSessionList: (state) => {
      // 会话列表
      return state.sessionList;
    },
    getCurrentSessionId: (state) => {
      return state.currentSessionId;
    },
    getCurrentRecords: (state) => {
      return state.currentRecords;
    },
    getCurrentModel: (state) => {
      return state.currentModel;
    }
  },
  actions: {
    hasPendingResp() {
      for (const r of this.currentRecords) {
        if (r.pending && r.sender === 2) {
          return true;
        }
      }
      return false;
    },
    setCurrentSessionId(val) {
      this.currentSessionId = val;
    },
    // 创建新会话，参数settingid
    async createSession(settingid, name = '') {
      const params = {
        settingId: settingid
      };
      if (name) {
        params.title = name;
      }
      try {
        const res = await apiCreateSession(params);
        this.currentRecords = [];
        return res?.data?.id;
      } catch (error) {
        return error;
      }
    },
    // 删除会话
    async deleteSession(sessionId) {
      const params = {
        id: sessionId
      };
      try {
        const res = await apiDeleteSession(params);
        return res;
      } catch (error) {
        return error;
      }
    },
    // 根据配置id查询会话记录
    querySesstionsBySettingId(settingId) {
      const params = {
        settingId: settingId
      };
      return new Promise((resolve, reject) => {
        apiQuerySessionsBySettingId(params)
          .then((res) => {
            this.sessionList = res.data ? res.data : [];
            if (this.sessionList.length > 0) {
              this.setCurrentSessionId(this.sessionList[0].id);
            } else {
              // 创建会话
              this.currentSessionId = 0;
              this.currentRecords = [];
              this.createSession(settingId);
            }
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 根据会话id查询聊天记录
    async queryRecordsList(sessionId) {
      if (sessionId > 0) {
        const params = {
          sessionId: sessionId
        };
        try {
          const res = await apiQueryRecordsList(params);
          this.currentRecords = res.data;
        } catch (error) {
          return error;
        }
      }
    }
  },
  persist: true
});
