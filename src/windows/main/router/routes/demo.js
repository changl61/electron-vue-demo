export default [
  {
    path: '/demo/notify',
    meta: {
      title: '系统通知',
    },
    component: (s, j) => require(['../../views/demo/notify'], s, j),
  },
  {
    path: '/demo/update',
    meta: {
      title: '检查更新',
    },
    component: (s, j) => require(['../../views/demo/update'], s, j),
  },
]
