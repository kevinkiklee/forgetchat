const fs = require('fs')
const path = require('path')

const express = require('express')

const PORT = process.env.PORT || 3001
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

const chats = {}

app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/', (req, res) => {
  console.log(`GET / - SUCCESS - Index served`)
  res.sendFile('index.html')
})

app.get('/api/lock/:chatId', (req, res) => {
  const chatId = req.params.chatId

  if (chats[chatId]) {
    chats[chatId].locked = true
    console.log(`GET /api/lock/:chatId - SUCCESS - ${chatId} locked`)
  } else {
    console.log(`GET /api/lock/:chatId - ERROR - ${chatId} does not exist`)
  }
})

app.get('/api/create', (req, res) => {
  const chatId = Math.random().toString(36).slice(2)

  chats[chatId] = {
    created: true,
    createTime: (new Date()).getTime(),
    locked: false,
  }

  console.log(`GET /api/create - SUCCESS - ${chatId} created`)
  res.send(`GET /api/create - SUCCESS - ${chatId} created`)
})

app.get('/test', (req, res) => {
  const chatId = req.params.chatId

  if (chats[chatId]) {
    res.send('okay')
  } else {
    console.log(`GET /:chatId - ERROR - ${chatId} does not exist`)
    res.send(`GET /:chatId - ERROR - ${chatId} does not exist`)
  }
})

app.get('/room/:chatId', (req, res) => {
  const chatId = req.params.chatId

  if (chats[chatId]) {
    res.send('okay')
  } else {
    console.log(`GET /:chatId - ERROR - ${chatId} does not exist`)
    res.send(`GET /:chatId - ERROR - ${chatId} does not exist`)
  }
})

server.listen(PORT, error => {
  if (error) {
    console.error(error)
  }

  console.log(`Server running on port ${PORT}`)
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
