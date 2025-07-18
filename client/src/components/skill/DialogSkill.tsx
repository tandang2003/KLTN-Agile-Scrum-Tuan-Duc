import DialogController from '@/components/dialog/DialogController'
import FormSkill from '@/components/skill/FormSkill'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import messages from '@/constant/message.const'
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
          <DialogTitle>{messages.component.skill.dialog.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <FormSkill />
      </DialogContent>
    </DialogController>
  )
}

export default DialogSkill
