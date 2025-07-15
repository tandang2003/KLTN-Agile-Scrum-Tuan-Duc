import IssueOfSprintDashboardTab from '@/components/dashboard/IssueOfSprintDashboardTab'
import SprintDashboardTab from '@/components/dashboard/SprintDashboardTab'
import HtmlViewer from '@/components/HtmlViewer'
import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { createContext, useContext } from 'react'
import { createCtx } from '@/lib/context.helper'
type SprintDashboardDetailProps = {
  sprint: SprintModel
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

type SprintDashboardDetailSheetContextType = {
  sprint: {
    id: Id
  }
}

const [useSprintDashboardDetailSheet, SprintDashboardDetailSheetProvider] =
  createCtx<SprintDashboardDetailSheetContextType>()

const SprintDashboardDetailSheet = ({
  sprint,
  isOpen,
  onOpenChange
}: SprintDashboardDetailProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className='min-w-[95vw]'>
        <SheetHeader>
          <SheetTitle className='h1'>Thống kê</SheetTitle>
          <h3 className='h3'>Sprint: {sprint.title}</h3>
          <div className='flex items-center gap-3'>
            <Badge className='bg-green-500 text-base text-white'>
              {formatDate(sprint.start)}
            </Badge>
            <Icon icon={'formkit:arrowright'} size={30} />
            <Badge className='bg-red-500 text-base text-white'>
              {formatDate(sprint.end)}
            </Badge>
          </div>
        </SheetHeader>
        <ScrollArea className='h-[70%]'>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Mô tả</AccordionTrigger>
              <AccordionContent>
                <HtmlViewer value={sprint.description} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SprintDashboardDetailSheetProvider
            value={{
              sprint: {
                id: sprint.id
              }
            }}
          >
            <Tabs defaultValue='sprint' className='mt-3'>
              <TabsList>
                <TabsTrigger value='sprint'>Sprint</TabsTrigger>
                <TabsTrigger value='issue'>Issue</TabsTrigger>
              </TabsList>
              <TabsContent value='sprint'>
                <SprintDashboardTab />
              </TabsContent>
              <TabsContent value='issue'>
                <IssueOfSprintDashboardTab />
              </TabsContent>
            </Tabs>
          </SprintDashboardDetailSheetProvider>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>

        <SheetFooter className='mt-3'>
          <div className='flex w-full items-center justify-between'>
            <SheetClose asChild>
              <Button className='cancel ml-auto' variant='outline'>
                Đóng
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SprintDashboardDetailSheet
export { useSprintDashboardDetailSheet }
