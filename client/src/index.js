import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import './index.css';
import App from './App';

fetch('/api/chat/create')

const socket = io.connect('http://localhost:3001/abc');

socket.on('serverMessage', function (data) {
  console.log(data);
  socket.emit('clientMessage', { fromClient: 'hello' });
});

ReactDOM.render(<App />, document.getElementById('root'));
