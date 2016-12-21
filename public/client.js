'use strict';
const socket = io();

const connectionCount = document.getElementById('connection-count');
const statusMessage = document.getElementById('status-message');

socket.on('usersConnected', (count) => {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message;
});

