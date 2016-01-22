
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var stylelint = require('stylelint');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, '.build')
};

var common = {
  // Entry accepts a path or an object of entries.
  // The build chapter contains an example of the latter.
  entry: PATHS.app,
//  Given webpack-dev-server runs in-memory, we can drop
//  `output`. We'll look into it again once we get to the
//  build chapter.
//  output: {
//    path: PATHS.build,
//    filename: 'bundle.js'
//  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint', 'jscs'],
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loaders: ['postcss'],
        include: PATHS.app
      }
    ],
    loaders: [
      {
        // Test expects a RegExp! Note the slashes!
        test: /\.css$/,
        // loaders process right to left!
        loaders: ['style', 'css'],
        // Include accepts either a path or an array of paths.
        include: PATHS.app
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    // Parse host and port from env so this is easy to customize.
    host: process.env.HOST,
    port: process.env.PORT
  },
  postcss: function () {
    return [stylelint({
      rules: {
        'color-hex-case': 'lower'
      }
    })];
  },
  plugins: [
//    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Kanban app'
    })
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      // Display only errors to reduce the amount of output.
      stats: 'errors-only',
      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
