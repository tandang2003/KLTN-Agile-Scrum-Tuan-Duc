import { setAuthorization } from '@/configuration/http.config'
import { getUserWorkspaceThunk } from '@/feature/workspace/workspace.slice'
import { StorageItem } from '@/lib/const'
import authService from '@/services/auth.service'
import { LoginReq, LoginRes, LogoutReq } from '@/types/auth.type'
import { FieldError } from '@/types/http.type'
import { Id } from '@/types/other.type'
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
  accessToken?: string
  user?: UserAuthType
}

type UserAuthType = {
  id: Id
  name: string
  uniId: string
  role: string
}

const initialState: AuthState = {
  loading: false,
  accessToken: undefined,
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

const restoreSessionThunk = createAsyncThunk<
  {
    accessToken: string
  },
  void
>('auth/restoreSession', async (_, { rejectWithValue, dispatch }) => {
  try {
    const accessToken = sessionStorage.getItem(StorageItem.AccessToken)
    if (!accessToken) return rejectWithValue('No token')
    setAuthorization(accessToken)
    dispatch(getUserWorkspaceThunk())
    return { accessToken: accessToken }
  } catch (_) {
    return rejectWithValue('Token invalid')
  }
})

const logoutThunk = createAsyncThunk<void, LogoutReq>(
  'auth/logout',
  async (req, thunkAPI) => {
    try {
      await authService.logout(req)
    } catch (_) {
      return thunkAPI.rejectWithValue('Token invalid')
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
        const { access_token } = action.payload
        state.user = action.payload.user
        state.isAuth = true
        sessionStorage.setItem(StorageItem.AccessToken, access_token)
        setAuthorization(access_token)
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
      restoreSessionThunk.fulfilled,
      (
        state: AuthState,
        action: PayloadAction<{
          accessToken: string
        }>
      ) => {
        const { accessToken } = action.payload
        state.accessToken = accessToken
        state.user = undefined
        state.error = undefined
        state.isAuth = true
      }
    )
    builder.addCase(restoreSessionThunk.rejected, (state: AuthState) => {
      state.accessToken = undefined
      state.user = undefined
      state.error = undefined
      state.isAuth = false
    })
    // logout
    builder.addMatcher(
      (action) =>
        action.type === logoutThunk.rejected.type ||
        action.type === logoutThunk.fulfilled.type,
      (state) => {
        state.accessToken = undefined
        state.isAuth = false
        state.user = undefined
        state.error = undefined
        sessionStorage.removeItem(StorageItem.AccessToken)
        setAuthorization(undefined)
      }
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
export { loginThunk, restoreSessionThunk, logoutThunk, setUser }
export default authReducer
