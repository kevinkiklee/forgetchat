import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import './app.css'
import Chat from './Chat'

fetch('/api/chat/create')
  .then(res => res.json())
  .then(({ chatId }) => {
    const socket = io.connect(`/${chatId}`)

    socket.on('serverMessage', function (data) {
      console.log(data)
      socket.emit('clientMessage', { fromClient: 'hello' })
    })
  })

ReactDOM.render(<Chat />, document.getElementById('root'))
