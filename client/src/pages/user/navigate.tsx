import Icon from '@/components/Icon'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { Link, useLocation } from 'react-router-dom'

const UserNavigate = () => {
  const { pathname } = useLocation()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className='data-[active=true]:active-tag'
            data-active={pathname.includes('/skill')}
          >
            <Link
              to={`/user/skill`}
              className='flex flex-row items-center gap-2'
            >
              <Icon icon={'mdi:idea'} size={30} />
              Kỹ năng
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className='data-[active=true]:active-tag'
            asChild
            data-active={pathname.includes('/course')}
          >
            <Link
              to={`/user/course`}
              className='flex flex-row items-center gap-2'
            >
              <Icon icon={'hugeicons:course'} size={30} />
              Môn học
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default UserNavigate
