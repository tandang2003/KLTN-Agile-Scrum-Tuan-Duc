import { z } from 'zod'

const string = z.string().min(1)
export { string }
