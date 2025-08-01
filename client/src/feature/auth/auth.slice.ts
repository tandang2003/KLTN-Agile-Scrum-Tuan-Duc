import workspaceApi from '@/feature/workspace/workspace.api'
import authService from '@/services/auth.service'
import tokenService from '@/services/token.service'
import userService from '@/services/user.service'
import { LoginReq, LogoutReq, RoleType } from '@/types/auth.type'
import { FieldError } from '@/types/http.type'
import { Id } from '@/types/other.type'
import { UserInfoResponse } from '@/types/user.type'
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction
} from '@reduxjs/toolkit'
import { toast } from 'sonner'

type AuthState = {
  loading: boolean
  isAuth?: boolean
  error?: FieldError
  accessToken?: string
  user?: UserAuthType
}

type UserAuthType = {
  id: Id
  name: string
  uniId: string
  role: RoleType
  avatar?: string
}

const initialState: AuthState = {
  loading: false
}

const loginThunk = createAsyncThunk<
  UserInfoResponse & {
    access_token: string
  },
  LoginReq
>('auth/login', async (req, { rejectWithValue }) => {
  try {
    const data = await authService.login(req)
    tokenService.setTokenLocal(data.data.access_token)
    const info = await userService.getInfo()
    return {
      ...info.data,
      access_token: data.data.access_token
    }
  } catch (_) {
    return rejectWithValue('Email or password not right')
  }
})

const restoreUserThunk = createAsyncThunk<UserInfoResponse, void>(
  'auth/user',
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getInfo()
      return data.data
    } catch (_) {
      tokenService.removeTokenLocal()
      return rejectWithValue('Get user workspace failed')
    }
  }
)

const logoutThunk = createAsyncThunk<void, LogoutReq>(
  'auth/logout',
  async (req, { dispatch, rejectWithValue }) => {
    try {
      await authService.logout(req)
    } catch (_) {
      return rejectWithValue('Token invalid')
    } finally {
      tokenService.removeTokenLocal()
      toast.success('Logout by token expired')
      dispatch(workspaceApi.util.resetApiState())
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<UserAuthType>) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state: AuthState) => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(
      loginThunk.fulfilled,
      (
        state: AuthState,
        action: PayloadAction<
          UserInfoResponse & {
            access_token: string
          }
        >
      ) => {
        const user = action.payload
        state.user = {
          id: user.id,
          name: user.name,
          uniId: user.uniId,
          role: user.role,
          avatar: user.avatar?.url
        }

        state.accessToken = action.payload.access_token
        state.isAuth = true
      }
    )
    builder.addCase(loginThunk.rejected, (state: AuthState, action) => {
      state.accessToken = undefined
      state.user = undefined
      state.isAuth = false
      state.error = action.payload
        ? { field: 'password', message: action.payload as string }
        : { field: 'password', message: 'Email or password not valid' }
    })
    builder.addCase(
      restoreUserThunk.fulfilled,
      (state: AuthState, action: PayloadAction<UserInfoResponse>) => {
        const user = action.payload
        state.user = {
          id: user.id,
          name: user.name,
          uniId: user.uniId,
          role: user.role,
          avatar: user.avatar?.url
        }
        state.isAuth = true
      }
    )
    builder.addCase(restoreUserThunk.rejected, (state: AuthState) => {
      state.user = undefined
      state.isAuth = false
    })
    // logout
    builder.addMatcher(
      (action) =>
        action.type === logoutThunk.rejected.type ||
        action.type === logoutThunk.fulfilled.type,
      () => initialState
    )

    builder.addMatcher(isPending, (state) => {
      state.loading = true
    })
    builder.addMatcher(isRejected, (state) => {
      state.loading = false
    })
    builder.addMatcher(isFulfilled, (state) => {
      state.loading = false
    })
  }
})
const authReducer = authSlice.reducer
const { setUser } = authSlice.actions
export { loginThunk, logoutThunk, restoreUserThunk, setUser }
export default authReducer
