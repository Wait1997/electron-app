import { defineStore } from 'pinia';
import { api } from '@renderer/services';

export const userStore = defineStore('user', {
  state: () => {
    return {
      username: '你好',
      token: ''
    };
  },
  getters: {
    getUserNamne(state) {
      return state.username;
    },
    tokenInfo(state) {
      return state.token;
    }
  },
  actions: {
    setUser(username) {
      this.username = username;
    },
    setToken(token) {
      this.token = token;
    },
    testApiGet() {
      api
        .get('/api/v1/ping')
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    testApiPost() {
      api
        .post('/api/v1/login', { username: '你好', pwd: '123456' })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  persist: true
});
