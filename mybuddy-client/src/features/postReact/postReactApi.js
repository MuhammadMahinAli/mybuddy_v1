import {apiSlice} from "../api/apiSlice";


export const postReactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createPost: builder.mutation({
      query: (data) => ({
        url: "/PostReact/create-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["PostReact"],
    }),
    getAllPost: builder.query({
      query: () => ({
        url: "/PostReact/getAll",
        method: "GET",
      }),
      providesTags: ["PostReact"],
    }),
    getSinglePostAllReact: builder.query({
      query: (id) => ({
        url: `/PostReact/allReactions/${id}`,
        method: "GET",
      }),
      providesTags: ["PostReact"],
    }),
  }),
});

 export const {useCreatePostMutation, useGetAllPostQuery,useGetSinglePostAllReactQuery} = postReactApi;

