import React, { Component } from 'react';

import MessagesList from '../MessagesList/MessagesList'
import MessageInput from '../MessageInput/MessageInput'
import './MessagesPanel.css';

const PRELOADED_STATE = {
  messages: {
    byId : {
      message1: {
        id : 'message1',
        author : 'alpha',
        body : 'lorem impsum sit dolor amet',
      },
      message2: {
        id : 'message2',
        author : 'user2',
        body : 'dslfakj asdfj 32423a asd',
      }
    },
    allIds : ['message1', 'message2'],
    count: 2,
  }
}

class MessagesPanel extends Component {
  state = PRELOADED_STATE

  componentDidMount = () => {
    this.props.socketClient.on('relayedMessage', data => {
      this.updateMessages(data)
    })
  }

  updateMessages = ({ author, body }) => {
    const {
      byId,
      allIds,
      count,
    } = this.state.messages

    const newCount = count + 1
    const id = `message${newCount}`

    console.log(`!!! [${id}]: From ${author} - ${body}`)

    this.setState({
      messages: {
        byId: {
          ...byId,
          [id]: {
            id,
            author,
            body
          }
        },
        allIds: [ ...allIds, id],
        count: newCount
      }
    })
  }

  render() {
    return (
      <div className='messages-panel-container'>
        <MessagesList messages={this.state.messages} />
        <MessageInput
          socketClient={this.props.socketClient}
          store={this.props.store}
          updateMessages={this.updateMessages}
        />
      </div>
    )
  }
}

export default MessagesPanel;
