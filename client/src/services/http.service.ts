import axiosInstance, { manualAxios } from '@/configuration/http.config'
import { AxiosRequestConfig } from 'axios'

const httpService = {
  get: <R>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.get<R>(url, config)
  },
  post: <R, B>(url: string, body: B, config?: AxiosRequestConfig) => {
    return axiosInstance.post<R>(url, body, config)
  },
  put: <R, B>(url: string, body: B, config?: AxiosRequestConfig) => {
    return axiosInstance.put<R>(url, body, config)
  },
  patch: <R, B>(url: string, body: B, config?: AxiosRequestConfig) => {
    return axiosInstance.put<R>(url, body, config)
  },
  delete: <R>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.delete<R>(url, config)
  },
  manual: () => {
    return manualAxios
  }
}

export default httpService
