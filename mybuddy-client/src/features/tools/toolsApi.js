import {apiSlice} from "../api/apiSlice";


export const adminToolsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    AddNewTools: builder.mutation({
      query: (data) => ({
        url: "/adminTools/add-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["AdminTools"],
    }),

    getAllTools: builder.query({
      query: () => ({
        url: `/adminTools/getAll`,
        method: "GET",
      }),
      providesTags: ["AdminTools"],
    }),

  //   updateAdminToolsLink: builder.mutation({
  //     query: ({id, data}) => ({
  //       url: `/adminTools/updateLink/${id}`,
  //       method: "PUT",
  //       body: data,
  //     }),
  //     invalidateTags: ["AdminTools"],
  //   }),
    

  //     deleteAdminToolsLink: builder.mutation({
  //     query: (id) => ({
  //       url: `/adminTools/deleteLink/${id}`,
  //       method: "DELETE",
  //     }),
  //     invalidatesTags: ["AdminTools"],
  //   }),   
  }),
});

 export const { useAddNewToolsMutation, useGetAllToolsQuery} = adminToolsApi;

// useGetAllPostQuery