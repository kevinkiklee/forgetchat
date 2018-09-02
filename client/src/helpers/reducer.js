import { combineReducers } from 'redux'
import {
  ADD_MESSAGE,
} from './actions'

const app = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const messages = (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const {
        byId,
        allIds,
        count: prevCount,
      } = state

      const { author, body } = action.message
      const count = prevCount + 1
      const id = `message${count}`

      return {
        byId: {
          ...byId,
          [id]: {
            id,
            author,
            body
          }
        },
        allIds: [ ...allIds, id ],
        count
      }

    default:
      return state
  }
}

const reducer = combineReducers({
  app,
  messages,
})

export default reducer
