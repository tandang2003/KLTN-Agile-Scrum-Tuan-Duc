import Editor from '@/components/Editor'
import Message from '@/components/Message'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import messages from '@/constant/message.const'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { useCreateProjectMutation } from '@/feature/project/project.api'
import { getTokenProjectThunk } from '@/feature/project/project.slice'
import {
  CreateProjectFormType,
  CreateProjectForm as CreateProjectFormSchema
} from '@/types/project.type'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type CreateProjectFormProps = {
  setOpenDialog?: (open: boolean) => void
}

const CreateProjectForm = ({ setOpenDialog }: CreateProjectFormProps) => {
  const message = messages.component.project.form.create
  const [createProject] = useCreateProjectMutation()
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.authSlice.user?.id)
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const form = useForm<CreateProjectFormType>({
    resolver: zodResolver(CreateProjectFormSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const handleSubmit = ({ name, description }: CreateProjectFormType) => {
    if (userId && workspaceId) {
      createProject({
        name: name,
        description: description,
        userId: userId,
        workspaceId: workspaceId
      })
        .unwrap()
        .then((response) => {
          dispatch(getTokenProjectThunk(workspaceId))
          toast.success(message.toast.success.message, {
            description: (
              <Message
                template={message.toast.success.description}
                values={{
                  id: response.id,
                  name: response.name
                }}
              />
            )
          })
          setOpenDialog?.(false)
        })
        .catch(() => {
          toast.error(message.toast.failed)
        })
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='[&>*:not(:first-element)]:mt-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{message.name}</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Nhóm 1' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>{message.description}</FormLabel>

                  <FormControl>
                    <Editor
                      {...field}
                      value={field.value}
                      classNameContainer='h-[200px] rounded-md border shadow-sm'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            className='mt-4 w-full'
            type='submit'
            loading={form.formState.isSubmitting}
          >
            {message.submit}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateProjectForm
