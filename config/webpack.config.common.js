const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const helpers = require('./helper');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// let extractLESS = new ExtractTextPlugin('stylesheets/[name].less');
const nodeModulesDir = path.join(__dirname, '../', 'node_modules');
const publicPathConfig = {
  production: 'url', // 这里配置cdn 地址
  development: 'http://127.0.0.1:4000/dist'
};
const webpackConfig = {
  entry: {
    polyfills: ['./app/polyfills.ts'],
    vendor: ['./app/vendor.ts'],
    app: ['./app/main.ts']
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    alias: {
      bootstrap: path.resolve(nodeModulesDir, 'bootstrap'),
      ionicons: path.resolve(nodeModulesDir, 'ionicons/dist/css/ionicons.min.css'),
      'font-awesome': path.resolve(nodeModulesDir, 'font-awesome/css/font-awesome.min.css')
    }
  },
  module: {
    loaders: [
      {
        test: /.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
      },
      {
        test: /.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('app', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('app', 'app'),
        loader: 'raw'
      },
      {
        test: /\.less$/,
        include: helpers.root('app', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css!less')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?\S*$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?\S*$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?\S*$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?\S*$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new ExtractTextPlugin(('[name].css'))
  ]
};
webpackConfig.plugins.push(function () {
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
            vendors[index] = [publicPathConfig[process.env.NODE_ENV], '/', src].join('');
            console.log(src);
          });
        } else {
          assets[i] = [publicPathConfig[process.env.NODE_ENV], '/', assets[i]].join('');
        }
      }
    }
    fs.writeFileSync(
      path.join(__dirname, '../', 'manifest.json'),
      JSON.stringify(assets)
    );
  });
});
module.exports = webpackConfig;

