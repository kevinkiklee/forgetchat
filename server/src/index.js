const fs = require('fs')
const path = require('path')

const express = require('express')


const PORT = process.env.PORT || 3001
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

const chats = {}

app.get('/', (req, res) => {
  const page = path.join(__dirname, './view/index.html')
  console.log(`GET / - SUCCESS - Index served`)
  res.sendFile(page)
})

app.get('/client/:fileName', (req, res) => {
  const file = path.join(__dirname, `../../client/dist/${req.params.fileName}`)
  console.log(`GET /client/:fileName - SUCCESS - ${file} served`)
  res.sendFile(file)
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

app.get('/abc', (req, res) => {
  // const { chatId } = req.params
  const chatId = 'abc'
  // if (chats[chatId]) {
  if (true) {
    let clientPath
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      clientPath = path.join(__dirname, '../../client/public/index.html')
    } else {
      clientPath = 'http://localhost:3000'
    }

    fs.readFile(clientPath, 'utf8', function read(error, html) {
      if (error) {
        throw error
      }

      console.log(`GET /:chatId - SUCCESS - ${chatId} served`)
      res.send(html.replace(/CHAT_ID/g, chatId))
    })
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
