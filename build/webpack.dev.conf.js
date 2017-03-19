var webpack = require('webpack'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  SOURCE_MAP = true; // 大多数情况下用不到
// SOURCE_MAP = false;
var env = process.env.NODE_ENV.trim(); // 当前环境

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.devtool = SOURCE_MAP ? 'eval-source-map' : false;

// add hot-reload related code to entry chunk
config.entry.app = [
  //  eventsource-polyfill 可以讓 Webpack 兼容 IE
  'eventsource-polyfill',
  // Webpack hot reloading using only webpack-dev-middleware.
  // This allows you to add hot reloading into an existing server without webpack-dev-server.
  'webpack-hot-middleware/client?reload=true',
  'webpack/hot/only-dev-server',
  config.entry.app
];

config.output.publicPath = '/';

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.loaders.push({
  test: /\.css$/,
  loader: 'style!css'
}, {
  test: /\.less$/,
  loader: 'style!css!less'
}, {
  test: /\.styl$/,
  loader: 'style!css!stylus'
});

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': { // 这是给 React / Redux 打包用的
      NODE_ENV: JSON.stringify('development')
    },
    // ================================
    // 配置开发全局常量
    // ================================
    __DEV__: env === 'development',
    __PROD__: env === 'production',
    __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
    __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoErrorsPlugin(), // 使用该插件之后，eslint报错将导致webpack打包失败
  new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: config.commonPath.indexHTML,
    chunksSortMode: 'none'
  })
);

module.exports = config;