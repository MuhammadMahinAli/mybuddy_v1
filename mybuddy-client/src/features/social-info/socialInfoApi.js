import {apiSlice} from "../api/apiSlice";


export const socialInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    addSocialInfo: builder.mutation({
      query: (data) => ({
        url: `/socialInfo/add-new`,
        method: "POST",
        body: data,
      }),
      invalidateTags: ["SocialInfo"],
    }),
 
   
    getSingleUserSocialInfo: builder.query({
      query: (id) => ({
        url: `/socialInfo/getSocialInfoByUser/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleMemberSocialInfo"],
    }),

    updateSocialInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/socialInfo/updateSocialInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["SocialInfo"],
    }),
  }),
});
//useGetSingleUserSocialInfoQuery,useUpdateSocialInfoMutation

export const { useAddSocialInfoMutation,useGetSingleUserSocialInfoQuery,useUpdateSocialInfoMutation   } = socialInfoApi;

