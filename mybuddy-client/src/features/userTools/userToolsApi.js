import {apiSlice} from "../api/apiSlice";


export const userToolsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    addTools: builder.mutation({
      query: (data) => ({
        url: "/userTools/add-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["UserTools"],
    }),

    getUserToolsById: builder.query({
      query: (id) => ({
        url: `/userTools/getAll/${id}`,
        method: "GET",
      }),
      providesTags: ["UserTools"],
    }),

  //   updateUserToolsLink: builder.mutation({
  //     query: ({id, data}) => ({
  //       url: `/userTools/updateLink/${id}`,
  //       method: "PUT",
  //       body: data,
  //     }),
  //     invalidateTags: ["UserTools"],
  //   }),
    

  //     deleteUserToolsLink: builder.mutation({
  //     query: (id) => ({
  //       url: `/userTools/deleteLink/${id}`,
  //       method: "DELETE",
  //     }),
  //     invalidatesTags: ["UserTools"],
  //   }),   
  }),
});

 export const { useAddToolsMutation, useGetUserToolsByIdQuery} = userToolsApi;

// useGetAllPostQuery