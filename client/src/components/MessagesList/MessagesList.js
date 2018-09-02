import React, { Component } from 'react';
import { connect } from 'react-redux'

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

const mapStateToProps = ({ messages }) => ({ messages })

export default connect(mapStateToProps)(MessagesList)
