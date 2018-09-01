import io from 'socket.io-client'

const setupSocketClient = ({ chatId, clientId }) => {
  const socketClient = io.connect(`/${chatId}`)

  return new Promise((resolve, reject) => {
    try {
      socketClient.emit('requestConnection', { chatId, clientId })
      socketClient.on('clientConnected', ({ isConnected }) => {
        resolve({ socketClient, isConnected })
      })
    } catch(error) {
      console.error(error)
      reject(error)
    }
  })
}

export default setupSocketClient
