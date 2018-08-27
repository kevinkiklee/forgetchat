import React, { Component } from 'react';

import MessagesList from '../MessagesList/MessagesList'
import MessageInput from '../MessageInput/MessageInput'
import './MessagesPanel.css';

class MessagesPanel extends Component {
  render() {
    return (
      <div className='messages-panel-container'>
        <MessagesList />
        <MessageInput />
      </div>
    )
  }
}

export default MessagesPanel;
