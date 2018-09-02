import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from '../../helpers/actions'
import './MessageInput.css'

class MessageInput extends Component {
  state = {
    messageBody: ''
  }

  updateMessages =  ({ author, body }) => {
    this.props.updateMessages({
      author: this.props.store.clientId,
      body: this.state.messageBody,
    })
  }

  handleChange = event => {
    this.setState({ messageBody: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    const {
      socketClient,
      sendMessage,
      app: {
        clientId,
      },
    } = this.props

    const message = {
      author: clientId,
      body: this.state.messageBody
    }

    sendMessage({ message, socketClient })

    this.setState({ messageBody: '' })
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

const mapStateToProps = ({ app, messages }) => ({ app, messages })
const mapDispatchToProps = dispatch => ({
  sendMessage: payload => dispatch(sendMessage(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput)
