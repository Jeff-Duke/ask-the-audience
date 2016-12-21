'use strict';
const socket = io();

const connectionCount = document.getElementById('connection-count');
const statusMessage = document.getElementById('status-message');
const buttons = document.querySelectorAll('#choices button');
const votesA = document.getElementById('A');
const votesB = document.getElementById('B');
const votesC = document.getElementById('C');
const votesD = document.getElementById('D');
const yourVote = document.getElementById('your-vote');

socket.on('usersConnected', (count) => {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message;
});

socket.on('voteCount', (votes) => {
  votesA.innerText = 'A: '+votes.A;
  votesB.innerText = 'B: '+votes.B;
  votesC.innerText = 'C: '+votes.C;
  votesD.innerText = 'D: '+votes.D;
}); 

socket.on('youVoted', (vote) => {
  yourVote.innerText = 'You voted for: '+vote;
});

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', (e) => {
    socket.send('voteCast', e.target.innerText);
  });
}
