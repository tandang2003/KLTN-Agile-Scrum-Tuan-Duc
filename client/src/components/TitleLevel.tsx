import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

type Level = 'lv-1' | 'lv-2' | 'lv-3' | 'lv-4'

const badgeVariants = cva<{
  level: Record<Level, string>
}>('leading-[1.67] font-bold', {
  variants: {
    level: {
      'lv-1': 'text-2xl ',
      'lv-2': 'text-xl ',
      'lv-3': 'text-lg font-medium',
      'lv-4': 'text-md'
    }
  },
  defaultVariants: {
    level: 'lv-1'
  }
})

const TitleLevel = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'> &
    VariantProps<typeof badgeVariants> & {
      asChild?: boolean
    }
>(({ className, level, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      ref={ref}
      data-slot='badge'
      className={cn(badgeVariants({ level }), className)}
      {...props}
    />
  )
})
TitleLevel.displayName = 'HeadingLevel'

export default TitleLevel
