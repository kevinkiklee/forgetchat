import React, { Component } from 'react';
import setupSocketClient from '../helpers/setupSocketClient'
import './Chat.css';
import InfoPanel from './InfoPanel/InfoPanel';
import MessagesPanel from './MessagesPanel/MessagesPanel';

class Chat extends Component {
  state = {
    isSocketClientReady: false
  }

  async componentDidMount() {
    const { chatId } = this.props

    try {
      await setupSocketClient(chatId)
    } catch (error) {
      throw Error(error)
    }

    this.setState({ isSocketClientReady: true })
  }

  render() {
    const { isSocketClientReady } = this.state

    return isSocketClientReady
      ? <div className='chat-container'>
          <InfoPanel />
          <MessagesPanel />
        </div>
      : <div className='chat-container'>
          <h1>connecting</h1>
        </div>
  }
}

export default Chat;
