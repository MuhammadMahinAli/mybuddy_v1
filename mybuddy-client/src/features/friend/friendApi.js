import {apiSlice} from "../api/apiSlice";


export const friendApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createNewRequest: builder.mutation({
      query: (data) => ({
        url: "/friend/new-request",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Friend"],
    }),

    getFriendRequest: builder.query({
      query: (id) => ({
        url: `/friend/Pending/getFriendRequest/${id}`,
        method: "GET",
      }),
      providesTags: ["Friend"],
    }),

    getAcceptedFriendRequest: builder.query({
      query: (id) => ({
        url: `/friend/accepted/getFriendRequest/${id}`,
        method: "GET",
      }),
      providesTags: ["Friend"],
    }),
    
    getOthersAcceptedFriendRequest: builder.query({
      query: (id) => ({
        url: `/friend/others-accepted/getFriendRequest/${id}`,
        method: "GET",
      }),
      providesTags: ["Friend"],
    }),

    updateFriendRequestStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/friend/updateStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Friend"],
    }),
   
  }),
});

 export const {useCreateNewRequestMutation, useGetFriendRequestQuery,useGetAcceptedFriendRequestQuery, useGetOthersAcceptedFriendRequestQuery,useUpdateFriendRequestStatusMutation } = friendApi;

// useGetAllPostQuery