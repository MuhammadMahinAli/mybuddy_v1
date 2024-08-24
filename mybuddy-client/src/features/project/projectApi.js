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
    createNewTask: builder.mutation({
      query: ({id,data}) => ({
        url: `/project/create-task/${id}`,
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Project"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/project/delete-task/${taskId}`,
        method: "DELETE",
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
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/deleteProject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
    updateProjectInfo: builder.mutation({
      query: ({id, data}) => ({
        url: `/project/updateProject/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Project"],
    }),
  }),
});

 export const {useUpdateProjectInfoMutation, useCreateNewProjectMutation, useCreateNewTaskMutation , useGetAllProjectQuery, useGetAllProjectByUserQuery,useDeleteProjectMutation, useDeleteTaskMutation } = projectApi;

// useGetAllPostQuery