'use strict';

const http = require('http');
const express = require('express');

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

  module.exports = server;

