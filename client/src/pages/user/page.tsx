import Icon from '@/components/Icon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useGetListWorkspaceQuery } from '@/feature/workspace/workspace.api'
import { ManagerLayoutContextType } from '@/types/route.type'
import { WorkspaceResponse } from '@/types/workspace.type'

import ListViewPagination from '@/components/ListViewPagination'
import { PageRequest } from '@/types/http.type'
import { ReactNode, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const UserPage = () => {
  const { user } = useOutletContext<ManagerLayoutContextType>()

  return (
    <section className='container-sidebar'>
      <div className='h-[200px] rounded-md bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 pb-2 text-white'></div>
      <div className='mt-5 flex gap-3'>
        <div className='border-accent relative flex-1/3 rounded-md border-2 px-4 py-2 shadow'>
          <span className='mt-[100px] block'></span>
          <Avatar className='absolute top-[-100px] ml-[50px] size-[200px]'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <Info />
        </div>
        <div className='flex-2/3'>
          <Workspace />
        </div>
      </div>
    </section>
  )
}

const Info = () => {
  const { user } = useOutletContext<ManagerLayoutContextType>()

  return (
    <div className='mt-3 rounded-md'>
      <LineUserInfo title='Full name' value={user.name} />
      <LineUserInfo title='User Id' value={`#${user.uniId}`} />
      <LineUserInfo
        title='Role'
        value={<Badge role={user.role}>{user.role}</Badge>}
      />
    </div>
  )
}

const Workspace = () => {
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
        <Icon icon={'carbon:workspace'} />
        <h2>Working workspace</h2>
      </span>
      <div>
        <ListViewPagination<WorkspaceResponse>
          view={{
            className: 'min-h-[300px] bg-gray-100 p-2',
            loading: isFetching,
            render: (item, index) => {
              return (
                <div
                  key={item.id}
                  className='border-accent flex gap-4 rounded-md border-2 bg-white p-4 shadow'
                >
                  <span className='line-clamp-1 basis-[100px]'>{item.id}</span>
                  <span>{item.name}</span>
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
          onPageChange={(page) => {}}
        />
      </div>
    </>
  )
}

type LineUserInfoProps = {
  title: ReactNode
  value: ReactNode
}

const LineUserInfo = ({ title, value }: LineUserInfoProps) => {
  return (
    <div className='flex border-b-2 border-gray-300 py-2'>
      <span className='basis-[100px]'>{title}</span>
      <span>{value}</span>
    </div>
  )
}

export default UserPage
