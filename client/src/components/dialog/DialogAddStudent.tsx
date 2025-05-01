import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChangeEvent, useState } from 'react'
import { Badge } from '@/components/ui/badge'

type DialogAddStudentProps = {} & DialogControllerProps

const DialogAddStudent = ({ open, onOpen }: DialogAddStudentProps) => {
  const [input, setInput] = useState<string>('')
  const [ids, setIds] = useState<string[]>([])
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
  }
  const handleAddId = () => {
    setIds((prev) => [...prev, input])
    setInput('')
  }
  const clearState = () => {
    setInput('')
    setIds([])
  }
  const handleInvite = () => {}
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
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='h-16'>
          <Input
            placeholder='ID Student'
            onChange={handleInput}
            className='peer'
            value={input}
          />
          <div
            className='border-input rounded-md border border-t-0 bg-transparent px-3 py-2 shadow-sm peer-placeholder-shown:hidden hover:cursor-pointer hover:bg-gray-300'
            onClick={() => handleAddId()}
          >
            <Badge>{input}</Badge>
          </div>
        </div>
        <ScrollArea className='min-h-[200px] rounded-xl shadow-md'>
          {ids.map((item, index) => (
            <Badge key={index} className='mt-2 mr-2'>
              {item}
            </Badge>
          ))}
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button className='bg-red-600'>Cancel</Button>
          </DialogClose>
          <Button
            className='bg-yellow-400'
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
