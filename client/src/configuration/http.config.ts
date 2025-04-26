import envConfig from '@/configuration/env.config'
import {
  FieldError,
  ResponseApiError,
  ValidationError
} from '@/types/http.type'
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios'

const appAxios = axios.create({
  baseURL: envConfig.BACKEND_URL,
  timeout: 1000,
  withCredentials: true
})

const setAuthorization = (accessToken?: string) => {
  appAxios.defaults.headers.common.Authorization = accessToken
    ? `Bearer ${accessToken}`
    : undefined
}

appAxios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // do if request error
    console.error('Error in interceptor req')
    return Promise.reject(error)
  }
)

appAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // extract data in response
    console.info('Interceptor axios response: ', response)
    return response
  },
  (err: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.info('Interceptor axios response error: ', err)
    // Check Error 422 (Error validation form)
    if (err.response?.status === HttpStatusCode.UnprocessableEntity) {
      const error = err as AxiosError<ResponseApiError>

      const code: number =
        error.response?.data.code ?? HttpStatusCode.InternalServerError
      const message: string = error.response?.data.message ?? 'Server Error'
      const errors =
        error.response?.data.error.map(
          (e) =>
            ({
              field: e.field,
              message: e.message
            }) as FieldError
        ) ?? []
      return Promise.reject(
        new ValidationError({ code, message, error: errors })
      )
    }
    // Check if 401 or 403
    return Promise.reject(err)
  }
)

const manualAxios = axios.create()

export { manualAxios, setAuthorization }
export default appAxios
