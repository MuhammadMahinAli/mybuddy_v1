import {apiSlice} from "../api/apiSlice";


export const projectJoinRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createProjectJoinRequest: builder.mutation({
      query: (data) => ({
        url: "/project-join-request/create-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["ProjectJoinRequest"],
    }),
    getAllProjectJoinRequest: builder.query({
      query: () => ({
        url: "/project-join-request/getAll",
        method: "GET",
      }),
      providesTags: ["ProjectJoinRequest"],
    }),
    getAllProjectByRequestedBy: builder.query({
      query: (id) => ({
        url: `/project-join-request/Pending/getProjectOfRequestBy/${id}`,
        method: "GET",
      }),
      providesTags: ["ProjectJoinRequest"],
    }),
    getAllProjectByRequestedTo: builder.query({
      query: (id) => ({
        url: `/project-join-request/Pending/getProjectOfRequestTo/${id}`,
        method: "GET",
      }),
      providesTags: ["ProjectJoinRequest"],
    }),

    updateJoinRequestStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/project-join-request/updateStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["ProjectJoinRequest"],
    }),

    deleteProjectByRequestedBy: builder.mutation({
      query: (id) => ({
        url: `/project-join-request/deleteRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectJoinRequest"],
    }),
  }),
});

 export const {useCreateProjectJoinRequestMutation,useGetAllProjectJoinRequestQuery,
  useGetAllProjectByRequestedByQuery,useGetAllProjectByRequestedToQuery,useDeleteProjectByRequestedByMutation,useUpdateJoinRequestStatusMutation} = projectJoinRequestApi;

