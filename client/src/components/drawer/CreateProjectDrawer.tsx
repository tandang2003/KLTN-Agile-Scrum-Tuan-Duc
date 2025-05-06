import { ReactNode } from 'react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

type CreateProjectDrawerProps = {
  open: boolean
  onOpen: (open: boolean) => void
  children?: ReactNode
}

const CreateProjectDrawer = ({
  open,
  onOpen,
  children
}: CreateProjectDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpen} direction='right'>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CreateProjectDrawer
