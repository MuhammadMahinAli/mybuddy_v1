import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ec2-18-213-245-65.compute-1.amazonaws.com/api/v1",
    credentials:"include"  
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Memmer","SingleMember","Post","SingleMemberPost","Friend","Project","ProjectJoinRequest","Payment","Skill","SingleMemberSkill","SocialInfo","SingleMemberSocialInfo","License","SingleMemberLicense","Experience","SingleMemberExperience"],
});

