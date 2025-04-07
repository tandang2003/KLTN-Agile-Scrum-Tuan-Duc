import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React, { useCallback, useEffect, useRef } from 'react'

type CardAddingProps = React.HTMLProps<HTMLDivElement> & {
  setHidden: () => void
}

const CardAdding = ({ className, setHidden }: CardAddingProps) => {
  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current)
        if (!divRef.current.contains(event.target as Node)) {
          // setHidden()
          console.log('Clicked OUTSIDE input')
        } else {
          console.log('Clicked INSIDE input')
        }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Card className={cn('p-1', className)} ref={divRef}>
      <CardContent className='p-0'>
        <form>
          <Input />
        </form>
      </CardContent>
    </Card>
  )
}

export default CardAdding
