'use strict';

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();

app.use(express.static('public'));
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

const port = process.env.port || 3000;

const server = http.createServer(app)
  .listen(port, () => {
    console.log('Listening on port ' + port + '.');
  });

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Users connected: ', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);
  
  socket.emit('statusMessage', 'You have connected.');

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});

module.exports = server;
