import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { IssueStatus, SkillLevel, SprintStatusType } from '@/types/model/typeOf'

const badgeVariants = cva<{
  variant: {
    default: string
    secondary: string
    destructive: string
    outline: string
  }
  skillLevel: Record<SkillLevel, string>
  status: Record<IssueStatus, string>
  statusSprint: Record<SprintStatusType, string>
}>(
  'inline-flex items-center justify-center rounded-md border px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90 rounded-xl',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
      },
      status: {
        TODO: 'text-white bg-yellow-600 font-semibold',
        INPROCESS: 'text-black bg-blue-300 font-semibold',
        REVIEW: 'text-white bg-red-500 font-semibold',
        DONE: 'text-black bg-green-300 font-semibold'
      },
      statusSprint: {
        PENDING: 'text-black bg-gray-400 font-semibold',
        COMPLETE: 'text-white bg-green-500 font-semibold',
        RUNNING: 'text-white bg-blue-500 font-semibold'
      },
      skillLevel: {
        '1': 'text-white bg-red-500 font-semibold',
        '2': 'text-white bg-yellow-500 font-semibold',
        '3': 'text-black bg-blue-300 font-semibold',
        '4': 'text-black bg-green-300 font-semibold',
        '5': 'text-white bg-purple-500 font-semibold'
      }
    },

    defaultVariants: {
      variant: 'default',
      status: 'TODO'
    }
  }
)

function Badge({
  className,
  variant,
  status,
  statusSprint,
  skillLevel,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot='badge'
      className={cn(
        badgeVariants({ variant, status, statusSprint, skillLevel }),
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
