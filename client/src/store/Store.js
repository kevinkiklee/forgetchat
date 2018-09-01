import devState from './devState'

const deepMerge = (baseObj, updateObj) => {
  const newObj = {}

  Object.keys(updateObj).forEach(key => {
    const baseEntry = baseObj[key]
    let newEntry = updateObj[key]

    if (typeof newEntry === 'object') {
      if (Array.isArray(newEntry)) {
        newEntry = [ ...baseEntry, ...newEntry ]
      } else {
        newEntry = deepMerge(baseEntry, newEntry)
      }
    }

    newObj[key] = newEntry
  })

  return {
    ...baseObj,
    ...newObj
  }
}

const Store = initialState => {
  let state = { ...devState, ...initialState }
  console.log(state);

  const setState = newState => {
    state = deepMerge(state, newState)
    console.log(state);
  }

  const updateMessage = ({ author, body }) => {
    const count = state.messages.count + 1
    const id = `message${count}`

    console.log(`!!! [${id}]: From ${author} - ${body}`)

    setState({
      messages: {
        byId: {
          [id]: {
            id,
            author,
            body
          }
        },
        allIds: [ id ],
        count,
      }
    })
  }

  return {
    chatId: state.chatId,
    clientId: state.clientId,
    getState() {
      return state
    },
    receiveMessage(message) {
      updateMessage(message)
      return this.getState()
    },
  }
}

export default Store
