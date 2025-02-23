import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Создаём API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://your-supabase-url.supabase.co",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/v1/token?grant_type=password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
