import userService from '@/services/user.service'
import { UserInfoResponse } from '@/types/user.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: () => ({ data: {} }), // you likely want to replace this with fetchBaseQuery if not using custom service
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserInfoResponse, void>({
      async queryFn() {
        try {
          const response = await userService.getInfo()
          return { data: response.data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: () => {
        return [
          {
            type: 'User' as const,
            id: 'LIST'
          }
        ]
      }
    })
  })
})

export default userApi
export const { useGetUserInfoQuery } = userApi
