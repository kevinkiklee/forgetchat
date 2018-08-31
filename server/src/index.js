const path = require('path')

const express = require('express')
const io = require('socket.io')

const app = express()
const server = require('http').Server(app)
const serverIo = io(server)

const PORT = process.env.PORT || 3001
const chats = { abc: true }

app.get('/app.html', (req, res) => res.status(403).end('403 Forbidden'))

app.use(express.static(path.join(__dirname, '../../client/build')))

app.get('/c/:chatId', (req, res) => {
  const { chatId } = req.params

  try {
    if (chats[chatId]) {
      const filePath = path.join(__dirname, '../../client/build/app.html')
      res.sendFile(filePath)
      console.log(`GET /c/${chatId} - SUCCESS - ${chatId} served`)
    } else {
      res.status(403).end('403 Forbidden')
    }
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/create', (req, res) => {
  const chatId = Math.random().toString(36).slice(2)

  chats[chatId] = {
    created: true,
    createTime: (new Date()).getTime(),
    locked: false,
  }

  try {
    const chatIo = serverIo.of(`/${chatId}`)

    chatIo.on('connection', socket => {
      chatIo.emit('setup', { fromServer: 'hello' })

      socket.on('setup', data => {
        console.log(data)
      })
    })
  } catch (error) {
    console.error(error)
  }

  try {
    res.json({ chatId })
    console.log(`GET /api/create - SUCCESS - ${chatId} created`)
    console.log('Current Chats:')
    Object.keys(chats).forEach(chat => console.log(chat))
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/validate/:chatId', (req, res) => {
  const { chatId } = req.params
  const isValid = !!chats[chatId]

  try {
    res.json({ isValid })
    console.log(`GET /api/validate/${chatId} - SUCCESS - ${chatId} validated (result: ${isValid})`)
  } catch (error) {
    console.error(error)
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

