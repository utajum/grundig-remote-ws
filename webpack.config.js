const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HappyPack = require('happypack');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  devtool: 'inline-source-map',
  output: {
    filename: 'grundig.js',
    path: `${__dirname}/build`,
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: __dirname,
        exclude: /node_modules/,
        use: 'happypack/loader',
      },
    ],
  },
  plugins: [
    new HappyPack({
      threads: 12,
      loaders: [
        {
          loader: 'babel-loader',
          include: __dirname,
          exclude: /node_modules/,
        },
      ],
    }),
  ],
};
