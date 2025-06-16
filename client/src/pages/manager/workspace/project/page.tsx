import LoadingBoundary from '@/components/LoadingBoundary'
import { Skeleton } from '@/components/ui/skeleton'
import SectionContainer from '@/components/wrapper/SectionContainer'
import { useAppDispatch } from '@/context/redux/hook'
import { setSprintIdFilter } from '@/feature/board/board.slice'
import { useGetProjectQuery } from '@/feature/project/project.api'
import { setProjectCurrent } from '@/feature/project/project.slice'
import ProjectNavigation from '@/pages/manager/workspace/project/navigation'
import { Id } from '@/types/other.type'
import { ProjectDetailResponse } from '@/types/project.type'
import { ProjectParams } from '@/types/route.type'
import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

const ProjectPage = () => {
  const { projectId } = useParams<ProjectParams>()
  const { isFetching, data } = useGetProjectQuery(projectId as Id, {
    skip: !projectId
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (projectId) dispatch(setProjectCurrent(projectId))
  }, [projectId, dispatch])

  useEffect(() => {
    if (data?.currentSprint) {
      dispatch(setSprintIdFilter(data.currentSprint.id))
    }
  }, [data?.currentSprint, dispatch])

  return (
    <SectionContainer className='flex flex-col'>
      <LoadingBoundary<ProjectDetailResponse>
        fallback={''}
        data={data}
        isLoading={isFetching}
        loading={<Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      >
        {(data) => (
          <>
            <div className='rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 pb-2 text-white'>
              <span className='text-sm'>{data.id}</span>
              <h2 className='h2'>{data.name}</h2>
            </div>

            <div className='pt-2 pb-4'>
              <ProjectNavigation id={data.id} />
            </div>
            <Outlet
              context={{
                projectId: data.id,
                currentSprintId: data.currentSprint.id
              }}
            />
          </>
        )}
      </LoadingBoundary>
    </SectionContainer>
  )
}

export default ProjectPage
