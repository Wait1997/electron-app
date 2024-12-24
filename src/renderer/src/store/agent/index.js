import { defineStore } from 'pinia';

export const useAgent = defineStore('agent', {
  state: () => {
    return {
      agentList: [],
      selectedAgent: {},
      defaultAgentList: []
    };
  },
  getters: {
    getAgentList: (state) => {
      return state.agentList;
    },
    getSelectedAgent: (state) => {
      return state.selectedAgent;
    },
    getDefaultAgentList: (state) => {
      return state.defaultAgentList;
    },
    getAgent: (state) => {
      return (agentId) => {
        for (let agent of state.agentList) {
          if (agent.id === agentId) {
            return agent;
          }
        }
        for (let agent of state.defaultAgentList) {
          if (agent.id === agentId) {
            return agent;
          }
        }

        return null;
      };
    }
  },
  actions: {
    selectAgentById(agentId) {
      for (let agent of this.agentList) {
        if (agent.id === agentId) {
          this.selectedAgent = agent;
          return;
        }
      }
      for (let agent of this.defaultAgentList) {
        if (agent.id === agentId) {
          this.selectedAgent = agent;
          return;
        }
      }
    },
    selectAgent(val) {
      this.selectedAgent = val;
    },
    setDefaultAgentList(val) {
      this.defaultAgentList = val;
    },
    // 保存、修改
    updateSettingValue(params, editflag = true) {
      return new Promise((resolve, reject) => {
        window.axios
          .post('/agent/setting/save', params)
          .then((data) => {
            var d = data.data;
            if (d.success) {
              if (!editflag) {
                this.selectedAgent = null;
              }
              this.queryAgentList();
              resolve(d);
            } else {
              reject(d);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    updateSettingModel(sid, mid) {
      return new Promise((resolve, reject) => {
        for (let s of this.agentList) {
          if (s.id === sid) {
            if (!s.model) {
              s.model = {};
            }
            s.model.id = mid;
            break;
          }
        }

        for (let s of this.defaultAgentList) {
          if (s.id === sid) {
            if (!s.model) {
              s.model = {};
            }
            s.model.id = mid;
            break;
          }
        }

        resolve();
      });
    },
    // 删除
    deleteSetting(id) {
      let params = { id: id };
      return new Promise((resolve, reject) => {
        window.axios
          .post('/agent/setting/delete', params)
          .then((data) => {
            var d = data.data;
            if (d.success) {
              this.selectedAgent = null;
              this.queryAgentList();
              resolve(d);
            } else {
              reject(d);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // 修改助手信息
    changedBasicAgent(id, val) {
      let item = this.agentList.find((it) => it.id == id);
      let basic = item.basic;
      if (basic) {
        Object.assign(basic, val);
        this.updateSettingValue(item);
      }
    },
    // 修改角色设定
    changedRoleAgent(id, val) {
      let item = this.agentList.find((it) => it.id == id);
      let role = item.role;
      if (role) {
        Object.assign(role, val);
        this.updateSettingValue(item);
      }
    },
    // 修改聊天偏好
    changedChatAgent(id, val) {
      let item = this.agentList.find((it) => it.id == id);
      let chat = item.chat;
      if (chat) {
        Object.assign(chat, val);
        this.updateSettingValue(item);
      }
    },
    // 修改模型设置
    changedModelAgent(id, val) {
      let item = this.agentList.find((it) => it.id == id);
      let model = item.model;
      if (model) {
        Object.assign(model, val);
        this.updateSettingValue(item);
      }
    },
    // 查询默认助手的模型
    queryModelById(id) {
      let params = {
        id: id
      };
      return new Promise((resolve, reject) => {
        window.axios
          .post('/agent/setting/currentModel', params)
          .then((data) => {
            var d = data.data;
            if (d.success) {
              resolve(d);
            } else {
              reject(d);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    }
  },
  persist: {
    enabled: true
  }
});
