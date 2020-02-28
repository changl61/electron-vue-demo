const webpackMerge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { entry, resolve, output, rule, plugin, happyPackPlugins, optimization } = require('./const');

const webpackProductionConf = {
  mode: 'production',
  entry: webpackMerge(entry, {}),
  resolve: webpackMerge(resolve, {}),
  output: webpackMerge(output, {
    filename: 'assets/js/[name].[chunkhash:12].js',
    chunkFilename: 'assets/js/[name].[chunkhash:12].chunk.js',
  }),
  module: {
    rules: [
      rule.js,
      rule.vue,
      rule.miniCss,
      rule.miniLess,
      rule.images,
      rule.media,
      rule.fonts,
      rule.html,
    ],
  },
  plugins: happyPackPlugins.concat([
    plugin.cleanWebpackPlugin,
    plugin.vueLoaderPlugin,
    plugin.htmlWebpackPlugin.main,
    plugin.webpackNamedChunksPlugin,
    plugin.webpackHashedModuleIdsPlugin,
    plugin.miniCssExtractPlugin({
      filename: 'assets/css/[name].[chunkhash:12].css',
      chunkFilename: 'assets/css/[name].[chunkhash:12].chunk.css',
      allChunks: true,
    }),
  ]),
  optimization: webpackMerge(optimization, {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ],
  }),
  stats: {
    all: false,
    errors: true,
    timings: true,
    version: true,
  },
  target: 'electron-renderer',
};

if (process.env.npm_config_report) {
  webpackProductionConf.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackProductionConf;
