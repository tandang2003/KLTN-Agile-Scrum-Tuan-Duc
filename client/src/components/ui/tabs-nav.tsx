'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'

import { cn } from '@/lib/utils'

const TabNav = NavigationMenuPrimitive.Root

const TabNavList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1',
      className
    )}
    {...props}
  />
))
TabNavList.displayName = NavigationMenuPrimitive.List.displayName

const TabNavLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:ring-ring data-[active]:bg-background data-[active]:text-foreground inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:shadow',
      className
    )}
    {...props}
  />
))
TabNavLink.displayName = NavigationMenuPrimitive.Link.displayName

export { TabNav, TabNavList, TabNavLink }
