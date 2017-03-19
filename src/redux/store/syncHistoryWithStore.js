// ========================================================
// 同步 history 配置
// ========================================================
import { useRouterHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: '' // 相当于 rootPath
})

export const historyMiddleware = routerMiddleware(browserHistory)

// ======================================================
// 增强版 history(将应用中的路由信息与redux中的store绑定在一起)
// ======================================================
export default function (store) {
  return syncHistoryWithStore(
    browserHistory,
    store,
    { selectLocationState: (state) => state.router }
  )
}
