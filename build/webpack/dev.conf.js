const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackDevelopmentConf = require('./lib/development.conf');
const packageJson = require('../../package.json');

const conf = webpackMerge(webpackDevelopmentConf, {
  optimization: {
    nodeEnv: 'development',
  },
  devServer: {
    contentBase: packageJson.build.webpack.devServer.contentBase,
    compress: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'error',
    inline: true,
    port: packageJson.build.webpack.devServer.port,
    proxy: {

    },
  },
});

module.exports = conf;
