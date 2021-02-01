const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const path = require('path');

function resolvePath(dir) {
  return path.join(__dirname, '..', dir);
}

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: {
    app: './playground/vue/main.js',
  },
  output: {
    path: resolvePath('playground/vue/public'),
    hashDigestLength: 6,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: '/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.vue'],
  },
  devtool: env === 'production' ? 'source-map' : 'eval',
  devServer: {
    hot: true,
    open: true,
    compress: true,
    contentBase: '/playground/vue/public/',
    disableHostCheck: true,
    historyApiFallback: true,
    watchOptions: {
      poll: 1000,
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
            ],
          },
        },
        include: [resolvePath('src'), resolvePath('playground/vue')],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './playground/vue/index.html',
      inject: true,
      minify:
        env === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            }
          : false,
    }),
  ],
};
