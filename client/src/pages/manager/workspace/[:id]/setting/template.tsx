import DialogCreateSprint from '@/components/dialog/DialogCreateSprint'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

const TemplateTab = () => {
  const [openDialogCreateSprint, setOpenDialogCreateSprint] =
    useState<boolean>(false)
  return (
    <div>
      <Button
        variant='default'
        size='sm'
        onClick={() => {
          setOpenDialogCreateSprint(true)
        }}
      >
        <PlusIcon />
        Create Sprint
      </Button>

      <DialogCreateSprint
        open={openDialogCreateSprint}
        onOpen={setOpenDialogCreateSprint}
      />
    </div>
  )
}

export default TemplateTab
