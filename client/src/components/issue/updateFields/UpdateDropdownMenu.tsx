import Icon from '@/components/Icon'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
type UpdateDropDownMenuProps = {
  onClickAddRelationship?: () => void
  onClickAddSubTask?: () => void
}

const UpdateDropDownMenu = ({
  onClickAddRelationship,
  onClickAddSubTask
}: UpdateDropDownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Icon icon={'ic:baseline-plus'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        <DropdownMenuItem onClick={onClickAddSubTask}>SubTask</DropdownMenuItem>
        <DropdownMenuItem onClick={onClickAddRelationship}>
          Relationship
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UpdateDropDownMenu
