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
  }),
});

 export const {useCreatePostMutation, useGetAllPostQuery,useGetSingleUserPostQuery} = postApi;

