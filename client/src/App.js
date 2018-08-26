import React from 'react'
import ReactDOM from 'react-dom'

import './app.css'
import Chat from './Chat'

const chatId = window.location.pathname.split('/c/')[1]

const app = async () => {
  try {
    const response = await fetch(`/api/validate/${chatId}`)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const { isValid } = await response.json()

    if (isValid) {
      ReactDOM.render(<Chat chatId={chatId} />, document.getElementById('root'))
    }
  } catch (error) {
    throw Error(error)
  }
}

app()
