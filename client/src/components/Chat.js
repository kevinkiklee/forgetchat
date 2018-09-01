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
    const {
      store: {
        chatId,
        clientId,
      }
    } = this.props

    try {
      const { socketClient, isConnected } = await setupSocketClient({ chatId, clientId })
      console.log({ isConnected })

      if (isConnected) {
        this.socketClient = socketClient
        this.setState({ isSocketClientReady: true })
      }
    } catch (error) {
      throw Error(error)
    }
  }

  async componentWillUnmount() {
    if (this.state.isSocketClientReady) {
      await window.socketClient.close()
    }
  }

  render() {
    const { isSocketClientReady } = this.state
    const { store } = this.props

    return isSocketClientReady
      ? <div className='page-container'>
          <div className='chat-container'>
            <InfoPanel store={store} />
            <MessagesPanel store={store} socketClient={this.socketClient} />
          </div>
        </div>
      : <div className='page-container'>
          <h1>connecting</h1>
        </div>
  }
}

export default Chat;
