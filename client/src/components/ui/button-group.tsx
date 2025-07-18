'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '@/lib/utils'

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex gap-5', className)}
      {...props}
      ref={ref}
    />
  )
})
ButtonGroup.displayName = RadioGroupPrimitive.Root.displayName

const ButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  {
    icon: React.ReactNode
    label: string
  } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, icon, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'data-[state=checked]:bg-background 2 focus-visible:ring-ring w-[125px] rounded-md border text-center focus:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.RadioGroupIndicator className='relative'>
        <div className='relative'>
          <div className='absolute -ml-2'>{icon}</div>
        </div>
      </RadioGroupPrimitive.RadioGroupIndicator>

      <div className='flex flex-col justify-center'>
        <div className='pt-2 text-sm'>{label}</div>
      </div>
    </RadioGroupPrimitive.Item>
  )
})
ButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { ButtonGroup, ButtonGroupItem }
