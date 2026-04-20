import { useState } from 'react'
import './App.css'
import Timer from './Timer'

function App() {
  const [startTime, setStartTime] = useState(false)
  const [showTimer, setShowTimer] = useState(false)

  return (
    <>
    <div className='container'>
        {showTimer && <Timer startTime={startTime} />}
        <button onClick={() => setStartTime(!startTime)}>{startTime ? 'Stop' : 'Start'}</button>
        <br />
        <button onClick={() => setShowTimer(!showTimer)}>{showTimer ? 'Hide' : 'Show'}</button>
      </div>
    </>
  )
}

export default App
