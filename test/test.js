'use strict';
const chai = require('chai');
const assert = chai.assert;
const should = chai.should;
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const app = express();

const server = exports.server = http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

const io = require('socket.io').listen(server);


describe('Get a passing test', () => {
  
  it('should pass', () => {
    assert.equal();
  });


});