var path = require('path'),
  ProgressPlugin = require('nyan-progress-webpack-plugin');
  // ProgressPlugin = require('webpack-simple-progress-plugin');
  // ProgressPlugin = require('webpack-logger-plugin');

var rootPath = path.resolve(__dirname, '..'), // 项目根目录
  src = path.join(rootPath, 'src'), // 开发源码目录
  env = process.env.NODE_ENV.trim(); // 当前环境
var commonPath = {
  rootPath: rootPath,
  dist: path.join(rootPath, 'dist'), // build 后输出目录
  indexHTML: path.join(src, 'index.html'), // 入口基页
  staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
};

module.exports = {
  commonPath: commonPath,
  entry: {
    app: path.join(src, 'app.js'),

    // ================================
    // any required modules inside node_modules are extracted to vendor, so this is needless
    // ================================
    // vendor: [
    //   'history',
    //   'lodash',
    //   'react',
    //   'react-dom',
    //   'react-redux',
    //   'react-router',
    //   'react-router-redux',
    //   'redux',
    //   'redux-thunk'
    // ]
  },
  output: {
    path: path.join(commonPath.dist, 'static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      // ================================
      // 自定义路径别名,优化webpack的查找速度
      // ================================
      ASSET: path.join(src, 'assets'),
      COMPONENT: path.join(src, 'components'),
      ACTION: path.join(src, 'redux/actions'),
      REDUCER: path.join(src, 'redux/reducers'),
      STORE: path.join(src, 'redux/store'),
      ROUTE: path.join(src, 'routes'),
      SERVICE: path.join(src, 'services'),
      UTIL: path.join(src, 'utils'),
      HOC: path.join(src, 'utils/HoC'),
      MIXIN: path.join(src, 'utils/mixins'),
      VIEW: path.join(src, 'views'),
      CONSTANT: path.join(src, 'constants'),
      // react: 'react/lib/react',
    }
  },
  resolveLoader: {
    root: path.join(rootPath, 'node_modules')
  },
  module: {
    // preLoaders: [{
    //   test: /\.(js|jsx)$/,
    //   loader: 'eslint',
    //   include: commonPath.rootPath,
    //   exclude: /node_modules/
    // }],
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: (function() {
        var _loaders = ['babel?' + JSON.stringify({
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy'
          ],
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            production: {
              presets: ['react-optimize']
            }
          }
        })];

        // 开发环境下引入 React Hot Loader
        if (env === 'development') {
          _loaders.unshift('react-hot');
        }
        return _loaders;
      })(),
      include: src,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10240, // 10KB 以下使用 base64
        name: 'img/[name]-[hash:6].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter'),
    failOnWarning: false,
    failOnError: false,
  },
  plugins: [
    new ProgressPlugin(), // 进度条
  ]
};
