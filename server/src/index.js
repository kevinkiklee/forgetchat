const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000
const app = express()

const chats = {}

app.get('/', (req, res) => {
  const staticPage = path.join(__dirname, './index.html')
  res.sendFile(staticPage)
})

app.get('/api/lock/:chatId', (req, res) => {
  const chatId = req.params.chatId

  if (chats[chatId]) {
    chats[chatId].locked = true
    res.send(`GET /api/lock/:chatId - ${chatId} locked`)
  } else {
    res.send(`GET /api/lock/:chatId - ${chatId} does not exist`)
  }
})

app.get('/api/create', (req, res) => {
  const chatId = Math.random().toString(36).slice(2)

  chats[chatId] = {
    created: true,
    createTime: (new Date()).getTime(),
    locked: false,
  }

  console.log(`${chatId} created`);

  res.send(`GET /api/create - ${chatId} created`)
})

app.get('/:chatId', (req, res) => {
  const chatId = req.params.chatId

  if (chats[chatId]) {
    console.log(`GET - ${chatId}`);
    const staticPage = path.join(__dirname, './test.html')
    res.sendFile(staticPage)
  } else {
    res.send(`GET /:chatId - ${chatId} does not exist`)
  }
})

app.listen(PORT, error => {
  if (error) {
    console.error(error)
  }

  console.log(`Server running on port ${PORT}`);
})


