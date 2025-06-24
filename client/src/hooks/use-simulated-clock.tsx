import { useEffect, useState } from 'react'

interface UseSimulatedClockOptions {
  initialSimulatedTime: Date
  timeSpeech: number
}

export function useSimulatedClock({
  initialSimulatedTime,
  timeSpeech
}: UseSimulatedClockOptions) {
  const [simulatedTime, setSimulatedTime] = useState(initialSimulatedTime)

  useEffect(() => {
    const realStart = Date.now()
    const simStart = initialSimulatedTime.getTime()

    const interval = setInterval(() => {
      const realElapsedMs = Date.now() - realStart
      const simulatedElapsedMs = realElapsedMs * timeSpeech
      setSimulatedTime(new Date(simStart + simulatedElapsedMs))
    }, 1000) // update every second

    return () => clearInterval(interval)
  }, [initialSimulatedTime, timeSpeech])

  return simulatedTime
}
