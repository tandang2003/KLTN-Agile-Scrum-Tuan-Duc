import { FieldError } from '@/types/http.type'

type AuthState = {
  loading: boolean
  error?: FieldError
  accessToken?: string
  user?: {
    id: string
    name: string
    uniId: string
    role: string
  }
}

type RegisterReq = {
  uniId: string
  name: string
  password: string
}

type LoginRes = {
  access_token: string
  user: {
    id: string
    name: string
    uniId: string
    role: string
  }
}

type LogoutReq = {
  accessToken: string
}

type LoginReq = Omit<RegisterReq, 'name'>
export type { RegisterReq, LoginRes, LoginReq, AuthState, LogoutReq }
