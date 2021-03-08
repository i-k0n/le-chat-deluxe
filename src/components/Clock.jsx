import { useState, useEffect } from 'react'

// create realtime clock for chat window
export default function Clock() {
  const [date, setDate] = useState(new Date())

  // set format options
  // 3:41 PM March 5, 2021
  const timeOptions = {
    hour: "2-digit", 
    minute: "2-digit"
  }

  const dayOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric"
  }

  function tick() {
    setDate(new Date())
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => {
      clearInterval(timerID)
    }
  })

  return (
    <>
      <div className="clock-time">{date.toLocaleString("en-US", timeOptions)}</div>
      <div className="clock-date">{date.toLocaleString("en-US", dayOptions)}</div>
    </>
  )
}