import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import './app.css'
import Chat from './Chat'

const chatId = window.location.pathname.split('/c/')[1]

try {
  fetch(`/api/validate/${chatId}`)
    .then(res => res.json())
    .then(({ isValid }) => {
      if (isValid) {
        window.socketIo = io.connect(`/${chatId}`)

        ReactDOM.render(<Chat />, document.getElementById('root'))
      }
    })
} catch (error) {
  console.error(error)
}
