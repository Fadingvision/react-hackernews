export default {

  path: '/',

  component: require('COMPONENT/App').default,

  indexRoute: {
    component: require('COMPONENT/Top').default
  },

  childRoutes: [
    { path: '/top', component: require('COMPONENT/Top').default },

    // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
    { path: '*', component: require('COMPONENT/404').default }
  ]
}
