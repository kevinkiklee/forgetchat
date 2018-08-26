import React, { Component } from 'react';
import setupSocketClient from './helpers/setupSocketClient'
import './Chat.css';

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
          <h1>nothing.chat</h1>
        </div>
      : <div className='chat-container'>
          <h1>connecting</h1>
        </div>
  }
}

export default Chat;
