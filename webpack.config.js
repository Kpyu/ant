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
    context: __dirname,
    // 入口配置
    entry: {
      app: (envStr === 'development') ?
        ['eventsource-polyfill', './client/js/app.js', hotMiddleWareScript] : './client/js/app.js',
      login: (envStr === 'development') ?
        ['./client/js/login.js', hotMiddleWareScript] : './client/js/login.js',
      vendor: [
        'antd',
        'react'
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
        antd: path.resolve(nodeModulesDir, 'antd'),
        react: path.resolve(nodeModulesDir, 'react')
      }
    },
    module: {
      noParse: [],
      loaders: [
        {
          test: /\.js$/,
          exclude: path.resolve('client'),
          loader: 'babel'
        },
        {
          test: /\.jsx?$/,
          loader: 'babel',
          query: {
            presets: ['es2015-node5', 'stage-3', 'react'],
            env: {
              development: {
                presets: ['react-hmre']
              }
            }
          },
          exclude: path.resolve('client')
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
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin((envStr === 'production' || envStr === 'testing') ?
        '[name]-[chunkhash].css' : '[name].css'),
      new webpack.ProvidePlugin({
        react: 'exports?window.react!react'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ContextReplacementPlugin(/.*$/, /a^/)
    ],
    devtool: 'cheap-module-eval-source-map'
  };
  // generate manifest.json
  config.plugins.push(function() {
    console.log('配置信息');
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
