import Icon from '@/components/Icon'
import Message from '@/components/Message'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import messages from '@/constant/message.const'
import {
  useCreateCourseMutation,
  useGetPrerequisiteCourseQuery
} from '@/feature/course/course.api'
import { useClearGetWorkspaceMutation } from '@/feature/workspace/workspace.api'
import {
  CourseResponseType,
  CreateCourseSchema,
  CreateCourseSchemaType,
  CreateCourseSchemeParse,
  UserCourseResponseType
} from '@/types/course.type'
import { Id } from '@/types/other.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type WorkspaceCourseCheckLayerProps = {
  workspaceId: Id
  course: CourseResponseType
  prerequisiteCourse: UserCourseResponseType[]
}

const WorkspaceCourseCheckLayer = ({
  workspaceId,
  course,
  prerequisiteCourse: prerequisiteCourseOfUser
}: WorkspaceCourseCheckLayerProps) => {
  const message = messages.component.workspaceCourseLayerCheck

  const [open, setIsOpen] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    if (!hasInitialized) {
      const pass = prerequisiteCourseOfUser.every((item) => item.point != 0)
      if (pass) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
      setHasInitialized(true)
    }
  }, [hasInitialized])

  const [clear] = useClearGetWorkspaceMutation()
  const [create, { error, isError }] = useCreateCourseMutation()

  const form = useForm<CreateCourseSchemaType>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      courses: prerequisiteCourseOfUser.map((item) => ({
        courseId: item.course.id,
        point: undefined
      }))
    }
  })

  useEffect(() => {
    if (prerequisiteCourseOfUser.length > 0) {
      form.reset({
        courses: prerequisiteCourseOfUser.map((item) => ({
          courseId: item.course.id,
          point: undefined
        }))
      })
    }
  }, [prerequisiteCourseOfUser])

  const handleSubmit = (data: CreateCourseSchemaType) => {
    const dataParse = CreateCourseSchemeParse.parse(data)
    return create(dataParse)
      .unwrap()
      .then(() => {
        setIsOpen(false)
        toast.success(message.toast.success)
        clear(workspaceId).unwrap()
      })
      .catch(() => {
        toast.error(message.toast.failed)
      })
  }

  if (!hasInitialized) return null // Wait until all is ready

  return (
    <Dialog open={open}>
      <DialogContent close={''}>
        <DialogHeader>
          <DialogTitle>{message.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Message
            template={message.description}
            values={{
              name: course.name
            }}
          />
        </DialogDescription>
        {isError && (
          <Alert variant='destructive' className='flex items-start gap-3'>
            <Icon
              icon={'material-symbols:error'}
              className='size-[24px] text-red-500'
              size={24}
            />
            <div>
              <AlertTitle className=''>Lỗi</AlertTitle>
              <AlertDescription className='text-sm text-red-500'>
                {error as string}
              </AlertDescription>
            </div>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {prerequisiteCourseOfUser.map((item, index) => (
              <FormField
                key={item.course.id}
                name={`courses.${index}.point`}
                render={({ field }) => (
                  <FormItem className='mt-2 flex flex-col gap-2'>
                    <Label>{item.course.name}</Label>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              loading={form.formState.isSubmitting}
              className='mt-2'
              type='submit'
            >
              {message.form.submit}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default WorkspaceCourseCheckLayer
