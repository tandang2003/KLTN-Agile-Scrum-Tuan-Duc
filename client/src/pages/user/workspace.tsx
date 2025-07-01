import ListViewPagination from '@/components/ListViewPagination'
import { PageRequest } from '@/types/http.type'
import { WorkspaceResponse } from '@/types/workspace.type'
import { useGetListWorkspaceQuery } from '@/feature/workspace/workspace.api'
import Icon from '@/components/Icon'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { NavLink } from 'react-router-dom'

const UserWorkspace = () => {
  const [page, setPage] = useState<PageRequest>({ page: 0, size: 1 })
  const { data, isFetching } = useGetListWorkspaceQuery(
    {
      page: page.page,
      size: page.size
    },
    {
      refetchOnMountOrArgChange: true
    }
  )
  return (
    <>
      <span className='h3 mb-2 flex items-center gap-2'>
        <Icon icon={'carbon:workspace'} size={45} />
        <h2>Working workspace</h2>
      </span>
      <div>
        <ListViewPagination<WorkspaceResponse>
          minHeight='100px'
          view={{
            className: 'bg-gray-100 p-2 gap-2',
            loading: isFetching,
            render: (item) => {
              return (
                <div
                  key={item.id}
                  className='border-accent flex gap-4 rounded-md border-2 bg-white p-4 shadow'
                >
                  <span className='line-clamp-1 basis-[100px]'>{item.id}</span>
                  <NavLink
                    to={`/manager/workspace/${item.id}`}
                    className={'hover:underline'}
                  >
                    {item.name}
                  </NavLink>
                  <div className='ml-auto'>
                    {item.currentSprint && (
                      <Badge
                        statusSprint={'RUNNING'}
                        className='mr-3 text-center'
                      >
                        RUNNING
                      </Badge>
                    )}
                    <span>{item.owner.name}</span>
                  </div>
                </div>
              )
            }
          }}
          page={data}
          onPageChange={(page) => {
            setPage((prev) => ({
              ...prev,
              page: page
            }))
          }}
        />
      </div>
    </>
  )
}
export default UserWorkspace
