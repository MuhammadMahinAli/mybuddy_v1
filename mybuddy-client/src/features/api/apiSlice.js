import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    // credentials:"include"   
    //https://test-two-22w0.onrender.com/api/v1
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Memmer","SingleMember","Post","SingleMemberPost","Friend","Fund","Project","ProjectJoinRequest","Payment","Skill","SingleMemberSkill","SocialInfo","SingleMemberSocialInfo","License","SingleMemberLicense","Experience","SingleMemberExperience","Commit","Meeting", "PostReact"],
});

