import { Outlet, useParams } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@/components/ui/breadcrumb'
import Icon from '@/components/Icon'
import { useAppDispatch } from '@/context/redux/hook'
import { useEffect } from 'react'
import { setCurrentWorkspaceId } from '@/feature/workspace/workspace.slice'

const SettingLayout = () => {
  const { workspaceId } = useParams()

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (workspaceId) {
      dispatch(setCurrentWorkspaceId(workspaceId))
    }
  }, [dispatch, workspaceId])
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
