import {apiSlice} from "../api/apiSlice";


export const conferenceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createNewConference: builder.mutation({
      query: (data) => ({
        url: "/conference/addLink",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Conference"],
    }),

    getUsersConferenceLink: builder.query({
      query: () => ({
        url: `/conference/getLink`,
        method: "GET",
      }),
      providesTags: ["Conference"],
    }),

    updateConferenceLink: builder.mutation({
      query: ({id, data}) => ({
        url: `/conference/updateLink/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Conference"],
    }),
    

      deleteConferenceLink: builder.mutation({
      query: (id) => ({
        url: `/conference/deleteLink/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Conference"],
    }),   
  }),
});

 export const {useCreateNewConferenceMutation, useDeleteConferenceLinkMutation,useUpdateConferenceLinkMutation,useGetUsersConferenceLinkQuery } = conferenceApi;

// useGetAllPostQuery