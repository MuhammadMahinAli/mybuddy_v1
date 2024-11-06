import {apiSlice} from "../api/apiSlice";


export const paypalFundApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    addPaypalFundInfo: builder.mutation({
      query: (data) => ({
        url: "/paypalFund/addInfo",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["PaypalFund"],
    }),

    // getUsersPaypalLink: builder.query({
    //   query: (id) => ({
    //     url: `/paypalFund/getLink/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["PaypalFund"],
    // }),

    // updatePaypalLink: builder.mutation({
    //   query: ({id, data}) => ({
    //     url: `/paypalFund/updateLink/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidateTags: ["PaypalFund"],
    // }),
    

    //   deletePaypalLink: builder.mutation({
    //   query: (id) => ({
    //     url: `/paypalFund/deleteLink/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["PaypalFund"],
    // }),   
  }),
});

 export const { useAddPaypalFundInfoMutation } = paypalFundApi;

// useGetAllPostQuery