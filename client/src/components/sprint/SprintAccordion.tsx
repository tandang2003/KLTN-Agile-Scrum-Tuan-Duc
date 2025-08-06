import ListIssueInSprint from '@/components/sprint/ListIssueInSprint'

import BadgeSprint from '@/components/badge/BadgeSprint'
import HtmlViewer from '@/components/HtmlViewer'
import Icon from '@/components/Icon'
import { useSprintSelect } from '@/components/issue/IssueSelectSprintContext'
import ListIssueInProductBacklog from '@/components/sprint/ListIssueInProductBacklog'
import TitleLevel from '@/components/TitleLevel'
import ToolTip from '@/components/Tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useClearGetListIssueMutation } from '@/feature/issue/issue.api'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { sortSprintsByDateStart } from '@/lib/sprint.helper'
import { formatDate } from '@/lib/utils'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { useEffect, useState } from 'react'
type SprintAccordionProps = {
  sprints: SprintModel[]
}

const SprintAccordion = ({ sprints }: SprintAccordionProps) => {
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const [sprintId, setSprintId] = useState<Id | null>(null)
  const [clear] = useClearGetListIssueMutation()
  const { setSprint } = useSprintSelect()

  useEffect(() => {
    if (sprintId) {
      clear({
        sprintId: sprintId
      })
    }
  }, [])

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
                  setSprint({
                    id: item.id,
                    start: item.start,
                    end: item.end
                  })
                  setSprintId(e.currentTarget.value)
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
                <BadgeSprint
                  status={getStatusSprint(item)}
                  className='ml-auto basis-[150px]'
                />
                <Badge>{item.storyPoint}</Badge>
                <Badge>
                  <Icon icon={'material-symbols:online-prediction'} />
                  {formatDate(item.predict)}
                </Badge>
                <Badge
                  className='mr-3 basis-[200px]'
                  statusSprint={getStatusSprint(item)}
                >
                  <Icon icon={'mingcute:time-duration-fill'} />
                  {formatDate(item.start)} - {formatDate(item.end)}
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                <div className='mb-2 flex items-start justify-between gap-2'>
                  <div className='w-full bg-white p-2 shadow'>
                    <TitleLevel level={'lv-2'}>Nội dung thực hiện</TitleLevel>
                    <Separator className='my-2' />
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
