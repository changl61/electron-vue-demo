import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app: require('./modules/app').default,   // 全局
    demo: require('./modules/demo').default, // 帮助中心
  },
});

export default store;
