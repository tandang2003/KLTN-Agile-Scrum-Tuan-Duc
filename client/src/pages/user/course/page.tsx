import CourseUserItem from '@/components/course/ItemCourseUser'
import DialogCourse from '@/components/course/DialogCourse'
import Icon from '@/components/Icon'
import ListView from '@/components/ListView'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAppDispatch } from '@/context/redux/hook'
import { useGetCourseOfUserQuery } from '@/feature/course/course.api'
import { enableDialogCourse } from '@/feature/trigger/trigger.slice'
import { UserCourseResponseType } from '@/types/course.type'

const UserCoursePage = () => {
  const { data = [], isFetching } = useGetCourseOfUserQuery()
  const dispatch = useAppDispatch()
  return (
    <>
      <span className='h3 mx-3 mt-2 flex items-center gap-2'>
        <Button
          className='ml-auto'
          onClick={() => dispatch(enableDialogCourse())}
        >
          <Icon icon='lucide:plus' />
        </Button>
      </span>
      <ScrollArea className='my-2 min-h-[50px]'>
        <ListView<UserCourseResponseType>
          data={data}
          className='mx-3 gap-2'
          loading={isFetching}
          emptyComponent={
            <div className='mx-3'>Không có dữ liệu về môn học của bạn</div>
          }
          render={(item, index) => <CourseUserItem key={index} data={item} />}
        />
        <ScrollArea />
      </ScrollArea>
      <DialogCourse />
    </>
  )
}

export default UserCoursePage
