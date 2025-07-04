import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { WORKSPACE_PATH } from '@/constant/app.const'
import messages from '@/constant/message.const'
import { useAppDispatch } from '@/context/redux/hook'
import { store } from '@/context/redux/store'
import { loginThunk } from '@/feature/auth/auth.slice'
import { handleErrorApi } from '@/lib/form'
import { cn } from '@/lib/utils'
import { ValidationError } from '@/types/http.type'
import { LoginSchema, LoginsSchemaType } from '@/types/schema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // fallback path if no previous location
  const from = location.state?.from?.pathname || WORKSPACE_PATH

  const form = useForm<LoginsSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      uniId: '',
      password: ''
    }
  })

  const handleSubmit = (value: LoginsSchemaType) => {
    dispatch(loginThunk(value))
      .unwrap()
      .then(() => {
        toast.success(messages.auth.login.success)
        navigate(from, { replace: true })
      })
      .catch(() => {
        const error = store.getState().authSlice.error
        if (error) {
          handleErrorApi({
            error: new ValidationError({
              error: [error]
            }),
            setError: form.setError
          })
        }
      })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Đăng nhập</CardTitle>
          <CardDescription>
            Vui lòng nhập thông tin đăng nhập của bạn để tiếp tục
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className='flex flex-col gap-6'>
                <FormField
                  control={form.control}
                  name='uniId'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel>Mã sinh viên</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder='2113xxxx' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input type='password' {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <a
                  href='#'
                  className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                >
                  Quên mật khẩu?
                </a>
                <Button
                  type='submit'
                  className='w-full'
                  loading={form.formState.isSubmitting}
                >
                  Đăng nhập
                </Button>
              </div>

              <div className='mt-4 text-center text-sm'>
                Nếu bạn chưa có tài khoản?{' '}
                <NavLink
                  to='/auth/register'
                  className='underline underline-offset-4'
                >
                  Đăng ký
                </NavLink>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
