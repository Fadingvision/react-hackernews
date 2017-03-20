/* 入口启动文件 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import store, { history } from 'STORE'
import routes from 'ROUTE'

const MOUNT_NODE = document.getElementById('app')
// <Provider /> 是由 React Redux 提供的高阶组件，用来让你将 Redux 绑定到 React （详见 搭配 React）。
// 我们将用 <Provider /> 包裹 <Router />，以便于路由处理器可以访问 store
// 只要你不需要兼容古老的浏览器，比如IE9，你都可以使用 browserHistory。

// <Provider store> 使组件层级中的 connect() 方法都能够获得 Redux store。
// 正常情况下，你的根组件应该嵌套在 <Provider> 中才能使用 connect() 方法。
ReactDOM.render(
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>,
  MOUNT_NODE
)

