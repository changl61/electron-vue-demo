import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'ex-active',
});

// 到达前
router.beforeEach((to, from, next) => {
  next();
});

// 解析前
router.beforeResolve((to, from, next) => {
  next();
});

// 到达后
router.afterEach(() => {
  window.scrollTo(0, 0);
});

// 失败时
router.onError(() => {
  // ...
});

export default router;
