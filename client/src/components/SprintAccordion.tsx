import ListView from '@/components/ListView'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { IssueResponse } from '@/types/issue.type'
import { SprintModel } from '@/types/model/sprint.model'
type SprintAccordionProps = {
  sprints: SprintModel[]
}

const SprintAccordion = ({ sprints }: SprintAccordionProps) => {
  return (
    <Accordion type='single' collapsible className='w-full'>
      {sprints.map((item) => {
        return (
          <AccordionItem value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <ListIssue />
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
type ListIssueProps = {
  data?: IssueResponse[]
}

const ListIssue = ({ data }: ListIssueProps) => {
  return (
    <ListView<IssueResponse>
      data={data}
      render={(item) => {
        return <div key={item.id}>{item.id}</div>
      }}
    />
  )
}

export default SprintAccordion
