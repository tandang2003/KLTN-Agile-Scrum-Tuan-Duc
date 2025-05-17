import DialogCreateIssue from '@/components/dialog/DialogCreateIssue'
import ListView from '@/components/ListView'
import SprintAccordionProductBacklog from '@/components/sprint/SprintAccordionProductBacklog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { useGetListIssueQuery } from '@/feature/sprint/sprint.api'
import { setCurrentSprint } from '@/feature/sprint/sprint.slice'
import {
  disableCreateIssue,
  enableCreateIssue
} from '@/feature/trigger/trigger.slice'
import { cn } from '@/lib/utils'
import { IssueResponse } from '@/types/issue.type'
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
                value={`sprint-00${index + 1}`}
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

type ListIssueProps = {
  sprintId: Id
  start: Date
  end: Date
}

const ListIssue = ({ sprintId, start, end }: ListIssueProps) => {
  const dispatch = useAppDispatch()

  const { data, isFetching } = useGetListIssueQuery(sprintId, {
    skip: !sprintId
  })
  return (
    <ListView<IssueResponse>
      data={data}
      loading={isFetching}
      className={cn(
        'gap-3',
        !data?.length &&
          'h-[100px] items-center justify-center rounded-sm bg-gray-200'
      )}
      render={(item) => {
        return (
          <div
            className='flex rounded-sm border-2 bg-white px-4 py-2'
            key={item.id}
          >
            <div className='font-semibold'>
              {item.id}: <span>{item.title}</span>
            </div>
            <div className='ml-auto'>
              <Badge status={item.status}>{item.status}</Badge>
            </div>
          </div>
        )
      }}
      append={
        <Button
          className='mt-2 w-full justify-start border-none'
          variant={'default'}
          onClick={() => {
            dispatch(enableCreateIssue())
            dispatch(
              setCurrentSprint({
                id: sprintId,
                start: new Date(start).toISOString(),
                end: new Date(end).toISOString()
              })
            )
          }}
        >
          Create issue
        </Button>
      }
    />
  )
}

export default SprintAccordion
