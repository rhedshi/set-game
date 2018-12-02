const express = require('express')
const webpack = require('webpack')
const socket = require('socket.io')
const path = require('path')
const config = require('../webpack.config.js')

const app = express()
const compiler = webpack(config)
const port = process.env.PORT || 3000

if (app.get('env') === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, { stats: { colors: true } }))
  app.use(require('webpack-hot-middleware')(compiler))
}
else {
  app.use(express.static(path.resolve(__dirname, '../')))
}

app.get('*', function(req, res) {
  res.sendFile('index.html', { root: path.resolve(__dirname, '../') })
})

const server = app.listen(port)
const io = socket(server)

io.on('connection', function(socket) {
  console.log('user connected')

  socket.on('disconnect', function() {
    console.log('user disconnected')
  })
})
