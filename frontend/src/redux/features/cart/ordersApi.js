import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/getBaseUrl'

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/orders`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQuery,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    fetchAllOrders: builder.query({
      query: () => "/",
      providesTags: ["Orders"],
    }),
    fetchOrderById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
    fetchOrderByEmail: builder.query({
      query: (mail) => `/${mail}`,
      providesTags: (result, error, mail) => [{ type: "Orders", mail }],
    }),
    addOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/create-order",
        method: "POST",
        body: newOrder,
        credentials: 'include',
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: (id, ...rest) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
        headers: { "Content-type": "application/json" },
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
    useFetchAllOrdersQuery, 
    useFetchOrderByIdQuery, 
    useFetchOrderByEmailQuery,
    useAddOrderMutation, 
    useUpdateOrderMutation, 
    useDeleteOrderMutation
} = ordersApi
export default ordersApi
