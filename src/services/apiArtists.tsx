import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase from "./supabase";

export type ArtistData = {
  name: string;
  avatar: string | undefined;
  facebook: string | undefined;
  vk: string | undefined;
  spotify: string | undefined;
  soundcloud: string | undefined;
  id: number;
};

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getTableData: builder.query<ArtistData[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from("artists").select("*");

        if (error) {
          return {
            error: {
              status: parseInt(error.code) || 500, // Убедимся, что это число
              data: error.message,
            },
          };
        }

        // Преобразуем данные для соответствия типу ArtistData
        const formattedData =
          data?.map((artist) => ({
            ...artist,
            avatar: artist.avatar ?? undefined,
            facebook: artist.facebook ?? undefined,
            vk: artist.vk ?? undefined,
            spotify: artist.spotify ?? undefined,
            soundcloud: artist.soundcloud ?? undefined,
          })) || [];

        return { data: formattedData };
      },
    }),
  }),
});

export const { useGetTableDataQuery } = supabaseApi;
