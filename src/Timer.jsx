import { useRef, useState, useEffect } from 'react'
import './App.css'

function Timer({startTime}) {
  const [time, setTime] = useState(0)
  const intervalRef = useRef(null)

  const formattedTime = startTime
    ? new Date(startTime + time).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      })
    : '00:00:00'
  useEffect(() => {
    if (startTime) {
      intervalRef.current = setInterval(() => {
        console.log(Date.now() - startTime);
        setTime(Date.now() - startTime)
      }, 1000)
      
      // on unmount component
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    } else {
      setTime(0)
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [startTime])

  return (
    <div>
      {formattedTime}
    </div>
  )
}

export default Timer
