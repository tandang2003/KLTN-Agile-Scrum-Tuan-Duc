import DialogCreateIssue from '@/components/dialog/DialogCreateIssue'
import ListIssue from '@/components/sprint/ListIssue'

import SprintAccordionProductBacklog from '@/components/sprint/SprintAccordionProductBacklog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'

import { disableCreateIssue } from '@/feature/trigger/trigger.slice'
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
                Sprint {index + 1}: {item.title}
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
      <Accordion
        type='single'
        collapsible
        className='bg-accent mt-[50px] w-full px-2'
      >
        <SprintAccordionProductBacklog />
      </Accordion>

      <DialogCreateIssue
        open={isCreateIssue}
        onOpen={() => dispatch(disableCreateIssue())}
      />
    </div>
  )
}

export default SprintAccordion
