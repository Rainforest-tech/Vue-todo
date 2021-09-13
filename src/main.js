import Vue from 'vue';
import './plugins/axios';
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';


import VueToast from 'vue-toast-notification';
import App from './App.vue';
import store from './store';
import router from './router';

import './assets/styles/style.scss';

window.eventBus = new Vue();

Vue.use(VueToast);
Vue.config.productionTip = false;
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
