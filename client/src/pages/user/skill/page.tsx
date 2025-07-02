import Icon from '@/components/Icon'
import ListView from '@/components/ListView'
import DialogSkill from '@/components/skill/DialogSkill'
import ItemSkill from '@/components/skill/ItemSkill'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import messages from '@/constant/message.const'
import { useAppDispatch } from '@/context/redux/hook'
import { useGetSkillsQuery } from '@/feature/skill/skill.api'
import { enableDialogSkill } from '@/feature/trigger/trigger.slice'
import { SkillResponse } from '@/types/skill.type'

const UserSkillPage = () => {
  const { data, isFetching } = useGetSkillsQuery()
  const dispatch = useAppDispatch()
  return (
    <>
      <span className='h3 mx-3 mt-2 flex items-center gap-2'>
        <Button
          className='ml-auto'
          onClick={() => dispatch(enableDialogSkill())}
        >
          <Icon icon='lucide:plus' />
        </Button>
      </span>
      <ScrollArea className='my-2 h-[50px]'>
        <ListView<SkillResponse>
          data={data}
          className='mx-3 gap-2'
          loading={isFetching}
          emptyComponent={
            <div className='mx-3'>{messages.user.skill.list.empty}</div>
          }
          render={(item, index) => <ItemSkill key={index} data={item} />}
        />
        <ScrollArea />
      </ScrollArea>
      <DialogSkill />
    </>
  )
}

export default UserSkillPage
