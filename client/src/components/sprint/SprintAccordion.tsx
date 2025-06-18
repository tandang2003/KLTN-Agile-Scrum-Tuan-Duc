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

import { getStatusSprint, sortSprintsByDateStart } from '@/lib/sprint.helper'
import { formatDate } from '@/lib/utils'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { useRef, useState } from 'react'
type SprintAccordionProps = {
  sprints: SprintModel[]
}

const SprintAccordion = ({ sprints }: SprintAccordionProps) => {
  const refContent = useRef<HTMLDivElement>(null)
  const [sprintId, setSprintId] = useState<Id | null>(null)

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

      <Accordion type='multiple' className='bg-accent w-full px-2'>
        {sortSprintsByDateStart(sprints).map((item, index) => {
          return (
            <AccordionItem key={item.id} value={item.id}>
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
                  {getStatusSprint(item)}
                </Badge>
                <span className='mr-3 basis-[200px]'>
                  {formatDate(item.start)} - {formatDate(item.end)}
                </span>
              </AccordionTrigger>
              <AccordionContent ref={refContent}>
                {sprintId && (
                  <ListIssueInSprint
                    sprintId={item.id}
                    start={item.start}
                    end={item.end}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default SprintAccordion
