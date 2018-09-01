const path = require('path')

const express = require('express')
const io = require('socket.io')

const crypto = require('./crypto')

const app = express()
const server = require('http').Server(app)
const socketIo = io(server)

const PORT = process.env.PORT || 3001
const chats = { abc: true }

app.get('/app.html', (req, res) => res.status(403).end('403 Forbidden'))

app.use(express.static(path.join(__dirname, '../../client/build')))

app.get('/c/:chatId', (req, res) => {
  const { chatId } = req.params

  if (chats[chatId]) {
    const filePath = path.join(__dirname, '../../client/build/app.html')
    res.sendFile(filePath)
    console.log(`GET /c/${chatId} - SUCCESS - ${chatId} served`)
  } else {
    res.status(403).end('403 Forbidden')
  }
})

app.get('/api/create', (req, res) => {
  const chatId = crypto.generateKey16()

  chats[chatId] = {
    created: true,
    createTime: (new Date()).getTime(),
    locked: false,
    participants: []
  }

  const chatIo = socketIo.of(`/${chatId}`)

  chatIo.on('connection', socket => {
    socket.on('requestConnection', ({ clientId }) => {
      if (chats[chatId] && chats[chatId].participants.includes(clientId)) {
        socket.emit('clientConnected', { isConnected: true })

        socket.on('message', ({ author, body }, callback) => {
          console.log(`!!! From ${author} - ${body}`)
          socket.broadcast.emit('relayedMessage', { author, body })
          callback({ author, body })
        })
      }
    })
  })

  res.json({ chatId })
  console.log(`GET /api/create - SUCCESS - ${chatId} created`)
  console.log('Current Chats:')
  Object.keys(chats).forEach(chat => console.log(chat))
})

app.get('/api/connect/:chatId', (req, res) => {
  const { chatId } = req.params

  if (chats[chatId]) {
    const clientId = crypto.generateKey16()
    chats[chatId].participants.push(clientId)

    console.log({ participants: chats[chatId].participants })

    res.json({ clientId })
  } else {
    res.status(403).end('403 Forbidden')
  }
})

app.get('/api/lock/:chatId', (req, res) => {
  const { chatId } = req.params

  if (chats[chatId]) {
    chats[chatId].locked = true
    console.log(`GET /api/chat/lock/:chatId - SUCCESS - ${chatId} locked`)
  } else {
    console.error(`GET /api/chat/lock/:chatId - ERROR - ${chatId} does not exist`)
  }
})

server.listen(PORT, error => {
  if (error) {
    console.error(error)
  }

  console.log(`Server running on port ${PORT}`)
})

