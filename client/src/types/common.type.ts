import { z } from 'zod'

const string = z.string().trim().min(1)
export { string }
