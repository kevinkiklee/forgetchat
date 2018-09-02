import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'
import reducer from './reducer'
import thunk from 'redux-thunk';

const DEV_STATE = {
  app: {
    chatId: '',
    clientId: '',
  },
  messages: {
    byId : {
      message1: {
        id : 'message1',
        author : 'alpha',
        body : 'lorem impsum sit dolor amet',
      },
      message2: {
        id : 'message2',
        author : 'user2',
        body : 'dslfakj asdfj 32423a asd',
      }
    },
    allIds : ['message1', 'message2'],
    count: 2,
  },
}

const setupStore = ({ chatId, clientId }) => {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  })

  const middlwares = [thunk, logger]
  const enhancer = compose(applyMiddleware(...middlwares))

  const initialState = {
    ...DEV_STATE,
    app: {
      chatId,
      clientId,
    }
  }

  return createStore(reducer, initialState, enhancer)
}

export default setupStore
