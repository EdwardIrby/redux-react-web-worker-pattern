import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
const composeEnhancers = composeWithDevTools({
  realtime: true,
  port: 8000,
})

const store = createStore(
  counter,
  composeEnhancers()
)
self.postMessage({address: 'UPDATE_COUNTER_VALUE', props: store.getState()})
store.subscribe(() =>  {
  self.postMessage({address: 'UPDATE_COUNTER_VALUE', props: store.getState()})
})

self.addEventListener('message', ({ data: action }) => {
  store.dispatch(action);
}, false);
