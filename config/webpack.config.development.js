const webpackConfig = require('./webpack.config.common');
const helpers = require('./helper');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const devConfig = webpackMerge(webpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:4000/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugin: [
    new ExtractTextPlugin('[name].css')
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});

module.exports = devConfig;
