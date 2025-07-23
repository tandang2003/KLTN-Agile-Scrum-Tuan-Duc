import { z } from 'zod'

export type Id = string

const stringSchema = z
  .string()
  .trim()
  .min(1, { message: 'Không được để trống' })

const dateRange = z
  .object({
    from: z.date({ required_error: 'Vui lòng chọn ngày bắt đầu' }),
    to: z.date({ required_error: 'Vui lòng chọn ngày kết thúc' })
  })
  .refine(
    (data) => {
      if (data.from && data.to) {
        return data.from <= data.to
      }
      return true
    },
    {
      message: 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu',
      path: ['to']
    }
  )

const dateRangeOptional = z
  .object({
    from: z.date({ required_error: 'Vui lòng chọn ngày bắt đầu' }).optional(),
    to: z.date({ required_error: 'Vui lòng chọn ngày kết thúc' }).optional()
  })
  .refine(
    (data) => {
      if (data.from && data.to) {
        return data.from <= data.to
      }
      return true
    },
    {
      message: 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu',
      path: ['to']
    }
  )

export { dateRange, stringSchema, dateRangeOptional }
