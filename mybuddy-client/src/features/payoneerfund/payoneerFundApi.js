import {apiSlice} from "../api/apiSlice";


export const payoneerFundApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    addPayoneerFundInfo: builder.mutation({
      query: (data) => ({
        url: "/payoneerFund/addInfo",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["PayoneerFund"],
    }),

    // getUsersPaypalLink: builder.query({
    //   query: (id) => ({
    //     url: `/payoneerFund/getLink/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["PayoneerFund"],
    // }),

    // updatePaypalLink: builder.mutation({
    //   query: ({id, data}) => ({
    //     url: `/payoneerFund/updateLink/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidateTags: ["PayoneerFund"],
    // }),
    

    //   deletePaypalLink: builder.mutation({
    //   query: (id) => ({
    //     url: `/payoneerFund/deleteLink/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["PayoneerFund"],
    // }),   
  }),
});

 export const { useAddPayoneerFundInfoMutation } = payoneerFundApi;

// useGetAllPostQuery