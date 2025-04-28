import envConfig from '@/configuration/env.config'
import authService from '@/services/auth.service'
import {
  FieldError,
  ResponseApiError,
  ValidationError
} from '@/types/http.type'
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios'
import { toast } from 'sonner'

const appAxios = axios.create({
  baseURL: envConfig.BACKEND_URL,
  timeout: 1000,
  withCredentials: true
})
const manualAxios = axios.create({
  baseURL: envConfig.BACKEND_URL,
  timeout: 1000,
  withCredentials: true
})

// const whiteList = ['/auth/refresh']

const setAuthorization = (accessToken?: string) => {
  appAxios.defaults.headers.common.Authorization = accessToken
    ? `Bearer ${accessToken}`
    : undefined
}

const getAuthorization = () => {
  return appAxios.defaults.headers.common.Authorization
}

appAxios.interceptors.request.use(
  (config) => {
    // const url = config.url
    // const tempToken = config.headers.Authorization
    // console.log(url, getAuthorization)
    // const isInWhiteList = whiteList.some((item) => url?.endsWith(item))
    // config.headers.Authorization = isInWhiteList ? undefined : tempToken
    return config
  },
  (error) => {
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
  async (err: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.info('Interceptor axios response error: ', err)
    const statusCode =
      err.response?.status ?? HttpStatusCode.InternalServerError

    switch (statusCode) {
      // Check Error 422 (Error validation form)
      case HttpStatusCode.UnprocessableEntity: {
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

      case HttpStatusCode.Unauthorized: {
        console.log('Token expired')
        const response = await authService.refresh()
        if (response.code >= 400) {
          toast.error('Refresh token is expired')
          return Promise.reject(err)
        } else {
          const newToken = response.data.access_token

          if (!err.config) {
            return Promise.reject(err)
          }

          err.config.headers = err.config.headers || {}
          err.config.headers['Authorization'] = `Bearer ${newToken}`

          return appAxios(err.config)
        }
      }

      case HttpStatusCode.Forbidden: {
        toast.error('You can not permission to access this resource')
        return Promise.reject(err)
      }

      default:
        return Promise.reject(err)
    }
  }
)

export { manualAxios, setAuthorization, getAuthorization }
export default appAxios
