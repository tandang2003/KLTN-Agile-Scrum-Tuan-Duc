import React, { useEffect } from 'react'
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
import { Link } from 'react-router-dom'
import { loginThunk } from '@/feature/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { handleErrorApi } from '@/lib/form'
import { ValidationError } from '@/types/http.type'

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const dispatch = useAppDispatch()
  const selector = useAppSelector((state) => state.authSlice)
  const form = useForm<LoginsSchemaType>({
    resolver: zodResolver(LoginSchema)
  })

  const handleSubmit = (value: LoginsSchemaType) => {
    dispatch(loginThunk(value))
  }

  useEffect(() => {
    if (selector.error)
      handleErrorApi({
        error: new ValidationError({
          error: [selector.error]
        }),
        setError: form.setError
      })
  }, [selector])

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>

              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link
                  to='/auth/register'
                  className='underline underline-offset-4'
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
