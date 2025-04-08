import React, { useId } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Slash } from 'lucide-react'
import { uuid } from '@/lib/utils'

type OverviewHeaderProps = {
  name: string
  breadcrumbs?: BreadcrumbProps[]
} & React.ComponentProps<'div'>

type BreadcrumbProps = { name: string; href?: string }

const ProjectHeader = ({
  name,
  breadcrumbs = [],
  className
}: OverviewHeaderProps) => {
  return (
    <div className={className}>
      <h2 className='h2 pb-2'>{name}</h2>
      <BreadcrumbHeader breadcrumbs={breadcrumbs} />
    </div>
  )
}

export default ProjectHeader

function BreadcrumbHeader({
  breadcrumbs
}: {
  breadcrumbs?: BreadcrumbProps[]
}) {
  if (!breadcrumbs) return null
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => {
          if (index == 0)
            return (
              <BreadcrumbItem key={uuid()}>
                {item.href ? (
                  <BreadcrumbLink to={item.href}>{item.name}</BreadcrumbLink>
                ) : (
                  item.name
                )}
              </BreadcrumbItem>
            )
          else
            return (
              <React.Fragment key={uuid()}>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink to={item.href}>{item.name}</BreadcrumbLink>
                  ) : (
                    item.name
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
