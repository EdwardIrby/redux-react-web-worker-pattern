import React, { useState, useEffect } from 'react';

const reduxWorker = new Worker('./redux.worker.js', { type: 'module' })

const increment = () => {
  reduxWorker.postMessage({ type: 'INCREMENT' })
}
const decrement = () => {
  reduxWorker.postMessage({ type: 'DECREMENT' })
}
export const App = () => {
  const [value, setValue] = useState();
  useEffect(() => {
    reduxWorker.onmessage = e=> {
      const newValue = e.data;
      setValue(newValue)
    }
  })
  return(
    <div style={{ display: 'grid' }}>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <h3>{value}</h3>
    </div>
  )
}