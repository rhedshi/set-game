const express = require('express');
const webpack = require('webpack');
const socket = require('socket.io');
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

const server = app.listen(3000);
const io = socket(server);

io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('game', function(data) {
    if (data.enter) {
      socket.join(data.game);
      console.log('user joined game: ' + data.game);
    } else {
      socket.leave(data.game);
      console.log('user left game: ' + data.game);
    }
  });
});
