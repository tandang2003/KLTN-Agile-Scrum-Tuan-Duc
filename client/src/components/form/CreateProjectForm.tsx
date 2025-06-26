import Editor from '@/components/Editor'
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
          toast.success(`Create project successful`, {
            description: `Project #${response.id} - ${response.name}`
          })
          setOpenDialog?.(false)
        })
        .catch(() => {
          toast.error('Create project failed')
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='2113xxxx' {...field} />
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
                  <FormLabel>Description</FormLabel>

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
            Create
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateProjectForm
