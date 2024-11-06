import {apiSlice} from "../api/apiSlice";


export const paypalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createNewRequest: builder.mutation({
      query: (data) => ({
        url: "/paypal/new-request",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Paypal"],
    }),

    getUsersPaypalLink: builder.query({
      query: (id) => ({
        url: `/paypal/getLink/${id}`,
        method: "GET",
      }),
      providesTags: ["Paypal"],
    }),

    updatePaypalLink: builder.mutation({
      query: ({id, data}) => ({
        url: `/paypal/updateLink/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Paypal"],
    }),
    

      deletePaypalLink: builder.mutation({
      query: (id) => ({
        url: `/paypal/deleteLink/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Paypal"],
    }),   
  }),
});

 export const {useCreateNewRequestMutation, useDeletePaypalLinkMutation,useUpdatePaypalLinkMutation,useGetUsersPaypalLinkQuery } = paypalApi;

// useGetAllPostQuery