import React, { Component } from 'react';

import Message from '../Message/Message'
import './MessagesList.css';

class MessagesList extends Component {
  buildMessages = ({ allIds, byId }) => {
    return (
      <ul className='messages-container'>
        {allIds.reverse().map(id => <Message key={id} message={byId[id]} />)}
      </ul>
    )
  }

  render = () => {
    const { messages } = this.props

    return (
      <div className='messages-list-container'>
        {this.buildMessages(messages)}
      </div>
    )
  }
}

export default MessagesList;
