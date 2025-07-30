import { Outlet } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@/components/ui/breadcrumb'
import Icon from '@/components/Icon'
import { useAppSelector } from '@/context/redux/hook'

const SettingLayout = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  return (
    <section className='container-sidebar'>
      <Breadcrumb className='py-3 pt-2'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              to={`/manager/workspace/${workspaceId}`}
              className='flex items-center gap-2'
            >
              <Icon icon={'weui:back-filled'} />
              Workspace
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Outlet />
    </section>
  )
}

export default SettingLayout
