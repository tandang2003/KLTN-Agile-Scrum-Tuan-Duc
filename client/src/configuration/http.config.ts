import envConfig from '@/configuration/env.config'
import axios from 'axios'

const accessToken = '123213'

const appAxios = axios.create({
  baseURL: envConfig.BACKEND_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  withCredentials: true
})

appAxios.interceptors.request.use(
  (config) => {
    // do before sent request
    // get access token from redux
    return config
  },
  (error) => {
    // do if request error
    return Promise.reject(error)
  }
)

appAxios.interceptors.response.use(
  (config) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // extract data in response
    return config
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Check if 401 or 403
    return Promise.reject(error)
  }
)

const manualAxios = axios.create()

export { manualAxios }
export default appAxios
