import {apiSlice} from "../api/apiSlice";


export const licenseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    addLicense: builder.mutation({
      query: (data) => ({
        url: `/license/create-new`,
        method: "POST",
        body: data,
      }),
      invalidateTags: ["License"],
    }),
 
   
    getUserLicense: builder.query({
      query: (id) => ({
        url: `/license/getLicenseByUser/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleMemberLicense"],
    }),

    updateLicense: builder.mutation({
      query: ({ id, data }) => ({
        url: `/license/updateLicense/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["License"],
    }),
  }),
});
//useGetSingleUserlicenseQuery,useUpdatelicenseMutation

export const { useAddLicenseMutation,useGetUserLicenseQuery,useUpdateLicenseMutation   } = licenseApi;

