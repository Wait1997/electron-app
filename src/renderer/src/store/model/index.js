import { defineStore } from 'pinia';

export const useModel = defineStore('model', {
  state: () => {
    return {
      modelList: [],
      availableModelList: [], //模型类型——文本生成模型
      modelAllList: [], //通用模型列表
      availableVectorModelList: [], //模型类型——文本向量化模型
      vectorModelList: [], //模型类型——向量模型
      defaultModel: null
    };
  },
  getters: {
    getModelList: (state) => {
      return state.modelList;
    },
    getAvailableModelList: (state) => {
      //模型类型——文本生成模型
      return state.availableModelList;
    },
    getModelAllList: (state) => {
      //通用模型列表
      return state.modelAllList;
    },
    getAvailableVectorModelList: (state) => {
      //模型类型——文本向量化模型
      return state.availableVectorModelList;
    },
    getVectorModelList: (state) => {
      return state.vectorModelList;
    },
    getDefaultModel: (state) => {
      return state.defaultModel;
    }
  },
  actions: {
    // 查询模型列表
    queryModelList() {
      let url = '/model/availableChatModels';
      return new Promise((resolve, reject) => {
        window.axios
          .post(url)
          .then((d) => {
            let res = d.data;
            this.modelList = res.data;
            if (this.modelList.length > 0) {
              let modelItem = this.modelList.find((it) => it.default == true);
              if (modelItem) {
                this.defaultModel = modelItem;
              }
            }
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // 文本生成模型
    queryAvailableModel() {
      return new Promise((resolve, reject) => {
        window.axios
          .post('/model/supportedChatModels')
          .then((data) => {
            let d = data.data;
            if (d.success) {
              this.availableModelList = d.data;
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
    // 文本向量化模型
    queryAvailableVectorModel() {
      return new Promise((resolve, reject) => {
        window.axios
          .post('/model/supportedVectorModels')
          .then((data) => {
            let d = data.data;
            if (d.success) {
              this.availableVectorModelList = d.data;
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
    // 查询通用模型列表数据
    queryModelAllList() {
      return new Promise((resolve, reject) => {
        window.axios
          .post('/model/availableAllModels')
          .then((data) => {
            let d = data.data;
            if (d.success) {
              this.modelAllList = d.data;
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
    // 向量模型
    queryVectorModel() {
      return new Promise((resolve, reject) => {
        window.axios
          .post('/model/availableVectorModels')
          .then((data) => {
            var d = data.data;
            if (d.success) {
              this.vectorModelList = d.data;
              resolve(d);
            } else {
              reject(d.msg);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    //添加保存模型
    addModelAll(params) {
      return new Promise((resolve, reject) => {
        window.axios
          .post('/model/save', params)
          .then((data) => {
            let d = data.data;
            if (d.success) {
              this.queryModelAllList();
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
    // 修改编辑模型
    updateModelAll(params) {
      return new Promise((resolve, reject) => {
        window.axios
          .post('/model/update', params)
          .then((data) => {
            let d = data.data;
            if (d.success) {
              this.queryModelAllList();
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
    // 删除模型
    delModel(params) {
      return new Promise((resolve, reject) => {
        window.axios
          .post('/model/delete', params)
          .then((data) => {
            let d = data.data;
            if (d.success) {
              this.queryModelAllList();
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
    // 状态 启用禁用
    changeModelStatus(params) {
      return new Promise((resolve, reject) => {
        window.axios
          .post('/model/setModelStatus', params)
          .then((data) => {
            let d = data.data;
            if (d.success) {
              this.queryModelAllList();
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
