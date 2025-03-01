import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase from "./supabase";

interface ArtistData {
  name: string;
}

export const apiArtist = createApi({
  reducerPath: "apiArtist",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    updateArtistById: builder.mutation<any, { id: number; newData: ArtistData }>({
      async queryFn({ id, newData }) {
        try {
          const { data, error } = await supabase.from("artists").update(newData).eq("id", id);

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
  }),
});

export const { useUpdateArtistByIdMutation } = apiArtist;
