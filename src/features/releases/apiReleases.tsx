import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import supabase from "../../services/supabase";

export type ReleasesData = {
  avatar: string | null;
  name: string;
  owners: string;
  cygnus: string;
};

export const apiReleases = createApi({
  reducerPath: "apiReleases",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getTableData: builder.query<ReleasesData[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from("releases").select("*");

        if (error) {
          return {
            error: {
              status: parseInt(error.code) || 500,
              data: error.message,
            },
          };
        }

        return { data };
      },
    }),
    updateReleasesByName: builder.mutation<any, { name: string; newData: ReleasesData }>({
      async queryFn({ name, newData }) {
        try {
          const { data, error } = await supabase.from("releases").update(newData).eq("name", name);

          if (error) {
            return { error: { status: 500, data: error.message } };
          }

          return { data };
        } catch (error) {
          return {
            error: { status: 500, data: error instanceof Error ? error.message : "Unknown error" },
          };
        }
      },
    }),
    // updateReleases: builder.mutation({
    //   query: ({ name, updateValues }) => ({
    //     url: "releases",
    //     method: "PATCH",
    //     body: updateValues,
    //     params: {
    //       name: `eq.${name}`,
    //     },
    //   }),
    // }),
  }),
});

export const { useGetTableDataQuery, useUpdateReleasesByNameMutation } = apiReleases;
