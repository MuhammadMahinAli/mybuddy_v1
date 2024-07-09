import {apiSlice} from "../api/apiSlice";
 import { userLoggedIn} from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          console.log("auth",result.data);
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/member/sign-up",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Member"],
    }),
    updateCoverPic: builder.mutation({
      query: ({id, data}) => ({
        url: `/member/updateCoverPic/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["SingleMember"],
    }),
    updateProfilePic: builder.mutation({
      query: ({id, data}) => ({
        url: `/member/updateProfilePic/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["SingleMember"],
    }),
    updateUserInfo: builder.mutation({
      query: ({id, data}) => ({
        url: `/member/updateUserInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["SingleMember"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/member/getAll",
        method: "GET",
      }),
      providesTags: ["Member"],
    }),
    getFilteredUsers: builder.query({
      query: (data) => ({
        url: "/user/filteredUsers",
        method: "POST",
        body: data,
      }),
    }),
    
    deleteUser: builder.mutation({
      query: (email) => ({
        url: `/user/deleteUser/${email}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Member"],
    }),
    
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/member/getUserById/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleMember"],
    }),
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/member/verify-email?token=${token}`,
        method: "GET",
      }),
    }),
  }),
});

 export const {useLoginMutation,useSignUpMutation,useUpdateCoverPicMutation, useUpdateUserInfoMutation,useUpdateProfilePicMutation,useGetAllUsersQuery,useGetFilteredUsersQuery,useGetSingleUserQuery,useDeleteUserMutation,  useVerifyEmailQuery} = authApi;

