const env = process.env.NODE_ENV || 'development';
const webpackConfig = require(`./webpack.config.${env}`);
module.exports = webpackConfig;
