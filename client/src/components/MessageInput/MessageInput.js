import React, { Component } from 'react'

import './MessageInput.css'

class MessageInput extends Component {
  state = {
    messageBody: ''
  }

  updateMessages =  ({ author, body }) => {
    this.props.updateMessages({
      author: this.props.store.clientId,
      body: this.state.messageBody
    })

    this.setState({ messageBody: '' })
  }

  handleChange = event => {
    this.setState({ messageBody: event.target.value })
  }

  handleSubmit = event => {
    this.props.socketClient.emit('message', {
      author: this.props.store.clientId,
      body: this.state.messageBody
    }, this.updateMessages)

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
