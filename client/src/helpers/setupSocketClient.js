import io from 'socket.io-client'

const setupSocketClient = chatId => {
  window.socketClient = io.connect(`/${chatId}`)
  const socketClient = window.socketClient

  return new Promise((resolve, reject) => {
    try {
      socketClient.on('setup', data => {
        socketClient.emit('setup', { fromClient: 'hello' })
        console.log({ data })
        resolve(data)
      }, this)
    } catch(error) {
      console.error(error)
      reject(error)
    }
  })
}

export default setupSocketClient
