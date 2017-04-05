`use strict`;

const path = require(`path`);
const webpack = require(`webpack`);
const autoprefixer = require(`autoprefixer`);

module.exports = {
  devtool: 'eval',
  entry: {
    index: [
      './lib/index',
      'xstream',
      '@cycle/run',
      '@cycle/dom',
      '@cycle/isolate'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
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
  }
};
