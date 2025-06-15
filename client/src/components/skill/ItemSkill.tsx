import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAppDispatch } from '@/context/redux/hook'
import { setUpdateDataSkill } from '@/feature/skill/skill.slice'
import { enableDialogSkill } from '@/feature/trigger/trigger.slice'
import { SkillLevel } from '@/types/model/typeOf'
import { SkillResponse } from '@/types/skill.type'
type ItemSkillProps = {
  data: SkillResponse
}

const ItemSkill = ({ data }: ItemSkillProps) => {
  const dispatch = useAppDispatch()
  const handleUpdate = (data: SkillResponse) => {
    dispatch(setUpdateDataSkill(data))
    dispatch(enableDialogSkill())
  }

  return (
    <div className='flex items-center rounded-md border-2 border-gray-200 px-4 py-2 shadow-md'>
      <span className='text-lg'>{data.skillName}</span>
      <Badge className='ml-auto' skillLevel={data.proficiency}>
        {SkillLevel[data.proficiency]}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon icon={'ri:more-fill'} className='ml-3' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() => {
              handleUpdate(data)
            }}
          >
            Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ItemSkill
