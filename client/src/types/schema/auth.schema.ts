import { stringSchema } from '@/types/other.type'
import { z } from 'zod'
const passwordSchema = () =>
  z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất một chữ in hoa')
    .regex(/[a-z]/, 'Mật khẩu phải có ít nhất một chữ thường')
    .regex(/[0-9]/, 'Mật khẩu phải có ít nhất một số')
    .regex(/[^A-Za-z0-9]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt')

const RegisterSchema = z
  .object({
    uniId: stringSchema.min(8, 'Mã sinh viên phải có ít nhất 8 ký tự'),
    name: stringSchema.min(5, 'Tên phải có ít nhất 5 ký tự'),
    password: passwordSchema(),
    'confirm-password': passwordSchema()
  })
  .strict()
  .refine((data) => data.password === data['confirm-password'], {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirm-password']
  })

type RegisterSchemaType = z.infer<typeof RegisterSchema>

const LoginSchema = z
  .object({
    uniId: z.string().min(1, 'Vui lòng nhập mã sinh viên'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu')
  })
  .strict()
type LoginsSchemaType = z.infer<typeof LoginSchema>

export { RegisterSchema, LoginSchema }
export type { RegisterSchemaType, LoginsSchemaType }
