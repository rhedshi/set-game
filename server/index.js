const express = require('express');
const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config.js');

const app = express();
const compiler = webpack(config);

if (app.get('env') === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {stats: {colors: true}}));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.resolve(__dirname, '../')});
});

app.listen(3000);
