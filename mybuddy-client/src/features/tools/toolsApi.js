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

    updateAdminTools: builder.mutation({
      query: ({id, data}) => ({
        url: `/adminTools/updateInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["AdminTools"],
    }),
    

      deleteAdminTool: builder.mutation({
      query: (id) => ({
        url: `/adminTools/deleteTool/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminTools"],
    }),   
  }),
});

 export const { useUpdateAdminToolsMutation,useDeleteAdminToolMutation,useAddNewToolsMutation, useGetAllToolsQuery} = adminToolsApi;

// useGetAllPostQuery