import {
    connect
} from 'react-redux'

/**
 * 将木偶组件变成智能组件
 * @param  {Function} mapStateToProps
 * @param  {Object}   mapDispatchToProps
 * @param  {Component?}
 * @return {Connect : Container}
 */
export default function createContainer(mapStateToProps, mapDispatchToProps, component) {

    // connect() 方法有两个主要的参数，而且都是可选的。
    // 第一个参数 mapStateToProps 是个函数，让你在数据变化时从 store 获取数据，并作为 props 传到组件中。
    // 第二个参数 mapDispatchToProps
    // 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。
    // 如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 bindActionCreators()）。
    // 依然是函数，让你可以使用 store 的 dispatch 方法，通常都是创建 action 创建函数并预先绑定，那么在调用时就能直接分发 action。
    // 如果在执行 connect() 时没有指定 mapDispatchToProps 方法，
    // React Redux 默认将 dispatch 作为 prop 传入。所以当你指定方法时，
    // dispatch 将 不 会自动注入。如果你还想让其作为 this.props.dispatch，需要在 mapDispatchToProps 实现的返回值中明确指出。
    const connectComponent = connect(mapStateToProps, mapDispatchToProps)
    return component ? connectComponent(component) : connectComponent
}