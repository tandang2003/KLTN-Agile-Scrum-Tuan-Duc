import { StorageItem } from '@/lib/const'
import authService from '@/services/auth.service'
import { AuthState, LoginReq, LoginRes, LogoutReq } from '@/types/auth.type'
import { ValidationError } from '@/types/http.type'
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction
} from '@reduxjs/toolkit'

const initialState: AuthState = {
  loading: false,
  accessToken: undefined,
  user: undefined,
  error: undefined
}

const loginThunk = createAsyncThunk<LoginRes, LoginReq>(
  'auth/login',
  async (req, { rejectWithValue }) => {
    try {
      const data = await authService.login(req)
      return data.data
    } catch (e) {
      if (e instanceof ValidationError) return rejectWithValue(e.message)
      return rejectWithValue('Can not handle')
    }
  }
)

const restoreSessionThunk = createAsyncThunk<
  {
    accessToken: string
  },
  void
>('auth/restoreSession', async (_, thunkAPI) => {
  const accessToken = sessionStorage.getItem(StorageItem.AccessToken)
  if (!accessToken) return thunkAPI.rejectWithValue('No token')

  // Optional: call backend to fetch user info
  try {
    // const user = await api.getCurrentUser(token)
    return { accessToken: accessToken }
  } catch (_) {
    return thunkAPI.rejectWithValue('Token invalid')
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state: AuthState) => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(
      loginThunk.fulfilled,
      (state: AuthState, action: PayloadAction<LoginRes>) => {
        state.accessToken = action.payload.access_token
        state.user = action.payload.user
        sessionStorage.setItem(
          StorageItem.AccessToken,
          action.payload.access_token
        )
      }
    )
    builder.addCase(loginThunk.rejected, (state: AuthState, action) => {
      state.accessToken = undefined
      state.user = undefined
      state.error = action.payload
        ? { field: 'password', message: action.payload as string }
        : { field: 'password', message: 'Email or password not valid' }
      sessionStorage.removeItem(StorageItem.AccessToken)
    })
    builder.addCase(
      restoreSessionThunk.fulfilled,
      (
        state: AuthState,
        action: PayloadAction<{
          accessToken: string
        }>
      ) => {
        state.accessToken = action.payload.accessToken
        state.user = undefined
        state.error = undefined
      }
    )
    builder.addMatcher(
      (action) =>
        action.type === logoutThunk.rejected.type ||
        action.type === logoutThunk.fulfilled.type,
      (state) => {
        state.accessToken = undefined
        sessionStorage.removeItem(StorageItem.AccessToken)
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
export { loginThunk, restoreSessionThunk, logoutThunk }
const authReducer = authSlice.reducer
export default authReducer
