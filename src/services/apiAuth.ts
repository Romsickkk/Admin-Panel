import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase from "./supabase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { error: { status: 400, data: error.message } };
        }

        if (data.session) {
          localStorage.setItem("token", data.session.access_token);
        }

        return { data };
      },
      invalidatesTags: [{ type: "Auth", id: "USER" }],
    }),
  }),
});

export const { useLoginMutation } = authApi;
