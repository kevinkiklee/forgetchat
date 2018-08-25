import React, { Component } from 'react';
import './Chat.css';

class Chat extends Component {
  componentDidMount() {
    this.socketIo = window.socketIo

    this.socketIo.on('serverMessage', data => {
      console.log({ data })
      this.socketIo.emit('clientMessage', { fromClient: 'hello' })
    }, this)
  }

  render() {
    return (
      <div className='chat-container'>
        <h1>nothing.chat</h1>
      </div>
    );
  }
}

export default Chat;
