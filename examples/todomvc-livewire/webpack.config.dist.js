var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    './index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react'),
      'redux-devtools-diff-monitor':  path.join(__dirname, '..', '..', 'src')
    },
    extensions: ['', '.js']
  },
  plugins: [
     new HtmlWebpackPlugin({
         title: 'Redux TodoMVC',
         template: 'index.template.ejs',
         inject: 'body',
     }),
 ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, '..', '..', 'src')
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
};
