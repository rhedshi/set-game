module.exports = {
  entry: './client/index.js',
  output: {
    filename: './bundle.js'
  },
  devServer: {
    port: 3000,
    inline: true
  }
}
