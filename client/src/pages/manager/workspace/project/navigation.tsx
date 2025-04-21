import React from 'react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { Link } from 'react-router-dom'
import { Id } from '@/types/other.type'

type ProjectNavigationProps = {
  id: Id
}

const ProjectNavigation = ({ id }: ProjectNavigationProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to={`/manager/workspace/project/${id}/board`}>Board</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to={`/manager/workspace/project/${id}/backlog`}>Backlog</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default ProjectNavigation
