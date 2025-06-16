import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { Link, useLocation } from 'react-router-dom'
import { Id } from '@/types/other.type'
import { cn } from '@/lib/utils'

type ProjectNavigationProps = {
  id: Id
}

const ProjectNavigation = ({ id }: ProjectNavigationProps) => {
  const { pathname } = useLocation()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            data-active={pathname.includes('/board')}
            className='data-[active=true]:active-tag'
          >
            <Link to={`/manager/workspace/project/${id}/board`}>Board</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className='data-[active=true]:active-tag'
            data-active={pathname.includes('/backlog')}
          >
            <Link to={`/manager/workspace/project/${id}/backlog`}>Backlog</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className='data-[active=true]:active-tag'
            asChild
            data-active={pathname.includes('/report')}
          >
            <Link to={`/manager/workspace/project/${id}/report`}>Report</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default ProjectNavigation
