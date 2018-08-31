import React, { Component } from 'react';

import Message from '../Message/Message'
import './MessagesList.css';

class MessagesList extends Component {
  socketClient = window.socketClient

  state = {
    messages: {
      byId : {
        message1: {
          id : "message1",
          author : "alpha",
          body : "lorem impsum sit dolor amet",
        },
        message2: {
          id : "message2",
          author : "user2",
          body : "dslfakj asdfj 32423a asd",
        }
      },
      allIds : ["message1", "message2"],
    }
  }

  componentDidMount = () => {
    this.socketClient.on('message', data => {
      debugger
      this.updateMessages(data)
    })
  }

  updateMessages = data => {
    console.log({ data })
  }

  buildMessages = () => {
    return (
      <ul className='messages-container'>
        {this.state.messages.allIds.reverse().map(id => {
          const message = this.state.messages.byId[id]
          return <Message key={id} message={message} />
        })}
      </ul>
    )
  }

  render = () => {
    return (
      <div className='messages-list-container'>
        {this.buildMessages()}
      </div>
    )
  }
}

export default MessagesList;
