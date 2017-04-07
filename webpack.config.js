`use strict`;

const path = require(`path`);
const webpack = require(`webpack`);
const autoprefixer = require(`autoprefixer`);

module.exports = {
  devtool: 'eval',
  entry: {
    'cycle-calendar': './lib/index',
    vendor: [
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
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: function (modules) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
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
