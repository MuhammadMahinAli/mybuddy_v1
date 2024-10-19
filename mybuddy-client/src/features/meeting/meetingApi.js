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
        url: `/meeting/deleteMeetingRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),
   
  }),
});

 export const {useGetMeetingByMeetingMemberQuery, useGetAllMeetingByCreatorQuery } = meetingApi;

// useGetAllPostQuery