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
    getAllStatusFriendRequest: builder.query({
      query: (id) => ({
        url: `/friend/getAll/${id}`,
        method: "GET",
      }),
      providesTags: ["Friend"],
    }),
    getAllSentPendingFriendRequest: builder.query({
      query: (id) => ({
        url: `/friend/Pending/getAll/${id}`,
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
    deleteFriendRequest: builder.mutation({
      query: (id) => ({
        url: `/friend/deleteFriendRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friend"],
    }),
   
  }),
});

 export const {useCreateNewRequestMutation, useDeleteFriendRequestMutation ,useGetAllSentPendingFriendRequestQuery,useGetAllStatusFriendRequestQuery, useGetFriendRequestQuery,useGetAcceptedFriendRequestQuery, useGetOthersAcceptedFriendRequestQuery,useUpdateFriendRequestStatusMutation } = friendApi;

// useGetAllPostQuery