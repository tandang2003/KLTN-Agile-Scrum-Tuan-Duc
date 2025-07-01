import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAppSelector } from '@/context/redux/hook'
import workspaceApi, {
  useInviteStudentWorkspaceMutation
} from '@/feature/workspace/workspace.api'
import { HttpStatusCode } from '@/constant/app.const'
import { cn } from '@/lib/utils'
import userService from '@/services/user.service'
import { Id } from '@/types/other.type'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

type DialogAddStudentProps = {
  workspaceId: Id
} & DialogControllerProps

const DialogAddStudent = ({
  workspaceId,
  open,
  onOpen
}: DialogAddStudentProps) => {
  const uniId = useAppSelector((state) => state.authSlice.user?.uniId)
  const [input, setInput] = useState<string>('')
  const [ids, setIds] = useState<string[]>([])
  const [inviteStudent] = useInviteStudentWorkspaceMutation()

  const handleAddId = async () => {
    if (!input) return
    if (input.length != 8) {
      toast.error('ID Student need 8 character')
      return
    }
    if (uniId && uniId === input) {
      toast.error('You can not invite your self')
      return
    }
    try {
      const res = await userService.checkUserExist(input)
      if (res.code === HttpStatusCode.Ok) {
        setIds((prev) => [...prev, input])
        setInput('')
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return
      }
      if (axios.isAxiosError(error))
        switch (error.response?.status) {
          case HttpStatusCode.Conflict: {
            toast.warning(error.response.data['message'])
            break
          }
          case HttpStatusCode.NotFound: {
            setInput('')
            toast.error(`Student ${input} is not exist`)
            break
          }

          default:
            return
        }
      console.error(error)
    }
  }

  const handleInvite = async () => {
    try {
      await inviteStudent({
        workspaceId,
        studentIds: ids
      }).unwrap()
      onOpen(!open)
      toast.success(`Invite student ${ids.join(', ')} success`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case HttpStatusCode.Conflict: {
            const idsError = error.response.data['error']
            const idsSuccess = ids.filter((id) => !idsError.includes(id))
            if (idsSuccess.length) {
              workspaceApi.util.invalidateTags([
                { type: 'Workspaces', id: 'LIST' }
              ])
            }

            toast.success(`Invite student ${idsSuccess.join(', ')} success`)
            toast.warning(`Student ${idsError.join(', ')} is in project`)
            break
          }
          default:
        }
      }
    } finally {
      clearState()
    }
  }

  const clearState = () => {
    setIds([])
  }

  return (
    <DialogController
      open={open}
      onOpen={(open) => {
        clearState()
        onOpen(open)
      }}
    >
      <DialogContent
        className='sm:max-w-[70vw]'
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          document.body.style.pointerEvents = ''
        }}
      >
        <DialogHeader>
          <DialogTitle>Invite students</DialogTitle>
          <DialogDescription>
            Student will add to workspace immediately
          </DialogDescription>
        </DialogHeader>
        <div className='h-16'>
          <Input
            placeholder='ID Student'
            className='peer'
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
          />
          <div
            className='border-input rounded-md border border-t-0 bg-transparent px-3 py-2 shadow-sm peer-placeholder-shown:hidden hover:cursor-pointer hover:bg-gray-300'
            onClick={() => handleAddId()}
          >
            {input && <Badge>{input}</Badge>}
          </div>
        </div>
        <ScrollArea className='min-h-[200px] rounded-xl shadow-md'>
          {ids.map((item, index) => (
            <Badge key={index} className='mt-2 mr-2 text-sm'>
              {item}
              <Icon
                className='ml-2 hover:cursor-pointer hover:opacity-40'
                icon={'openmoji:cross-mark'}
                onClick={() => {
                  setIds((prev) => [...prev.filter((i) => item !== i)])
                }}
              />
            </Badge>
          ))}
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button className='bg-red-600'>Cancel</Button>
          </DialogClose>
          <Button
            className={cn(
              'bg-yellow-400',
              ids.length === 0 && 'hover:cursor-not-allowed'
            )}
            disabled={ids.length === 0}
            onClick={handleInvite}
          >
            Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogController>
  )
}

export default DialogAddStudent
