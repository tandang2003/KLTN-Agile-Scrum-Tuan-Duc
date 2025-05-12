import ListView from '@/components/ListView'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useGetListIssueQuery } from '@/feature/sprint/sprint.api'
import { cn } from '@/lib/utils'
import { IssueResponse } from '@/types/issue.type'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { divide } from 'lodash'
import { useEffect, useRef, useState } from 'react'
type SprintAccordionProps = {
  sprints: SprintModel[]
}

const SprintAccordion = ({ sprints }: SprintAccordionProps) => {
  const refContent = useRef<HTMLDivElement>(null)
  const [sprintId, setSprintId] = useState<Id | null>(null)

  return (
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
              {sprintId && <ListIssue sprintId={sprintId} />}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
type ListIssueProps = {
  sprintId: Id
}

const ListIssue = ({ sprintId }: ListIssueProps) => {
  const { data, isFetching } = useGetListIssueQuery(sprintId, {
    skip: !sprintId
  })
  return (
    <>
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
      />
      <Button
        className='mt-2 w-full justify-start border-none'
        variant={'default'}
      >
        Create issue
      </Button>
    </>
  )
}

export default SprintAccordion
