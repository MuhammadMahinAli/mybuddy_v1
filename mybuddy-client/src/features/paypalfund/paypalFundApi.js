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

    getAllPaypalFundInfo: builder.query({
      query: () => ({
        url: `/paypalFund/getAll`,
        method: 'GET',
      }),
      providesTags: ['PaypalFund'],
    }),

    updatePaypalFundStatus : builder.mutation({
      query: ({id, data}) => ({
        url: `/paypalFund/updateStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["PaypalFund"],
    }),
    getPaypalFundByRequestedTo: builder.query({
      query: (id) => ({
        url: `/paypalFund/getFundByRequestedTo/${id}`,
        method: "GET",
      }),
      providesTags: ["PaypalFund"],
    }),

    deletePaypalFundRequest: builder.mutation({
      query: (id) => ({
        url: `/paypalFund/deleteFundRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaypalFund"],
    }),

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

 export const { useGetPaypalFundByRequestedToQuery,useDeletePaypalFundRequestMutation ,useGetAllPaypalFundInfoQuery,useUpdatePaypalFundStatusMutation,useAddPaypalFundInfoMutation } = paypalFundApi;

// useGetAllPostQuery