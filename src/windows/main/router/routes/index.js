import Main from '../../components/app/main';
import Empty from '../../components/empty-router-view';

const routes = [
  {
    path: '/',
    meta: {
      title: '欢迎',
    },
    redirect: '/home',
    component: Empty,
    children: require('./home').default,
  },

  // 演示页面
  {
    path: '/demo',
    meta: {
      title: '演示',
    },
    redirect: '/demo/notify',
    component: (s, j) => require(['../../views/demo'], s, j),
    children: require('./demo').default,
  },

  // 错误页面
  {
    path: '/400',
    meta: {
      title: '错误',
    },
    component: (s, j) => require(['../../views/error/400'], s, j),
  },
  {
    path: '/403',
    meta: {
      title: '禁止访问',
    },
    component: (s, j) => require(['../../views/error/403'], s, j),
  },
  {
    path: '/*',
    meta: {
      title: '页面不存在',
    },
    component: (s, j) => require(['../../views/error/404'], s, j),
  }
];

export default routes;
