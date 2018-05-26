// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import './setup/firebase';
import './setup/font-awesome';
import I18n from './setup/i18n';

import App from './App';
import globalComponents from './components';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.config.errorHandler = () => router.push({ name: 'error' });

Object.keys(globalComponents).forEach(
  compName => Vue.component(compName, globalComponents[compName])
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n: I18n,
  components: { App },
  template: '<App/>',
  beforeCreate() {
    store.dispatch('initAuthListener');
  }
});
