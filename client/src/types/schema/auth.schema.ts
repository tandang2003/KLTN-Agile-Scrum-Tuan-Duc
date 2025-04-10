import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character')

const RegisterSchema = z
  .object({
    uniId: z.string().min(8),
    name: z.string().min(5),
    password: z.string(),
    'confirm-password': z.string()
  })
  .strict()
  .refine((data) => data.password === data['confirm-password'], {
    message: 'Passwords do not match',
    path: ['confirm-password']
  })

type RegisterSchemaType = z.infer<typeof RegisterSchema>

export { RegisterSchema }
export type { RegisterSchemaType }
