import {apiSlice} from "../api/apiSlice";


export const payoneerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createNewRequest: builder.mutation({
      query: (data) => ({
        url: "/payoneer/new-request",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Payoneer"],
    }),

    getUsersPayoneerLink: builder.query({
      query: (id) => ({
        url: `/payoneer/getLink/${id}`,
        method: "GET",
      }),
      providesTags: ["Payoneer"],
    }),

  
    updatePayoneerLink: builder.mutation({
      query: ({id, data}) => ({
        url: `/payoneer/updateLink/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Payoneer"],
    }),

      deletePayoneerLink: builder.mutation({
      query: (id) => ({
        url: `/payoneer/deleteLink/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payoneer"],
    }),
   
  }),
});

 export const {useCreateNewRequestMutation, useDeletePayoneerLinkMutation,useUpdatePayoneerLinkMutation,useGetUsersPayoneerLinkQuery } = payoneerApi;

// useGetAllPostQuery