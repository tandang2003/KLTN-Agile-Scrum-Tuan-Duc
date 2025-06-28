import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { Link, useLocation } from 'react-router-dom'
import { Id } from '@/types/other.type'
import RequiredAuth from '@/components/wrapper/RequiredAuth'

type WorkspaceNavigateProps = {
  id: Id
}

const WorkspaceNavigate = ({ id }: WorkspaceNavigateProps) => {
  const { pathname } = useLocation()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            data-active={pathname.includes('/summary')}
            className='data-[active=true]:active-tag'
          >
            <Link to={`/manager/workspace/${id}/summary`}>Summary</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className='data-[active=true]:active-tag'
            data-active={pathname.includes('/project')}
          >
            <Link to={`/manager/workspace/${id}/project`}>Project</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className='data-[active=true]:active-tag'
            asChild
            data-active={pathname.includes('/student')}
          >
            <Link to={`/manager/workspace/${id}/student`}>Student</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <RequiredAuth roles={['teacher']}>
          <NavigationMenuItem>
            <NavigationMenuLink
              className='data-[active=true]:active-tag'
              asChild
              data-active={pathname.includes('/template')}
            >
              <Link to={`/manager/workspace/${id}/template`}>Template</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </RequiredAuth>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default WorkspaceNavigate
