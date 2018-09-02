import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import setupStore from './helpers/setupStore'

import './reset.css'
import './app.css'
import Chat from './components/Chat'

const chatId = window.location.pathname.split('/c/')[1]

const app = async () => {
  try {
    const response = await fetch(`/api/connect/${chatId}`)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const { clientId } = await response.json()

    if (clientId) {
      const store = setupStore({ chatId, clientId })

      ReactDOM.render(
        <Provider store={store}>
          <Chat />
        </Provider>,
        document.getElementById('root')
      )
    }
  } catch (error) {
    document.querySelector('#root').innerHTML = 'chatroom does not exist'
  }
}

app()
