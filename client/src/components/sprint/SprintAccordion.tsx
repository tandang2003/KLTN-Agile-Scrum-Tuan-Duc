import DialogCreateIssue from '@/components/dialog/DialogCreateIssue'
import ListIssue from '@/components/issue/ListIssue'

import ListIssueProductBacklog from '@/components/issue/ListIssueProductBacklog'
import ToolTip from '@/components/Tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'

import { disableCreateIssue } from '@/feature/trigger/trigger.slice'
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
  const isCreateIssue = useAppSelector(
    (state: RootState) => state.triggerSlice.isCreateIssue
  )
  const dispatch = useAppDispatch()
  return (
    <div>
      <Accordion type='single' collapsible className='bg-accent w-full px-2'>
        {sprints.map((item, index) => {
          return (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger
                value={item.id}
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
                <span className='mr-3 ml-auto'>
                  {formatDate(item.start)} - {formatDate(item.end)}
                </span>
              </AccordionTrigger>
              <AccordionContent ref={refContent}>
                {sprintId && (
                  <ListIssue
                    sprintId={sprintId}
                    start={item.start}
                    end={item.end}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      {/* Sprint backlog */}
      <Accordion
        type='single'
        collapsible
        className='bg-accent mt-[50px] w-full px-2'
      >
        <AccordionItem key={'backlog'} value={'backlog'}>
          <AccordionTrigger>Product Backlog</AccordionTrigger>
          <AccordionContent>
            <ListIssueProductBacklog />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <DialogCreateIssue
        open={isCreateIssue}
        onOpen={() => dispatch(disableCreateIssue())}
      />
    </div>
  )
}

export default SprintAccordion
