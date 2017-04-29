const webpack = require('webpack');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./client/index.js', 'webpack-hot-middleware/client'],
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    port: 3000,
    inline: true
  }
}
