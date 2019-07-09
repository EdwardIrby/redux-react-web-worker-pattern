import { createStore } from 'redux'

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

let store = createStore(counter)

store.subscribe(() =>  self.postMessage(store.getState()))

self.addEventListener('message', function(e) {
  const action = e.data;
  store.dispatch(action);
}, false);
