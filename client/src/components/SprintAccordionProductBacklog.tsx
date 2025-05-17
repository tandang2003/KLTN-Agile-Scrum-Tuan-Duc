import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ReactNode } from 'react'
type SprintAccordionProductBacklogProps = {
  children: ReactNode
}

const SprintAccordionProductBacklog = () => {
  return (
    <AccordionItem key={'backlog'} value={'backlog'}>
      <AccordionTrigger>Product Backlog</AccordionTrigger>
      <AccordionContent></AccordionContent>
    </AccordionItem>
  )
}

export default SprintAccordionProductBacklog
