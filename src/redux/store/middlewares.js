// ======================================================
// 配置中间件
// ======================================================
import thunk from 'redux-thunk'
import { historyMiddleware } from './syncHistoryWithStore'

// historyMiddleware这个中间件用于处理当路由状态改变之后可以分发action.
const middlewares = [thunk, historyMiddleware]

if (__DEV__) {
  /** Redux Logger (P.S: 打印日志会造成轻微的卡顿) **/
  const createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

export default middlewares
