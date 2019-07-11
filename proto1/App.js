import React, { useState, useEffect } from 'react';
import { dispatch, connect } from './state';
const increment = () => { 
  dispatch({ type: 'INCREMENT' })
}
const decrement = () => {
  dispatch({ type: 'DECREMENT' })
}
export const App = () => {
  const [value, setValue] = useState();
  useEffect(() => {
    const disconnect = connect('UPDATE_COUNTER_VALUE', setValue)
    return () => {
      disconnect()
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