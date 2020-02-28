import './index.less';
import Vue from 'vue';
import iview from 'iview';
import config from '~/config';
import router from './router';
import store from './store';

// 框架配置
Object.assign(Vue.config, config.vue);
Vue.use(iview, config.iview);

// 自定义服务
Object.defineProperty(Vue.prototype, '$state', { value: store.state });
Object.defineProperty(Vue.prototype, '$config', { value: config });

// 根组件
new Vue({
  el: '#root',
  router,
  store,
  render: h => h(require('./components/app').default),
});
