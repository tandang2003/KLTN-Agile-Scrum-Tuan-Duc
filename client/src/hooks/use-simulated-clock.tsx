import { useEffect, useState } from 'react'

export interface UseSimulatedClockOptions {
  initTime: Date
  timeSpeech: number
  timeEnd?: Date
  onReachedEnd?: (currentSimulatedTime: Date) => void
}

export function useSimulatedClock({
  initTime,
  timeSpeech,
  timeEnd,
  onReachedEnd
}: UseSimulatedClockOptions) {
  const [simulatedTime, setSimulatedTime] = useState(initTime)

  useEffect(() => {
    const realStart = Date.now()
    const simStart = initTime.getTime()

    const interval = setInterval(() => {
      const realElapsedSec = (Date.now() - realStart) / 1000 // in seconds
      const simulatedElapsedMs = realElapsedSec * timeSpeech * 1000 // convert to ms
      const currentSimTime = new Date(simStart + simulatedElapsedMs)

      if (timeEnd && currentSimTime >= timeEnd) {
        setSimulatedTime(timeEnd)
        clearInterval(interval)
        onReachedEnd?.(timeEnd)
      } else {
        setSimulatedTime(currentSimTime)
      }
    }, 1000) // 100ms = smooth updates

    return () => clearInterval(interval)
  }, [initTime.getTime(), timeSpeech, timeEnd?.getTime()]) // use .getTime() to avoid identity traps

  return simulatedTime
}
