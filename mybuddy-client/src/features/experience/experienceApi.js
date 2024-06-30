import {apiSlice} from "../api/apiSlice";


export const experienceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    addExperience: builder.mutation({
      query: (data) => ({
        url: `/experience/create-new`,
        method: "POST",
        body: data,
      }),
      invalidateTags: ["Experience"],
    }),
 
   
    getUserExperience: builder.query({
      query: (id) => ({
        url: `/experience/getExperienceByUser/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleMemberExperience"],
    }),

    updateExperience: builder.mutation({
      query: ({ id, data }) => ({
        url: `/experience/updateExperience/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Experience"],
    }),
  }),
});
//useGetSingleUserExperienceQuery,useUpdateExperienceMutation

export const { useAddExperienceMutation,useGetUserExperienceQuery,useUpdateExperienceMutation   } = experienceApi;

