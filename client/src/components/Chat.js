import React, { Component } from 'react'
import { connect } from 'react-redux'

import setupSocketClient from '../helpers/setupSocketClient'
import { receiveMessage } from '../helpers/actions'
import './Chat.css'
import InfoPanel from './InfoPanel/InfoPanel'
import MessagesPanel from './MessagesPanel/MessagesPanel'

class Chat extends Component {
  state = {
    isSocketClientReady: false
  }

  async componentDidMount() {
    const {
      app: {
        chatId,
        clientId,
      },
      receiveMessage,
    } = this.props

    const { socketClient, isConnected } = await setupSocketClient({ chatId, clientId, receiveMessage })

    if (isConnected) {
      this.socketClient = socketClient
      this.setState({ isSocketClientReady: true })
    }
  }

  async componentWillUnmount() {
    if (this.state.isSocketClientReady) {
      await window.socketClient.close()
    }
  }

  render() {
    const { isSocketClientReady } = this.state

    return isSocketClientReady
      ? <div className='page-container'>
          <div className='chat-container'>
            <InfoPanel />
            <MessagesPanel socketClient={this.socketClient} />
          </div>
        </div>
      : <div className='page-container'>
          <h1>connecting</h1>
        </div>
  }
}

const mapStateToProps = ({ app, messages }) => ({ app, messages })
const mapDispatchToProps = dispatch => ({
  receiveMessage: payload => dispatch(receiveMessage(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
