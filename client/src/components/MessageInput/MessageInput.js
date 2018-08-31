import React, { Component } from 'react'

import './MessageInput.css'

class MessageInput extends Component {
  socketClient = window.socketClient

  state = {
    messageBody: ''
  }

  handleChange = event => {
    this.setState({ messageBody: event.target.value })
  }

  handleSubmit = event => {
    this.socketClient.emit('message', {
      sender: 'abc',
      messageBody: this.state.messageBody
    })

    event.preventDefault()
  }

  render = () => {
    return (
      <form className='message-input-container' onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.messageBody} onChange={this.handleChange} />
        <input type='submit' value='Send' />
      </form>
    )
  }
}

export default MessageInput
