import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

const SprintAccordionProductBacklog = () => {
  return (
    <AccordionItem key={'backlog'} value={'backlog'}>
      <AccordionTrigger>Product Backlog</AccordionTrigger>
      <AccordionContent></AccordionContent>
    </AccordionItem>
  )
}

export default SprintAccordionProductBacklog
