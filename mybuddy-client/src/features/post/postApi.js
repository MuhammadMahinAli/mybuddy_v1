import {apiSlice} from "../api/apiSlice";


export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts/create-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Post"],
    }),
    getAllPost: builder.query({
      query: () => ({
        url: "/posts/getAll",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getSingleUserPost: builder.query({
      query: (id) => ({
        url: `/posts/getUserPostById/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleMemberPost"],
    }),
    updatePostInfo: builder.mutation({
      query: ({id, data}) => ({
        url: `/posts/update-info/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/deletePost/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

 export const {useDeletePostMutation,useUpdatePostInfoMutation,useCreatePostMutation, useGetAllPostQuery,useGetSingleUserPostQuery} = postApi;

