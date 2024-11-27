import Axios from 'axios';
import { getHeaders, parseParams } from './utils';

class Api {
  constructor(options) {
    this.controller = new AbortController();
    this.axios = Axios.create(options.config);

    this.axios.interceptors.request.use((config) => {
      return {
        ...config,
        headers: getHeaders(config)
      };
    });

    this.axios.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          return response;
        }
        return response;
      },
      (error) => {
        return error;
      }
    );
  }

  get(url, params, config) {
    return this.api(url, { params, config }, 'get');
  }

  delete(url, params, config) {
    return this.api(url, { params, config }, 'delete');
  }

  post(url, params, config) {
    return this.api(url, { params, config }, 'post');
  }

  patch(url, params, config) {
    return this.api(url, { params, config }, 'patch');
  }

  put(url, params, config) {
    return this.api(url, { params, config }, 'put');
  }

  getSignal() {
    const signal = this.controller.signal;
    return signal;
  }

  abort() {
    this.controller.abort();
  }

  async api(url, req, method = 'get') {
    if (url.split('?')[1] ?? /get|delete/i.test(method)) {
      url = parseParams(url, req.params);
    }
    let res = null;
    method = method.toLocaleLowerCase();
    switch (method) {
      case 'get':
        res = await this.axios.get(url, req.config);
        return res.data;
      case 'delete':
        res = await this.axios.delete(url, req.config);
        return res.data;
      case 'post':
        res = await this.axios.post(url, req.params, req.config);
        return res.data;
      case 'patch':
        res = await this.axios.patch(url, req.params, req.config);
        return res.data;
      case 'put':
        res = await this.axios.put(url, req.params, req.config);
        return res.data;
      default:
        res = await this.axios.get(url, req.config);
        return res.data;
    }
  }
}

// 请求超时时间
const timeout = 30000;

export const api = new Api({
  config: {
    // baseURL: 'http://localhost:8889',
    timeout: timeout
  }
});
