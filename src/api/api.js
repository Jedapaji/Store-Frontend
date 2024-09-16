import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopppingCartApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:44365/" }),

  tagTypes: [],

  prepareHeaders: (headers, { getState }) => {
    headers.set("content-type", "application/json");
    headers.set("accept", "*/*");
    return headers;
  },

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `api/Products`,
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: `api/Orders/CreateOrder`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPokemonByNameQuery,
  useGetProductsQuery,
  useCreateOrderMutation,
} = shopppingCartApi;
