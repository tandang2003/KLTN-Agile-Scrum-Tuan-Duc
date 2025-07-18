import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { Link, useLocation } from 'react-router-dom'
import { Id } from '@/types/other.type'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import messages from '@/constant/message.const'

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
            <Link to={`/manager/workspace/${id}/summary`}>
              {messages.manager.workspace.detail.navigate.summary}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <RequiredAuth roles={['teacher']}>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className='data-[active=true]:active-tag'
              data-active={pathname.includes('/project')}
            >
              <Link to={`/manager/workspace/${id}/project`}>
                {messages.manager.workspace.detail.navigate.project}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </RequiredAuth>

        <NavigationMenuItem>
          <NavigationMenuLink
            className='data-[active=true]:active-tag'
            asChild
            data-active={pathname.includes('/student')}
          >
            <Link to={`/manager/workspace/${id}/student`}>
              {messages.manager.workspace.detail.navigate.student}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <RequiredAuth roles={['teacher']}>
          <NavigationMenuItem>
            <NavigationMenuLink
              className='data-[active=true]:active-tag'
              asChild
              data-active={pathname.includes('/template')}
            >
              <Link to={`/manager/workspace/${id}/template`}>
                {messages.manager.workspace.detail.navigate.template}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className='data-[active=true]:active-tag'
              asChild
              data-active={pathname.includes('/report')}
            >
              <Link to={`/manager/workspace/${id}/report`}>
                {messages.manager.workspace.detail.navigate.report}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </RequiredAuth>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default WorkspaceNavigate
