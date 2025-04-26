import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { LoginSchema, LoginsSchemaType } from '@/types/schema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { loginThunk } from '@/feature/auth/auth.slice'
import { useAppDispatch } from '@/context/redux/hook'
import { handleErrorApi } from '@/lib/form'
import { ValidationError } from '@/types/http.type'
import { HOME_PATH } from '@/lib/const'
import { toast } from 'sonner'
import { store } from '@/context/redux/store'

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // fallback path if no previous location
  const from = location.state?.from?.pathname || HOME_PATH

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
        toast.success('Login success, welcome to TaskFlow')
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
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your university id below to login to your account
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
                      <FormLabel>University Id</FormLabel>
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
                      <FormLabel>Password</FormLabel>
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
                  Forgot your password?
                </a>
                <Button
                  type='submit'
                  className='w-full'
                  loading={form.formState.isSubmitting}
                >
                  Login
                </Button>
              </div>

              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <NavLink
                  to='/auth/register'
                  className='underline underline-offset-4'
                >
                  Sign up
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
