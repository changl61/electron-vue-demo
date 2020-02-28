const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackProductionConf = require('./lib/production.conf');

const conf = webpackMerge(webpackProductionConf, {
  optimization: {
    nodeEnv: 'test',
    minimize: false,
  },
});

module.exports = conf;
