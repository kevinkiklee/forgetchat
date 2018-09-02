export const ADD_MESSAGE = 'ADD_MESSAGE'

export const addMessage = message => {
  return {
    type: ADD_MESSAGE,
    message,
  }
}

export const sendMessage = ({
  message: {
    author,
    body,
  },
  socketClient,
}) => dispatch => {
  socketClient.emit('message', {
    author,
    body,
  }, message => dispatch(addMessage(message)))
}

export const receiveMessage = message => dispatch => dispatch(addMessage(message))
