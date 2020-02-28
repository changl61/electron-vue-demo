const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Hash = require("hash-sum");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const resolve = dir => path.join(__dirname, dir);
const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer') ({
        overrideBrowserslist: ['last 5 versions']
      }),
    ]
  }
};
const miniCssLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../../',
  },
};

module.exports.entry = {
  main: ['@babel/polyfill', '~/windows/main'],
};

module.exports.resolve = {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    '~': resolve('../../../src'),
  },
};

module.exports.output = {
  path: resolve('../../../dist/webpack'),
};

module.exports.rule = {
  js: {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // 缓存，加快编译速度
          presets: ['@babel/preset-env'],
          //plugins: ['@babel/plugin-transform-runtime'], // 避免重复引入辅助代码
        }
      }
    ],
  },
  vue: {
    test: /\.vue$/,
    use: ['vue-loader'],
  },
  css: {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', postCssLoader],
  },
  miniCss: {
    test: /\.css$/,
    use: [miniCssLoader, 'css-loader', postCssLoader],
  },
  less: {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader', postCssLoader],
  },
  miniLess: {
    test: /\.less$/,
    use: [miniCssLoader, 'css-loader', 'less-loader', postCssLoader],
  },
  images: {
    test: /\.(gif|jpg|png)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10240,
          outputPath: 'assets/images/',
        }
      }
    ],
  },
  media: {
    test: /\.(mp3|mp4)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10240,
          outputPath: 'assets/media/',
        }
      }
    ],
  },
  fonts: {
    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10240,
          outputPath: 'assets/fonts/',
        }
      }
    ],
  },
  html: {
    test: /\.(html|tpl)$/,
    use: ['html-loader'],
  },
};

module.exports.plugin = {
  htmlWebpackPlugin: {
    main: new HTMLWebpackPlugin({
      filename: 'main.html',
      template: 'src/windows/main/index.html',
      favicon: 'src/windows/main/favicon.ico',
      inject: 'body',
    }),
  },
  cleanWebpackPlugin: new CleanWebpackPlugin(),
  miniCssExtractPlugin: (option) => new MiniCssExtractPlugin(option),
  webpackNamedChunksPlugin: new webpack.NamedChunksPlugin((chunk) => {
    if (chunk.name) return chunk.name;

    const modules = Array.from(chunk.modulesIterable);
    return Hash(modules.map(m => m.id).join('&'));  // 8位
  }),
  webpackHashedModuleIdsPlugin: new webpack.HashedModuleIdsPlugin({
    hashDigestLength: 8 // 8位
  }),
  vueLoaderPlugin: new VueLoaderPlugin(),
};

module.exports.optimization = {
  splitChunks: {
    chunks: 'initial',
    cacheGroups: {
      libs: {
        name: 'libs',
        test: /[\\/]node_modules[\\/](vue|vuex|vue-router|vux)[\\/]/,
        chunks: 'all',
        priority: 1,
      },
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        priority: -1,
      },
    },
  },
};
