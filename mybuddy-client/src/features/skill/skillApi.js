import {apiSlice} from "../api/apiSlice";


export const skillApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    addSkills: builder.mutation({
      query: (data) => ({
        url: `/skill/addSkills`,
        method: "POST",
        body: data,
      }),
      invalidateTags: ["Skill"],
    }),
 
   
    getSingleUserSkill: builder.query({
      query: (id) => ({
        url: `/skill/getUserSkillById/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleMemberSkill"],
    }),

    updateSkills: builder.mutation({
      query: ({ id, data }) => ({
        url: `/skill/updateSkills/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Skill"],
    }),
  }),
});

export const { useAddSkillsMutation, useGetSingleUserSkillQuery,useUpdateSkillsMutation  } = skillApi;

