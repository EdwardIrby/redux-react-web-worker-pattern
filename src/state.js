const worker = new Worker('./redux.worker.js', { type: 'module' })
let listeners = new Map();
const fireListeners = ({ data }) => {
  const { address, props } = data
  const fn = listeners.get(address)
  fn(props);
}

worker.addEventListener('message', fireListeners, { passive: true });
export const  connect = (address, fn) =>{
  !listeners.has(address) && listeners.set(address, fn)
  return () => {
    listeners.delete(address)
  }
}
export const dispatch = (action) =>{
    worker.postMessage(action)
  }