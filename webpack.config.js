const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bowerDir = path.join(__dirname, 'bower_components');
const nodeModulesDir = path.join(__dirname, 'node_modules');
const hotMiddleWareScript = 'webpack-hot-middleware/client?' +
  'path=/__webpack_hmr&timeout=20000&reload=true';
const assetsPath = path.join(__dirname, 'dist', 'assets');
const publicPathConfig = {
  production: 'url', // 这里配置cdn 地址
  default: '/assets'
};

function makeConfig(env) {
  var config = {};
  var envStr = env || 'development';
  var publicPath = publicPathConfig[envStr] || publicPathConfig.default;

  config = {
    addVendor: function(name, vendorPath) {
      this.resolve.alias[name] = vendorPath;
      this.module.noParse.push(vendorPath);
    },
    context: __dirname,
    // 入口配置
    entry: {
      app: (envStr === 'development') ?
        ['./client/js/app.js', hotMiddleWareScript] : './client/js/app.js',
      login: (envStr === 'development') ?
        ['./client/js/login.js', hotMiddleWareScript] : './client/js/login.js',
      vendor: [
        'jquery',
        'angular',
        'normalize.css',
        './client/less/common.less'
      ]
    },
    output: {
      publicPath: publicPath, // 打包发布路径
      path: assetsPath, // 源目录
      filename: (envStr === 'production')
        ? '[name]-[chunkhash].js' : '[name].js', // 目标文件名
      chunkFilename: (envStr === 'production')
        ? '[name]-[chunkhash].js' : '[name].js'
    },
    resolve: {
      alias: {
        bower: bowerDir,
        'normalize.css': path.resolve(bowerDir, 'normalize-css/normalize.css'),
        'font-awesome.css': path.resolve(bowerDir, 'font-awesome/css/font-awesome.min.css'),
      }
    },
    module: {
      noParse: [],
      loaders: [
        {
          test: /\.js$/,
          // exclude: /(node_modules|bower_components|client)/,path.resolve('src')
          exclude: path.resolve('src'),
          loader: 'babel'
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss')
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff'
        },
        {
          test: /\.(jpg|jpeg|gif|png)$/i,
          loader: 'file-loader'
        }
      ]
    },
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
      new ExtractTextPlugin((envStr === 'production' || envStr === 'testing') ?
        '[name]-[chunkhash].css' : '[name].css'),
      new webpack.ProvidePlugin({
        angular: 'exports?window.angular!angular',
        $: 'exports?window.jQuery!jquery'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ContextReplacementPlugin(/.*$/, /a^/),
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'cheap-module-eval-source-map'
  };
  // generate manifest.json
  config.plugins.push(function() {
    console.log('配置信息')
    this.plugin('done', function(stats) {
      var assets = stats.toJson().assetsByChunkName;
      var assetName;
      var vendors;
      var i;
      console.log(assets);
      for (i in assets) {
        if (assets.hasOwnProperty(i)) {
          assetName = i;
          vendors = assets[i];
          console.log(assets[i]);
          if (typeof assets[i] === 'object' ||
            Object.prototype.toString.call(assets[i]) === '[object Array]') {
            console.log(assets[i]);
            vendors.forEach(function(src, index) {
              vendors[index] = [publicPath, '/', src].join('');
              console.log(src);
            });
          } else {
            assets[i] = [publicPath, '/', assets[i]].join('');
          }
        }
      }
      fs.writeFileSync(
        path.join(__dirname, 'manifest.json'),
        JSON.stringify(assets)
      );
    });
  });
  return config;
}

module.exports = makeConfig;