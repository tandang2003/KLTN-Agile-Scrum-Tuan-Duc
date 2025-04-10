import authService from '@/services/auth.service'
import { AuthState, LoginReq, LoginRes } from '@/types/auth.type'
import { ValidationError } from '@/types/http.type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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
        state.loading = true
        state.accessToken = action.payload.access_token
        state.user = action.payload.user
      }
    )
    builder.addCase(loginThunk.rejected, (state: AuthState, action) => {
      state.loading = false
      state.accessToken = undefined
      state.user = undefined
      state.error = action.payload
        ? { field: 'password', message: action.payload as string }
        : { field: 'password', message: 'Email or password not valid' }
    })
  }
})
export { loginThunk }
const authReducer = authSlice.reducer
export default authReducer
