import Editor from '@/components/Editor'
import SelectMember from '@/components/issue/SelectMember'
import { Button } from '@/components/ui/button'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { CreateIssueRequest, CreateIssueSchema } from '@/types/issue.type'
import { issuePriorityList, issueTagList } from '@/types/model/typeOf'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
type CreateIssueFormProps = {
  children: ReactNode
}

const CreateIssueForm = () => {
  const form = useForm<CreateIssueRequest>({
    resolver: zodResolver(CreateIssueSchema)
  })
  const sprintCurrent = useAppSelector(
    (state: RootState) => state.sprintSlice.current
  )

  if (!sprintCurrent) return null

  const handleSubmit = (values: CreateIssueRequest) => {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='flex gap-3'>
          <div className='flex-1 [&>*:not(:first-element)]:mt-3'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
                      markdown=''
                      {...field}
                      classNameContainer='h-[200px] rounded-md border shadow-sm'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='basis-[450px] [&>*:not(:first-child)]:mt-3'>
            <div className='flex gap-3'>
              <FormField
                control={form.control}
                name='start'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Time start</FormLabel>
                    <DatePickerWithPresets
                      date={field.value}
                      setDate={(date) => {
                        if (date) {
                          field.onChange(new Date(date))
                        }
                      }}
                    />
                    <div className='h-[20px]'>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='end'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Time end</FormLabel>
                    <DatePickerWithPresets
                      date={field.value}
                      setDate={(date) => {
                        if (date) {
                          field.onChange(new Date(date))
                        }
                      }}
                    />
                    <div className='h-[20px]'>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {issuePriorityList.map((item) => {
                        return <SelectItem value={item}>{item}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tag'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {issueTagList.map((item) => {
                        return <SelectItem value={item}>{item}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SelectMember
              control={form.control}
              name='assignerId'
              label='Assigner'
            />
            <SelectMember
              control={form.control}
              name='reviewerId'
              label='Reviewer'
            />
          </div>
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
  )
}

export default CreateIssueForm
