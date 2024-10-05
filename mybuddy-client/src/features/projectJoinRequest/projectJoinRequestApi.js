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
    getAllAcceptedProjectByRequestedTo: builder.query({
      query: (id) => ({
        url: `/project-join-request/Accepted/getProjectOfRequestTo/${id}`,
        method: "GET",
      }),
      providesTags: ["ProjectJoinRequest"],
    }),
    getAllAcceptedProjectByRequestedBy: builder.query({
      query: (id) => ({
        url: `/project-join-request/Accepted/getProjectOfRequestBy/${id}`,
        method: "GET",
      }),
      providesTags: ["ProjectJoinRequest"],
    }),
    getAllAcceptedProjectTeamMember: builder.query({
      query: (id) => ({
        url: `/project-join-request/Accepted/team-member/${id}`,
        method: "GET",
      }),
      providesTags: ["ProjectJoinRequest"],
    }),
    getMyProjectAcceptedProjectTeamMember: builder.query({
      query: ({projectId,id}) => ({
        url: `/project-join-request/Accepted/teamMemberOf/${projectId}/${id}`,
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
    getAllSentProjectJoinRequest: builder.query({
      query: (id) => ({
        url: `/project-join-request/getAll/sentRequest/${id}`,
        method: "GET",
      }),
      providesTags:["ProjectJoinRequest"],
    }),
  }),
});

 export const {useCreateProjectJoinRequestMutation,useGetMyProjectAcceptedProjectTeamMemberQuery,useGetAllProjectJoinRequestQuery, useGetAllSentProjectJoinRequestQuery,
  useGetAllProjectByRequestedByQuery,useGetAllProjectByRequestedToQuery,useGetAllAcceptedProjectTeamMemberQuery,useGetAllAcceptedProjectByRequestedByQuery, useGetAllAcceptedProjectByRequestedToQuery, useDeleteProjectByRequestedByMutation,useUpdateJoinRequestStatusMutation} = projectJoinRequestApi;

