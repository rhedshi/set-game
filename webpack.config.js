const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV !== 'production'
const useWebpackDevServer = process.env.npm_lifecycle_event === 'dev'

const cssLoaderOptions = {
  modules: {
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: isDev
    ? (useWebpackDevServer
      ? ['./client/index.js']
      : ['./client/index.js', 'webpack-hot-middleware/client'])
    : ['./client/index.js'],
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: isDev
          ? [
              'style-loader',
              {
                loader: 'css-loader',
                options: cssLoaderOptions,
              },
            ]
          : [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: cssLoaderOptions,
              },
            ],
      },
      {
        test: /\.(jpg|png|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[contenthash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    ...(isDev ? [] : [new MiniCssExtractPlugin({ filename: 'styles.css' })]),
    // webpack-dev-server injects HMR when hot: true; Express + webpack-hot-middleware needs the plugin.
    ...(isDev && !useWebpackDevServer ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
  optimization: {
    emitOnErrors: false,
  },
  devServer: {
    port: 3000,
    hot: true,
    devMiddleware: {
      publicPath: '/',
    },
    static: path.resolve(__dirname),
  },
}
