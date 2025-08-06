import { createCtx } from '@/lib/context.helper'
<<<<<<< HEAD
import { ReactNode, useState } from 'react'
=======
import { ReactNode, useEffect, useState } from 'react'
>>>>>>> origin/dev

type DateProviderType = {
  now: Date
  setNow: (value: Date) => void
}
const [useDate, DateProviderContext] = createCtx<DateProviderType>()

const DateProvider = ({ children }: { children: ReactNode }) => {
  const [now, setNow] = useState<Date>(new Date())

<<<<<<< HEAD
=======
  useEffect(() => {
    console.log(now)
  }, [now])

>>>>>>> origin/dev
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
