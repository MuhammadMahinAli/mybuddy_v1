import {apiSlice} from "../api/apiSlice";


export const fundApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createNewTodo: builder.mutation({
      query: (data) => ({
        url: "/project-todo/add-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Fund"],
    }),

    createNewIndividualTodo: builder.mutation({
      query: (data) => ({
        url: "/todo/add-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Fund"],
    }),

    getAllProjectTodoByUser: builder.query({
      query: (id) => ({
        url: `/project-todo/getAllOfUser/${id}`,
        method: "GET",
      }),
      providesTags: ["Fund"],
    }),

    getAllTodoByUser: builder.query({
      query: (id) => ({
        url: `/todo/getTodoOfUser/${id}`,
        method: "GET",
      }),
      providesTags: ["Fund"],
    }),

    updateProjectTodo : builder.mutation({
      query: ({projectId, todoId,data}) => ({
        url: `/project-todo/updateProjectTodo/${projectId}/${todoId}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Fund"],
    }),

    updateTodo : builder.mutation({
      query: ({todoId,data}) => ({
        url: `/todo/updateTodo/${todoId}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Fund"],
    }),
    addTodoInProjectTodo : builder.mutation({
      query: ({projectId,data}) => ({
        url: `/project-todo/${projectId}/add-todo`,
        method: "PATCH",
        body: data,
      }),
      invalidateTags: ["Fund"],
    }),


   
    
    createNewRequest: builder.mutation({
      query: (data) => ({
        url: "/fund/new-request",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Fund"],
    }),

    getAllFundRequest: builder.query({
      query: (id) => ({
        url: `/fund/getAll/${id}`,
        method: "GET",
      }),
      providesTags: ["Fund"],
    }),
    getFundByRequestedBy: builder.query({
      query: (id) => ({
        url: `/fund/getFundByRequestedBy/${id}`,
        method: "GET",
      }),
      providesTags: ["Fund"],
    }),
    getFundByRequestedTo: builder.query({
      query: (id) => ({
        url: `/fund/getFundByRequestedTo/${id}`,
        method: "GET",
      }),
      providesTags: ["Fund"],
    }),

    getAllStripeFundInfo : builder.query({
      query: () => ({
        url: `/fund/getAll`,
        method: 'GET',
      }),
      providesTags: ["Fund"],
    }),

    deleteFundRequest: builder.mutation({
      query: (id) => ({
        url: `/fund/deleteFundRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Fund"],
    }),
    updateStripeFundStatus : builder.mutation({
      query: ({id, data}) => ({
        url: `/fund/updateStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Fund"],
    }),
   
  }),
});

 export const {useUpdateTodoMutation,useGetAllTodoByUserQuery,useCreateNewIndividualTodoMutation,useAddTodoInProjectTodoMutation,useUpdateProjectTodoMutation ,useGetAllProjectTodoByUserQuery,useCreateNewTodoMutation,useUpdateStripeFundStatusMutation,useCreateNewRequestMutation, useGetAllStripeFundInfoQuery,useGetFundByRequestedToQuery ,useDeleteFundRequestMutation ,useGetFundByRequestedByQuery,useGetAllFundRequestQuery } = fundApi;

// useGetAllPostQuery