import {apiSlice} from "../api/apiSlice";


export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createNewProject: builder.mutation({
      query: (data) => ({
        url: "/project/create",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Project"],
    }),
    
    getAllProject: builder.query({
      query: () => ({
        url: "/project/getAll",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    getAllProjectByUser: builder.query({
      query: (id) => ({
        url: `/project/getUserProjectById/${id}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    
   
  }),
});

 export const {useCreateNewProjectMutation, useGetAllProjectQuery, useGetAllProjectByUserQuery } = projectApi;

// useGetAllPostQuery