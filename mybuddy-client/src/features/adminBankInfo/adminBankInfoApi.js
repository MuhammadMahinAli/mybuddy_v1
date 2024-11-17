import {apiSlice} from "../api/apiSlice";


export const adminBankInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createNewRequest: builder.mutation({
      query: (data) => ({
        url: "/adminBankInfo/new-request",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["AdminBankInfo"],
    }),

    getAdminBankInfo: builder.query({
      query: (id) => ({
        url: `/adminBankInfo/getAdminBankInfo/${id}`,
        method: "GET",
      }),
      providesTags: ["AdminBankInfo"],
    }),

    updateAdminBankInfo: builder.mutation({
      query: ({id, data}) => ({
        url: `/adminBankInfo/updateAdminBankInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["AdminBankInfo"],
    }),
    

      deleteAdminBankInfo: builder.mutation({
      query: (id) => ({
        url: `/adminBankInfo/deleteAdminBankInfo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminBankInfo"],
    }),   
  }),
});

 export const {useCreateNewRequestMutation, useDeleteAdminBankInfoMutation,useUpdateAdminBankInfoMutation, useGetAdminBankInfoQuery } = adminBankInfoApi;

// useGetAllPostQuery