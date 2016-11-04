const env = process.env.NODE_ENV;
const webpackConfig = require(`./webpack.config.${env}`);
module.exports = webpackConfig;
