import axiosInstance, { manualAxios } from '@/configuration/http.config'

const httpService = {
  get: <R>(url: string) => {
    return axiosInstance.get<R>(url)
  },
  post: <R, B>(url: string, body: B) => {
    return axiosInstance.post<R>(url, body)
  },
  put: <R, B>(url: string, body: B) => {
    return axiosInstance.put<R>(url, body)
  },
  patch: <R, B>(url: string, body: B) => {
    return axiosInstance.put<R>(url, body)
  },
  delete: <R>(url: string) => {
    return axiosInstance.delete<R>(url)
  },
  manual: () => {
    return manualAxios
  }
}

export default httpService
