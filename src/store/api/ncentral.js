import { baseApi } from 'src/store/api/baseApi'

export const NCClientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    NCListClients: builder.query({
      query: () => ({ path: '/api/NCListClients' }),
    }),
  }),
})

export const { useNCListClientsQuery } = NCClientApi
export default NCClientApi
