import { Editor } from '@/components/blocks/editor-x/editor'
import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  CreateWorkspaceSchema,
  CreateWorkspaceSchemaType
} from '@/types/workspace.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays } from 'date-fns'
import { SerializedEditorState } from 'lexical'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

type CreateWorkspaceFormProps = {
  children?: ReactNode
}

const CreateWorkspaceForm = () => {
  const form = useForm<CreateWorkspaceSchemaType>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      date: {
        from: new Date(),
        to: addDays(new Date(), 20)
      }
    }
  })

  const [editorState, setEditorState] = useState<SerializedEditorState>()

  const onSubmit = (values: CreateWorkspaceSchemaType) => {
    console.log(values)
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    editorSerializedState={editorState}
                    onSerializedChange={(value) => setEditorState(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='numSprint'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Number Sprint</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='timePerSprint'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Time per sprint</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Confirm Password</FormLabel>
                <DatePickerWithRange
                  date={{
                    from: field.value.from,
                    to: field.value.to
                  }}
                  setDate={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='mt-4 w-full' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateWorkspaceForm
