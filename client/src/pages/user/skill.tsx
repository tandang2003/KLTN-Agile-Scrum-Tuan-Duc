import Icon from '@/components/Icon'
import ListView from '@/components/ListView'
import DialogSkill from '@/components/skill/DialogSkill'
import ItemSkill from '@/components/skill/ItemSkill'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAppDispatch } from '@/context/redux/hook'
import { useGetSkillsQuery } from '@/feature/skill/skill.api'
import { enableDialogSkill } from '@/feature/trigger/trigger.slice'
import { SkillResponse } from '@/types/skill.type'

const UserSkill = () => {
  const { data, isFetching } = useGetSkillsQuery()
  const dispatch = useAppDispatch()
  return (
    <>
      <span className='h3 mb-2 flex items-center gap-2'>
        <Icon icon={'garden:knowledge-base-26'} size={45} />
        <h2>Skills</h2>
        <Button
          className='ml-auto'
          onClick={() => dispatch(enableDialogSkill())}
        >
          <Icon icon='lucide:plus' />
        </Button>
      </span>
      <ScrollArea className='mt-4 h-[200px]'>
        <ListView<SkillResponse>
          data={data}
          className='mr-3 gap-2'
          loading={isFetching}
          emptyComponent={<div>Not has any skills</div>}
          render={(item, index) => <ItemSkill key={index} data={item} />}
        />
        <ScrollArea />
      </ScrollArea>
      <DialogSkill />
    </>
  )
}

export default UserSkill
