import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAppDispatch } from '@/context/redux/hook'
import { useDeleteSkillMutation } from '@/feature/skill/skill.api'
import { setUpdateDataSkill } from '@/feature/skill/skill.slice'
import { enableDialogSkill } from '@/feature/trigger/trigger.slice'
import { SkillResponse } from '@/types/skill.type'

import { useAlertHost } from '@/components/AleartHost'
import Message from '@/components/Message'
import messages, { getProficiencyDisplayName } from '@/constant/message.const'
import { toast } from 'sonner'

type ItemSkillProps = {
  data: SkillResponse
}

const ItemSkill = ({ data }: ItemSkillProps) => {
  const dispatch = useAppDispatch()
  const [deleteSkill] = useDeleteSkillMutation()
  const { showAlert } = useAlertHost()
  const handleUpdate = () => {
    dispatch(setUpdateDataSkill(data))
    dispatch(enableDialogSkill())
  }

  const handleDelete = () => {
    showAlert({
      title: messages.component.skill.item.alert.title,
      type: 'warning',
      message: (
        <Message
          template={messages.component.skill.item.alert.message}
          values={{
            name: <b className='text-black'>{data.skillName}</b>
          }}
        />
      ),
      onConfirm: () => {
        return deleteSkill(data)
          .unwrap()
          .then(() => {
            toast.success(messages.component.skill.item.toast.delete.success)
          })
          .catch(() => {
            toast.error(messages.component.skill.item.toast.delete.failed)
          })
      }
    })
  }

  return (
    <div className='flex items-center rounded-md border-2 border-gray-200 px-4 py-2 shadow-md'>
      <span className='text-lg'>{data.skillName}</span>
      <Badge className='ml-auto' skillLevel={data.proficiency}>
        {getProficiencyDisplayName(data.proficiency)}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon icon={'ri:more-fill'} className='ml-3' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className='hover-opacity' onClick={handleUpdate}>
            {messages.component.skill.item.update}
          </DropdownMenuItem>

          <DropdownMenuItem className='cancel mt-2' onSelect={handleDelete}>
            {messages.component.skill.item.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ItemSkill
