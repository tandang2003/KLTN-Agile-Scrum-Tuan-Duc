import workspaceApi from '@/feature/workspace/workspace.api'
import authService, { restoreTokenLocal } from '@/services/auth.service'
import { LoginReq, LoginRes, LogoutReq, RoleType } from '@/types/auth.type'
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

type AuthState = {
  loading: boolean
  isAuth?: boolean
  error?: FieldError
  accessToken: string | null
  user?: UserAuthType
}

type UserAuthType = {
  id: Id
  name: string
  uniId: string
  role: RoleType
}

const initialState: AuthState = {
  loading: false,
  accessToken: restoreTokenLocal(),
  isAuth: undefined,
  user: undefined,
  error: undefined
}

const loginThunk = createAsyncThunk<LoginRes, LoginReq>(
  'auth/login',
  async (req, { rejectWithValue }) => {
    try {
      const data = await authService.login(req)
      return data.data
    } catch (_) {
      return rejectWithValue('Email or password not right')
    }
  }
)

const restoreUserThunk = createAsyncThunk<UserInfoResponse, void>(
  'auth/user',
  async (_, { rejectWithValue, signal }) => {
    try {
      const data = await authService.getInfo(signal)
      return data.data
    } catch (_) {
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
      (state: AuthState, action: PayloadAction<LoginRes>) => {
        const { user } = action.payload
        state.user = user
        state.isAuth = true
      }
    )
    builder.addCase(loginThunk.rejected, (state: AuthState, action) => {
      state.accessToken = null
      state.user = undefined
      state.isAuth = false
      state.error = action.payload
        ? { field: 'password', message: action.payload as string }
        : { field: 'password', message: 'Email or password not valid' }
    })
    builder.addCase(
      restoreUserThunk.fulfilled,
      (state: AuthState, action: PayloadAction<UserInfoResponse>) => {
        state.user = action.payload
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
export { loginThunk, logoutThunk, setUser, restoreUserThunk }
export default authReducer
