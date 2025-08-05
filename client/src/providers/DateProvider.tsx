import { createCtx } from '@/lib/context.helper'
import { ReactNode, useEffect, useState } from 'react'

type DateProviderType = {
  now: Date
  setNow: (value: Date) => void
}
const [useDate, DateProviderContext] = createCtx<DateProviderType>()

const DateProvider = ({ children }: { children: ReactNode }) => {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    console.log(now)
  }, [now])

  return (
    <DateProviderContext
      value={{
        now,
        setNow
      }}
    >
      {children}
    </DateProviderContext>
  )
}

export { useDate, DateProvider }
