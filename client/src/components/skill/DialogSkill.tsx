import DialogController from '@/components/dialog/DialogController'
import FormSkill from '@/components/skill/FormSkill'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { resetUpdateDataSkill } from '@/feature/skill/skill.slice'
import { disableDialogSkill } from '@/feature/trigger/trigger.slice'

type DialogSkillProps = {}

const DialogSkill = ({}: DialogSkillProps) => {
  const dispatch = useAppDispatch()
  const { isOpenDialogSkill } = useAppSelector((state) => state.triggerSlice)
  const handleCloseDialog = () => {
    dispatch(resetUpdateDataSkill())
    dispatch(disableDialogSkill())
  }
  return (
    <DialogController
      open={isOpenDialogSkill}
      onOpen={() => handleCloseDialog()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Skill</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <FormSkill />
      </DialogContent>
    </DialogController>
  )
}

export default DialogSkill
