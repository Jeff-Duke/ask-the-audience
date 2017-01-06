'use strict';

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const _ = require('lodash');

const app = express();

app.use(express.static('public'));
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 3000;

const server = http.createServer(app)
  .listen(port, () => {
    console.log('Listening on port ' + port + '.');
  });

const io = socketIo(server);

let votes = {};

const countVotes = (votes) => {
  let voteCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
  };
  _.forEach(votes, (vote) => {
    voteCount[vote]++;
  });
  io.sockets.emit('voteCount', voteCount);
};

io.on('connection', (socket) => {
  console.log('Users connected: ', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);
  
  socket.emit('statusMessage', 'You have connected.');
  socket.emit(countVotes(votes));

  socket.on('message', (channel, message) => {
    if(channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('youVoted', message);
      countVotes(votes);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    io.sockets.emit('usersConencted', io.engine.clientsCount);
  });
});

module.exports = server;
