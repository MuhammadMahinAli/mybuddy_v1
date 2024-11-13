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

    getAllBankTransferFundInfo : builder.query({
      query: () => ({
        url: `/bankTransferFund/getAll`,
        method: 'GET',
      }),
      providesTags: ["BankTransferFund"],
    }),

    updateBankFundStatus : builder.mutation({
      query: ({id, data}) => ({
        url: `/bankTransferFund/updateStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["BankTransferFund"],
    }),
    getBankFundByRequestedTo: builder.query({
      query: (id) => ({
        url: `/bankTransferFund/getFundByRequestedTo/${id}`,
        method: "GET",
      }),
      providesTags: ["BankTransferFund"],
    }),

    deleteBankFundRequest: builder.mutation({
      query: (id) => ({
        url: `/bankTransferFund/deleteFundRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BankTransferFund"],
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

 export const { useGetBankFundByRequestedToQuery,useDeleteBankFundRequestMutation,useGetAllBankTransferFundInfoQuery ,useUpdateBankFundStatusMutation,useAddBankTransferFundInfoMutation } = bankTransferFundApi;

// useGetAllPostQuery