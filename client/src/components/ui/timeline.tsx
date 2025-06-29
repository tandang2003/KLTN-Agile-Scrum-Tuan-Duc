'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type TimelineContextProps = {
  orientation: 'horizontal' | 'vertical'
}

const TimelineContext = React.createContext<TimelineContextProps | null>(null)

function useTimeline() {
  const context = React.useContext(TimelineContext)
  if (!context) {
    throw new Error('useTimeline must be used within a <Timeline />.')
  }
  return context
}

export interface TimelineProps extends React.ComponentPropsWithoutRef<'ol'> {
  orientation?: 'horizontal' | 'vertical'
}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => {
    return (
      <TimelineContext.Provider value={{ orientation }}>
        <ol
          ref={ref}
          data-slot='timeline'
          role='list'
          data-orientation={orientation}
          className={cn(
            'flex',
            orientation === 'vertical' && 'flex-col',
            className
          )}
          {...props}
        />
      </TimelineContext.Provider>
    )
  }
)
Timeline.displayName = 'Timeline'

export interface TimelineItemProps
  extends React.ComponentPropsWithoutRef<'li'> {
  asChild?: boolean
}
const TimelineItem = React.forwardRef<HTMLElement, TimelineItemProps>(
  ({ className, asChild, ...props }, ref) => {
    const { orientation } = useTimeline()
    const Comp = asChild ? Slot : 'li'

    return (
      <Comp
        ref={ref as any}
        data-slot='timeline-item'
        data-orientation={orientation}
        className={cn(
          'flex gap-4',
          orientation === 'horizontal' && 'flex-col',
          className
        )}
        {...props}
      />
    )
  }
)
TimelineItem.displayName = 'TimelineItem'

export interface TimelineSeparatorProps
  extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  TimelineSeparatorProps
>(({ className, asChild, ...props }, ref) => {
  const { orientation } = useTimeline()
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      ref={ref}
      data-slot='timeline-separator'
      data-orientation={orientation}
      className={cn(
        'flex items-center',
        orientation === 'vertical' && 'flex-col',
        className
      )}
      {...props}
    />
  )
})
TimelineSeparator.displayName = 'TimelineSeparator'

export interface TimelineDotProps
  extends React.ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'outline'
  asChild?: boolean
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ variant = 'default', className, asChild, ...props }, ref) => {
    const { orientation } = useTimeline()
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        data-slot='timeline-dot'
        data-orientation={orientation}
        className={cn(
          "flex size-4 items-center justify-center empty:after:block empty:after:rounded-full empty:after:outline-current [&_svg:not([class*='size-'])]:size-4",
          orientation === 'vertical' && 'mt-1',
          variant === 'default' &&
            'empty:after:size-2.5 empty:after:bg-current',
          variant === 'outline' && 'empty:after:size-2 empty:after:outline',
          className
        )}
        {...props}
      />
    )
  }
)
TimelineDot.displayName = 'TimelineDot'

export interface TimelineConnectorProps
  extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  TimelineConnectorProps
>(({ className, asChild, ...props }, ref) => {
  const { orientation } = useTimeline()
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      ref={ref}
      data-slot='timeline-connector'
      data-orientation={orientation}
      className={cn(
        'bg-border flex-1',
        orientation === 'vertical' && 'my-2 w-0.5',
        orientation === 'horizontal' && 'mx-2 h-0.5',
        className
      )}
      {...props}
    />
  )
})
TimelineConnector.displayName = 'TimelineConnector'

export interface TimelineContentProps
  extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, asChild, ...props }, ref) => {
    const { orientation } = useTimeline()
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        data-slot='timeline-content'
        data-orientation={orientation}
        className={cn(
          'flex-1',
          orientation === 'vertical' && 'pb-7 first:text-right last:text-left',
          orientation === 'horizontal' && 'pr-7',
          className
        )}
        {...props}
      />
    )
  }
)
TimelineContent.displayName = 'TimelineContent'

export interface TimelineTitleProps
  extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}

const TimelineTitle = React.forwardRef<HTMLDivElement, TimelineTitleProps>(
  ({ className, asChild, ...props }, ref) => {
    const { orientation } = useTimeline()
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        data-slot='timeline-title'
        data-orientation={orientation}
        className={className}
        {...props}
      />
    )
  }
)
TimelineTitle.displayName = 'TimelineTitle'

export interface TimelineDescriptionProps
  extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}

const TimelineDescription = React.forwardRef<
  HTMLDivElement,
  TimelineDescriptionProps
>(({ className, asChild, ...props }, ref) => {
  const { orientation } = useTimeline()
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      ref={ref}
      data-slot='timeline-description'
      data-orientation={orientation}
      className={cn('text-muted-foreground text-[0.8em]', className)}
      {...props}
    />
  )
})
TimelineDescription.displayName = 'TimelineDescription'

// Export all
export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  useTimeline
}
