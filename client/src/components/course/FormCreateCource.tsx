import Icon from '@/components/Icon'
import SelectCourse from '@/components/course/SelectCourse'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/context/redux/hook'
import { useCreateCourseMutation } from '@/feature/course/course.api'
import { disableDialogCourse } from '@/feature/trigger/trigger.slice'
import {
  CreateCourseSchema,
  CreateCourseSchemaType,
  CreateCourseSchemeParse
} from '@/types/course.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormCreateCourseProps = {}

const FormCreateCourse = ({}: FormCreateCourseProps) => {
  const dispatch = useAppDispatch()
  const [create, { error, isError }] = useCreateCourseMutation()
  const form = useForm<CreateCourseSchemaType>({
    resolver: zodResolver(CreateCourseSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'courses'
  })

  const handleSubmit = (data: CreateCourseSchemaType) => {
    const dataParse = CreateCourseSchemeParse.parse(data)
    return create(dataParse)
      .unwrap()
      .then(() => {
        dispatch(disableDialogCourse())
        toast.success('Thêm môn học thành công')
      })
  }
  return (
    <>
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
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          {fields.map((field, index) => (
            <div key={field.id} className='flex items-start gap-4'>
              <FormField
                name={`courses.${index}.courseId`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <SelectCourse
                      value={field.value}
                      setValue={(value) => {
                        form.setValue(`courses.${index}.courseId`, value)
                      }}
                    />

                    <div className='h-[20px]'>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                name={`courses.${index}.point`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      step='any'
                      className='w-[100px]'
                      {...field}
                      type='number'
                      placeholder='Điểm'
                      min={0}
                      max={10}
                    />
                    <div className='h-[20px]'>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {index !== 0 && (
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => remove(index)}
                >
                  Xoá
                </Button>
              )}
            </div>
          ))}

          <div className='flex justify-end gap-4'>
            <Button
              type='button'
              onClick={() => append({ courseId: '', point: 0 })}
            >
              Thêm môn học
            </Button>

            <Button
              loading={form.formState.isSubmitting}
              type='submit'
              disabled={form.formState.isSubmitting || !fields.length}
              className='success'
            >
              Gửi
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default FormCreateCourse
