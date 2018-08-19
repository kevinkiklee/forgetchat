const path = require('path')

const express = require('express')
const io = require('socket.io')

const app = express()
const server = require('http').Server(app)
const serverIo = io(server)

const PORT = process.env.PORT || 3001
const chats = {}

app.use(express.static(path.join(__dirname, '../../client/build')))

app.get('/', (req, res) => {
  console.log(`GET / - SUCCESS - Index served`)
  res.sendFile('index.html')
})

app.get('/api/chat/lock/:chatId', (req, res) => {
  const chatId = req.params.chatId

  if (chats[chatId]) {
    chats[chatId].locked = true
    console.log(`GET /api/chat/lock/:chatId - SUCCESS - ${chatId} locked`)
  } else {
    console.log(`GET /api/chat/lock/:chatId - ERROR - ${chatId} does not exist`)
  }
})

app.get('/api/chat/create', (req, res) => {
  const chatId = Math.random().toString(36).slice(2)

  chats[chatId] = {
    created: true,
    createTime: (new Date()).getTime(),
    locked: false,
  }

  const chatIo = serverIo.of(`/${chatId}`)

  chatIo.on('connection', socket => {
    chatIo.emit('serverMessage', { fromServer: 'hello' })

    socket.on('clientMessage', data => {
      console.log(data)
    })
  })

  console.log(`GET /api/chat/create - SUCCESS - ${chatId} created`)
  res.json({ chatId })
})

server.listen(PORT, error => {
  if (error) {
    console.error(error)
  }

  console.log(`Server running on port ${PORT}`)
})
