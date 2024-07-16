import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-two-22w0.onrender.com/api/v1",
    // credentials:"include"  
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Memmer","SingleMember","Post","SingleMemberPost","Friend","Project","ProjectJoinRequest","Payment","Skill","SingleMemberSkill","SocialInfo","SingleMemberSocialInfo","License","SingleMemberLicense","Experience","SingleMemberExperience"],
});

