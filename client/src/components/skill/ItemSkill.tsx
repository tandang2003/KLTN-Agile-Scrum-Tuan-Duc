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
import { SkillLevel } from '@/types/model/typeOf'
import { SkillResponse } from '@/types/skill.type'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

type ItemSkillProps = {
  data: SkillResponse
}

const ItemSkill = ({ data }: ItemSkillProps) => {
  const dispatch = useAppDispatch()
  const [deleteSkill] = useDeleteSkillMutation()

  const handleUpdate = () => {
    dispatch(setUpdateDataSkill(data))
    dispatch(enableDialogSkill())
  }

  const handleDelete = () => {
    deleteSkill(data)
      .unwrap()
      .then(() => {
        console.log('Skill deleted successfully')
      })
      .catch((error) => {
        toast.error('Failed to delete skill')
      })
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
          <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely delete skill
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ItemSkill
