export default [
  {
    path: '/home',
    meta: {
      title: '欢迎',
    },
    component: (s, j) => require(['../../views/home'], s, j),
  },
]
