const webpackMerge = require('webpack-merge');
const { entry, resolve, output, rule, plugin, happyPackPlugins, optimization } = require('./const');

const webpackDevelopmentConf = {
  mode: 'development',
  entry: webpackMerge(entry, {}),
  resolve: webpackMerge(resolve, {}),
  output: webpackMerge(output, {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  }),
  module: {
    rules: [
      rule.js,
      rule.vue,
      rule.css,
      rule.less,
      rule.images,
      rule.media,
      rule.fonts,
      rule.html,
    ],
  },
  plugins: happyPackPlugins.concat([
    plugin.vueLoaderPlugin,
    plugin.htmlWebpackPlugin.main,
  ]),
  optimization: webpackMerge(optimization, {}),
  //devtool: 'source-map',
  stats: 'minimal',
  target: 'electron-renderer',
};

module.exports = webpackDevelopmentConf;
