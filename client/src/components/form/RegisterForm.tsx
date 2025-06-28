import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { handleErrorApi } from '@/lib/form'
import { cn } from '@/lib/utils'
import authService from '@/services/auth.service'
import { ValidationError } from '@/types/http.type'
import { RegisterSchema, RegisterSchemaType } from '@/types/schema/auth.schema'
import { HttpStatusCode } from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema)
  })
  const navigate = useNavigate()

  const onSubmit = async (value: RegisterSchemaType) => {
    try {
      const data = await authService.register({
        uniId: value.uniId,
        name: value.name,
        password: value.password
      })
      if (data) {
        toast.success('Register success, please login')
        navigate('/auth/login', {
          replace: true
        })
        return
      }
    } catch (e: any) {
      if (e instanceof ValidationError) {
        handleErrorApi({
          error: e,
          setError: form.setError
        })
        return
      }
      if (e.status === HttpStatusCode.Conflict) {
        handleErrorApi({
          error: new ValidationError({
            error: [
              {
                field: 'uniId',
                message: 'Account with university id exits'
              }
            ]
          }),
          setError: form.setError
        })
        return
      }
      toast.warning('Error but not handle')
    }
  }

  return (
    <div
      className={cn('rounded-sm border-2 px-10 py-9 shadow-2xl', className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='uniId'
            render={({ field }) => (
              <FormItem>
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
            name='name'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Nguyen Van A' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirm-password'
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-4 w-full' type='submit'>
            Submit
          </Button>

          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <NavLink to='/auth/login' className='underline underline-offset-4'>
              Login
            </NavLink>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm
