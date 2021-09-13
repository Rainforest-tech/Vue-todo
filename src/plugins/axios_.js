

import Vue from 'vue';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

// eslint-disable-next-line no-underscore-dangle
const _axios = axios.create(config);

_axios.interceptors.request.use(
  // eslint-disable-next-line no-shadow
  config => config,
  error => Promise.reject(error),

);

// Add a response interceptor
_axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error),

);

// eslint-disable-next-line func-names,no-unused-vars,no-shadow
Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
