import { applyMiddleware, compose, createStore } from 'redux'
import { createRootReducer } from 'REDUCER'
import middlewares from './middlewares'
import enhancers from './enhancers'
import syncHistoryWithStore from './syncHistoryWithStore'

// ======================================================
// 实例化 Store
// ======================================================
const store = createStore(
  createRootReducer(),
  // 这个preloadedState 参数会赋给 state 并伴随着一个虚拟 action 一起传给 reducer。
  window.__INITIAL_STATE__ || {}, // 前后端同构（服务端渲染）数据同步
  compose(
    applyMiddleware(...middlewares),
    ...enhancers
  )
)
export default store

// ======================================================
// 增强版 history(将应用中的路由信息与redux中的store绑定在一起)
// ======================================================
export const history = syncHistoryWithStore(store)
