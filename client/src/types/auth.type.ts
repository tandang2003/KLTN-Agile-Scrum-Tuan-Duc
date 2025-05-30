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
    role: RoleType
  }
}

type RoleType = 'teacher' | 'student' | 'anonymous'

type LogoutReq = {
  accessToken: string
}

type LoginReq = Omit<RegisterReq, 'name'>
export type { RegisterReq, LoginRes, LoginReq, LogoutReq, RoleType }
