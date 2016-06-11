const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bowerDir = path.join(__dirname, 'bower_components');
const nodeModulesDir = path.join(__dirname, 'node_modules');

// 热替换中间件暂时不用
const hotMiddleWareScript = 'webpack-hot-middleware/client?' +
  'path=/__webpack_hmr&timeout=20000&reload=true';
const assetsPath = path.join(__dirname, 'dist', 'assets');
const publicPathConfig = {
  production: 'url', // 这里配置cdn 地址
  testing: '/assets',
  default: 'http://127.0.0.1:4000/antcms/assets'
};

function makeConfig(env) {
  var config = {};
  var envStr = env || 'development';
  var publicPath = publicPathConfig[envStr] || publicPathConfig.default;

  config = {
    context: __dirname,
    // 入口配置
    entry: {
      app: (envStr === 'development') ? ['webpack-dev-server/client?http://127.0.0.1:4000/',
      'webpack/hot/dev-server', './client/src/app.jsx'] : './client/src/app.jsx',
      // login: (envStr === 'development') ?
      //   ['./client/src/login.jsx'] : './client/src/login.jsx',
      vendor: [
        'antd',
        'antd/style/index.less',
        'react'
      ]
    },
    output: {
      publicPath: publicPath, // 打包发布路径
      path: assetsPath, // 源目录
      filename: (envStr === 'production') ? '[name]-[chunkhash].js' : '[name].js', // 目标文件名
      chunkFilename: (envStr === 'production') ? '[name]-[chunkhash].js' : '[name].js'
    },
    resolve: {
      alias: {
        bower: bowerDir,
        antd: path.resolve(nodeModulesDir, 'antd'),
        react: path.resolve(nodeModulesDir, 'react'),
        style: path.resolve(__dirname, 'client', 'styles')
      },
      extensions: ['', '.js', '.jsx']
    },
    module: {
      noParse: [],
      loaders: [{
        test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'server'),
        query: {
          presets: ['stage-0', 'es2015-node5', 'stage-3'],
          compact: false
        },
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'client'),
        plugins: [
          'transform-class-properties'
        ],
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          env: {
            development: {
              presets: ['react-hmre']
            }
          }
        },
        exclude: /node_modules/
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
      }]
    },
    postcss: [autoprefixer({
      browsers: ['last 2 versions']
    })],
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin((envStr === 'production') ?
        '[name]-[chunkhash].css' : '[name].css'),
      new webpack.ProvidePlugin({
        react: 'exports?window.react!react'
      })
      // new webpack.optimize.DedupePlugin(),
      // new webpack.NoErrorsPlugin(),
      // new webpack.ContextReplacementPlugin(/.*$/, /a^/)
    ],
    devtool: 'inline-source-map'
    // Server Configuration options
    // devServer: {
    //   contentBase: 'client',  // Relative directory for base of server
    //   devtool: 'eval',
    //   hot: true,        // Live-reload
    //   inline: true,
    //   port: 3001,        // Port Number
    //   host: '127.0.0.1'  // Change to '0.0.0.0' for external facing server
    // }
  };
  // generate manifest.json
  config.plugins.push(function () {
    this.plugin('done', function (stats) {
      var assets = stats.toJson().assetsByChunkName;
      var assetName;
      var vendors;
      var i;
      for (i in assets) {
        if (assets.hasOwnProperty(i)) {
          assetName = i;
          vendors = assets[i];
          console.log('资源', assets[i]);
          if (typeof assets[i] === 'object' ||
            Object.prototype.toString.call(assets[i]) === '[object Array]') {
            console.log(assets[i]);
            vendors.forEach(function (src, index) {
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
