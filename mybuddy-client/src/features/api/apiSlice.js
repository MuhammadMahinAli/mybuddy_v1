import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://3.80.196.219/api/v1"  
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Memmer","SingleMember","Post","SingleMemberPost","Friend","Project","ProjectJoinRequest","Payment","Skill","SingleMemberSkill","SocialInfo","SingleMemberSocialInfo","License","SingleMemberLicense","Experience","SingleMemberExperience"],
});

