import {apiSlice} from "../api/apiSlice";


export const meetingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createNewRequest: builder.mutation({
      query: (data) => ({
        url: "/meeting/new-request",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Meeting"],
    }),

    
    updateMeetingInfo: builder.mutation({
      query: ({id, data}) => ({
        url: `/meeting/update-info/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Meeting"],
    }),

    getAllMeetingByCreator: builder.query({
      query: (id) => ({
        url: `/meeting/getAllMeetingOf/${id}`,
        method: "GET",
      }),
      providesTags: ["Meeting"],
    }),

    getMeetingByMeetingMember: builder.query({
      query: (id) => ({
        url: `/meeting/getMeetingByMeetingMember/${id}`,
        method: "GET",
      }),
      providesTags: ["Meeting"],
    }),
  

    deleteMeeting: builder.mutation({
      query: (id) => ({
        url: `/meeting/deleteMeeting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),
   
  }),
});

 export const {useUpdateMeetingInfoMutation,useGetMeetingByMeetingMemberQuery, useGetAllMeetingByCreatorQuery,useDeleteMeetingMutation } = meetingApi;

// useGetAllPostQuery