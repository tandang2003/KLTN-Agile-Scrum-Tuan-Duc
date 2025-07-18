import ToolTip from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import messages from '@/constant/message.const'
import useAppId from '@/hooks/use-app-id'
import useSprintCurrent from '@/hooks/use-sprint-current'
import aggregateService from '@/services/aggregate.service'
import { Id } from '@/types/other.type'
import { useEffect, useMemo, useState } from 'react'

import { toast } from 'sonner'

type SprintPredictProps = {
  project?: {
    id: Id
    name: string
  }
  sprint?: {
    id: Id
    name: string
  }
}
const SprintPredict = ({ project, sprint }: SprintPredictProps) => {
  const message = messages.component.sprintPredict
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) setLoading(false)
  }, [isOpen])

  const handlePredict = async () => {
    if (!project || !sprint) return
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const res = await aggregateService.createPredict(project.id, sprint.id)
      if (res) toast.success(message.toast.success)
      else toast.warning(message.toast.failed)
    } catch (err) {
      toast.error(messages.other.serverError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{messages.manager.project.predict}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{message.title}</DialogTitle>
          <DialogDescription>{message.description}</DialogDescription>
        </DialogHeader>

        <div>
          {!project || !sprint ? (
            <p className='text-muted-foreground text-sm'>No Sprint</p>
          ) : loading ? (
            <Loading />
          ) : (
            <>
              <div className='flex gap-2'>
                <strong>Nhóm dự đoán:</strong>
                <ToolTip trigger={<span>{project.name}</span>}>
                  {project.id}
                </ToolTip>
              </div>
              <div className='mt-3 flex gap-2'>
                <strong>Sprint dự đoán:</strong>
                <ToolTip trigger={<span>{sprint.name}</span>}>
                  {sprint.id}
                </ToolTip>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' disabled={loading}>
              {message.form.cancel}
            </Button>
          </DialogClose>
          <Button
            className='success'
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? 'Predicting...' : message.form.submit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const Loading = () => (
  <div className='grid place-items-center bg-white/10'>
    <div className='flex w-full flex-col items-center justify-center gap-4'>
      <div className='flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-blue-400 text-4xl text-blue-400'>
        <div className='flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-red-400 text-2xl text-red-400'></div>
      </div>
    </div>
  </div>
)

export default SprintPredict
