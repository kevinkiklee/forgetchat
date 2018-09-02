import io from 'socket.io-client'

const setupSocketClient = ({ chatId, clientId, receiveMessage }) => {
  const socketClient = io.connect(`/${chatId}`)

  return new Promise((resolve, reject) => {
    try {
      socketClient.emit('requestConnection', { chatId, clientId })

      socketClient.on('clientConnected', ({ isConnected }) => {
        socketClient.on('relayedMessage', message => {
          receiveMessage(message)
        })

        resolve({ socketClient, isConnected })
      })
    } catch(error) {
      console.error(error)
      reject(error)
    }
  })
}

export default setupSocketClient
