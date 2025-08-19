import LoadingBoundary from '@/components/LoadingBoundary'
import ProjectHeader from '@/components/project/ProjectHeader'
import ProjectSocket from '@/components/project/ProjectSocket'
import ProjectStatus from '@/components/ProjectStatus'
import RefreshSprint from '@/components/RefreshSprint'
import SprintPredict from '@/components/SprintPredict'
import StoreData from '@/components/StoreData'
import StoreVelDiff from '@/components/StoreVelDiff'

import { Skeleton } from '@/components/ui/skeleton'
import SectionContainer from '@/components/wrapper/SectionContainer'
import { useAppDispatch } from '@/context/redux/hook'
import { setSprintFilter } from '@/feature/board/board.slice'
import { useGetProjectQuery } from '@/feature/project/project.api'
import { setSprintCurrent } from '@/feature/sprint/sprint.slice'
import useAppId from '@/hooks/use-app-id'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { toISODateString } from '@/lib/date.helper'
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
  const { workspaceId } = useAppId()

  const { sprint } = useSprintCurrent()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data?.currentSprint) {
      dispatch(
        setSprintCurrent({
          id: data.currentSprint.id,
          start: toISODateString(data.currentSprint.start),
          end: toISODateString(data.currentSprint.end)
        })
      )

      dispatch(
        setSprintFilter({
          id: data.currentSprint.id,
          start: toISODateString(data.currentSprint.start),
          end: toISODateString(data.currentSprint.end)
        })
      )
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
            <ProjectHeader data={data} />
            {projectId && <ProjectSocket projectId={projectId} />}
            <div className='flex items-center justify-between pt-2 pb-4'>
              <ProjectNavigation id={data.id} />

              <div className='flex items-center gap-3'>
                {workspaceId && (
                  <StoreData workspaceId={workspaceId} stage={30} />
                )}
                {workspaceId && (
                  <StoreData workspaceId={workspaceId} stage={50} />
                )}
                {workspaceId && <StoreVelDiff workspaceId={workspaceId} />}
                {projectId && sprint?.id && (
                  <ProjectStatus projectId={projectId} sprintId={sprint?.id} />
                )}
                <RefreshSprint />
                <SprintPredict
                  project={{
                    id: data.id,
                    name: data.name
                  }}
                  sprint={
                    data.currentSprint?.id && data.currentSprint?.title
                      ? {
                          id: data.currentSprint?.id,
                          name: data.currentSprint?.title
                        }
                      : undefined
                  }
                />
              </div>
            </div>
            <Outlet
              context={{
                projectId: data.id,
                currentSprintId: data.currentSprint?.id
              }}
            />
          </>
        )}
      </LoadingBoundary>
    </SectionContainer>
  )
}

export default ProjectPage
