const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackDevelopmentConf = require('./lib/development.conf');

const conf = webpackMerge(webpackDevelopmentConf, {
  optimization: {
    nodeEnv: 'development',
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'error',
    inline: true,
    port: 8081,
    public: 'localhost:8081',
    host: '0.0.0.0',
    proxy: {

    },
  },
});

module.exports = conf;
