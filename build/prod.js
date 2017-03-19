var fs = require('fs'),
  path = require('path'),
  ora = require('ora'),
  spinner = ora('building for production...'),
  webpack = require('webpack'),
  config = require('./webpack.prod.conf');

// 只有开启watch模式才能启动browser-sync-webpack-plugin，搭建一个本地服务查看build之后的代码
config.watch = true;

spinner.start();

webpack(config, function(err, stats) {
  spinner.stop();
  if (err) throw err;
  // show build info to console
  console.log( stats.toString({ chunks: false, color: true }) );

  // save build info to file
  fs.writeFile(
    path.join(config.commonPath.dist, '__build_info__'),
    stats.toString({ color: false })
  );
});
