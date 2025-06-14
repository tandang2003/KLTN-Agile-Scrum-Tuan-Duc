import LogoutButton from '@/components/LogoutButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { useAppSelector } from '@/context/redux/hook'
import { cn } from '@/lib/utils'
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard } from 'lucide-react'
import { ComponentProps } from 'react'
import { NavLink } from 'react-router-dom'

type UserDropdownProps = {} & ComponentProps<typeof SidebarMenuButton> &
  ComponentProps<typeof Button>

const UserDropdown = ({ className, ...props }: UserDropdownProps) => {
  const { user } = useAppSelector((state) => state.authSlice)

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='lg'
          className={cn(
            'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer',
            className
          )}
          {...props}
        >
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage alt={user?.name ?? ''} />
            <AvatarFallback className='rounded-lg bg-gray-300'>
              {user.name.charAt(0) ?? ''}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>{user?.name ?? ''}</span>
            <span className='truncate text-xs'>#{user?.uniId ?? ''}</span>
          </div>
          <ChevronsUpDown className='ml-auto size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
        side={'bottom'}
        align='end'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage alt={user?.name ?? ''} />
              <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium'>{user?.name ?? ''}</span>
              <span className='truncate text-xs'>#{user?.uniId ?? ''}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink to={'/manager/workspace'}>Workspaces</NavLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink to={'/user'} className='w-full'>
              <BadgeCheck />
              Account
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton className='w-full' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
