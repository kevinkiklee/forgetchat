import React, { Component } from 'react';

import MessagesList from '../MessagesList/MessagesList'
import MessageInput from '../MessageInput/MessageInput'
import './MessagesPanel.css';

class MessagesPanel extends Component {
  render() {
    const { socketClient } = this.props

    return (
      <div className='messages-panel-container'>
        <MessagesList socketClient={socketClient} />
        <MessageInput socketClient={socketClient} />
      </div>
    )
  }
}

export default MessagesPanel;
