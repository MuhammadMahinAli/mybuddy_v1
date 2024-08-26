import {apiSlice} from "../api/apiSlice";


export const commitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createCommit: builder.mutation({
      query: (data) => ({
        url: "/commit/create-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Commit"],
    }),
    getAllCommit: builder.query({
      query: () => ({
        url: "/commit/getAll",
        method: "GET",
      }),
      providesTags: ["Commit"],
    }),
    updateCommitStatus : builder.mutation({
      query: ({id, data}) => ({
        url: `/commit/updateStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Commit"],
    }),
    getCommitByProject: builder.query({
      query: (id) => ({
        url: `/commit/getCommitByProject/${id}`,
        method: "GET",
      }),
      providesTags: ["Commit"],
    }),
  }),
});

 export const {useCreateCommitMutation, useGetAllCommitQuery, useUpdateCommitStatusMutation,useGetCommitByProjectQuery } = commitApi;

