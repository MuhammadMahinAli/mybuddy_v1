import {apiSlice} from "../api/apiSlice";


export const bankTransferFundApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    addBankTransferFundInfo: builder.mutation({

      query: (data) => ({
        url: "/bankTransferFund/addInfo",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["BankTransferFund"],
    }),

    // getUsersPaypalLink: builder.query({
    //   query: (id) => ({
    //     url: `/bankTransferFund/getLink/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["BankTransferFund"],
    // }),

    // updatePaypalLink: builder.mutation({
    //   query: ({id, data}) => ({
    //     url: `/bankTransferFund/updateLink/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidateTags: ["BankTransferFund"],
    // }),
    

    //   deletePaypalLink: builder.mutation({
    //   query: (id) => ({
    //     url: `/bankTransferFund/deleteLink/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["BankTransferFund"],
    // }),   
  }),
});

 export const { useAddBankTransferFundInfoMutation } = bankTransferFundApi;

// useGetAllPostQuery