const worker = new Worker('./redux.worker.js', { type: 'module' })
let listeners = new Map();
const fireListeners = ({ data }) => {
  const { address, props } = data
  const queue = listeners.get(address) || []
  queue.forEach(l => l(props));
}

worker.addEventListener('message', fireListeners, { passive: true });
export const  connect = (address, fn) =>{
  const queue = listeners.has(address)
    ? listeners.get(address)
    : listeners.set(address, []).get(address)
  !queue.includes(fn) && queue.push(fn);
  return () => {
    queue.filter(l => l !== fn)
  }
}
export const dispatch = (action) =>{
    worker.postMessage(action)
  }