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
    updateTaskInfo: builder.mutation({
      query: ({projectId,taskId, data}) => ({
        url: `/project/updateTask/${projectId}/${taskId}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Project"],
    }),
    updateProjectMemberRequest: builder.mutation({
      query: ({id, data}) => ({
        url: `/project/${id}/member-request-status`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Project"],
    }),
    updateTaskStatus: builder.mutation({
      query: ({ projectId, taskId, status }) => ({
        url: `/project/${projectId}/tasks/${taskId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidateTags: ["Project"],
    }),
    
    updateSubTaskStatus: builder.mutation({
      query: ({ projectId, taskId, subTaskId, status }) => ({
        url: `/project/${projectId}/tasks/${taskId}/subtasks/${subTaskId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidateTags: ["Project"],
    }),
    updateProjectStatus: builder.mutation({
      query: ({ projectId, completedTask }) => ({
        url: `/project/${projectId}/update-tasks`,
        method: "PUT",
        body: { completedTask },
      }),
      invalidateTags: ["Project"],
    }),
  }),
});

 export const {useUpdateTaskInfoMutation,useUpdateProjectInfoMutation, useUpdateProjectMemberRequestMutation,useCreateNewProjectMutation, useCreateNewTaskMutation , useGetAllProjectQuery, useGetAllProjectByUserQuery,useDeleteProjectMutation, useDeleteTaskMutation, useUpdateTaskStatusMutation, useUpdateSubTaskStatusMutation,useUpdateProjectStatusMutation } = projectApi;

// useGetAllPostQuery