`use strict`;

const path = require(`path`);
const webpack = require(`webpack`);
const autoprefixer = require(`autoprefixer`);
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    main: './demo/index',
    vendor: [
      'xstream',
      '@cycle/run',
      '@cycle/dom',
      '@cycle/isolate'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: function (modules) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'demo/index.html',
      inject: true
    }),
    new DashboardPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: [{ loader: 'babel-loader' }],
      exclude: /(node_modules)/,
    }, {
      test: /\.styl$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [autoprefixer({ browsers: [ `last 2 versions` ] })];
            }
          }
        },
        { loader: 'stylus-loader' }
      ],
    }]
  },
  devServer: {
    open: true, // to open the local server in browser
    contentBase: path.resolve(__dirname, './'),
  },
};
