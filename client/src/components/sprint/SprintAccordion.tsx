import ListIssueInSprint from '@/components/sprint/ListIssueInSprint'

import ListIssueInProductBacklog from '@/components/sprint/ListIssueInProductBacklog'
import ToolTip from '@/components/Tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/Icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { sortSprintsByDateStart } from '@/lib/sprint.helper'
import { formatDate } from '@/lib/utils'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { useRef, useState } from 'react'
import { getSprintStatusDisplayName } from '@/constant/message.const'
import useSprintCurrent from '@/hooks/use-sprint-current'
import HtmlViewer from '@/components/HtmlViewer'
import { useAppDispatch } from '@/context/redux/hook'
import { enableSprintUpdateTime } from '@/feature/trigger/trigger.slice'
import useAppId from '@/hooks/use-app-id'
import { toISODateString } from '@/lib/date.helper'
type SprintAccordionProps = {
  sprints: SprintModel[]
}

const SprintAccordion = ({ sprints }: SprintAccordionProps) => {
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const refContent = useRef<HTMLDivElement>(null)
  const [sprintId, setSprintId] = useState<Id | null>(null)
  const { projectId } = useAppId()
  const dispatch = useAppDispatch()
  const handleOpenUpdate = (sprintId: Id, start: Date, end: Date) => {
    if (!projectId || !sprintId) return
    dispatch(
      enableSprintUpdateTime({
        projectId: projectId,
        sprintId: sprintId,
        start: toISODateString(start),
        end: toISODateString(end)
      })
    )
  }
  return (
    <div>
      {/* Sprint backlog */}
      <Accordion
        type='single'
        collapsible
        className='bg-accent mb-[50px] w-full px-2'
      >
        <AccordionItem key={'backlog'} value={'backlog'}>
          <AccordionTrigger>Product Backlog</AccordionTrigger>
          <AccordionContent>
            <ListIssueInProductBacklog />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {sortSprintsByDateStart(sprints).map((item, index) => {
        return (
          <Accordion
            key={item.id}
            type='single'
            collapsible
            className='bg-accent w-full px-2'
          >
            <AccordionItem value={item.id}>
              <AccordionTrigger
                value={item.id}
                className='gap-2'
                onClick={(e) => {
                  if (refContent.current) {
                    setSprintId(e.currentTarget.value)
                  }
                }}
              >
                <ToolTip
                  trigger={
                    <span>
                      Sprint {index + 1} : {item.title}
                    </span>
                  }
                >
                  {item.id}
                </ToolTip>
                <Badge
                  statusSprint={getStatusSprint(item)}
                  className='ml-auto basis-[100px]'
                >
                  {getSprintStatusDisplayName(getStatusSprint(item))}
                </Badge>
                <span className='mr-3 basis-[200px]'>
                  {formatDate(item.start)} - {formatDate(item.end)}
                </span>
              </AccordionTrigger>
              <AccordionContent ref={refContent}>
                <div className='mb-2 flex items-start justify-between gap-2'>
                  <div>
                    <span className='text-xl font-bold'>
                      Nội dung thực hiện
                    </span>
                    <HtmlViewer value={item.description} />
                  </div>
                </div>

                {sprintId && (
                  <ListIssueInSprint
                    sprintId={item.id}
                    start={item.start}
                    end={item.end}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      })}
    </div>
  )
}

export default SprintAccordion
