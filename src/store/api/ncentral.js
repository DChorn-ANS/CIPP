import { baseApi } from 'src/store/api/baseApi'

export const NCClientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    NCListClients: builder.query({
      query: ({ tenantDomain }) => ({
        path: '/api/NCListClients',
        params: {
          TenantFilter: tenantDomain,
        },
      }),
    }),
  }),
})

export const {
  useNCListClientsQuery,
} = NCClientApi
export default NCClientApi
