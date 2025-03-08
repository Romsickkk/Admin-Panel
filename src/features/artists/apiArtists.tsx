import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import supabase from "../../services/supabase";

export type ArtistData = {
  id: number;
  name: string;
  avatar: string | undefined;
  facebook: string | undefined;
  vk: string | undefined;
  spotify: string | undefined;
  soundcloud: string | undefined;
  instagram: string | undefined;
  twitter: string | undefined;
};

type NewArtist = Omit<ArtistData, "id" | "avatar">;

export const apiArtists = createApi({
  reducerPath: "apiArtists",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getTableData: builder.query<ArtistData[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from("artists").select("*");

        if (error) {
          return {
            error: {
              status: parseInt(error.code) || 500,
              data: error.message,
            },
          };
        }

        const formattedData =
          data?.map((artist) => ({
            ...artist,
            avatar: artist.avatar ?? undefined,
            facebook: artist.facebook ?? undefined,
            vk: artist.vk ?? undefined,
            spotify: artist.spotify ?? undefined,
            soundcloud: artist.soundcloud ?? undefined,
            instagram: artist.instagram ?? undefined,
            twitter: artist.twitter ?? undefined,
          })) || [];

        return { data: formattedData };
      },
    }),
    isHaveArtist: builder.query<number, number>({
      queryFn: async (id: number) => {
        const { data, error } = await supabase.from("artists").select("id").eq("id", id);

        if (error) {
          return {
            error: {
              status: error.code ? parseInt(error.code) : 500,
              data: error.message,
            },
          };
        }

        return { data: data.length };
      },
    }),
    uploadNewArtist: builder.mutation<any, { id: number; newData: NewArtist }>({
      async queryFn({ newData }) {
        try {
          const { error } = await supabase.from("artists").insert(newData);
          if (error) {
            return { error: { status: 500, data: error.message } };
          }
          return { data: "Artist added successfully" };
        } catch (error) {
          return {
            error: { status: 500, data: error instanceof Error ? error.message : "Unknown error" },
          };
        }
      },
    }),

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
    // Мутация для удаления данных
    // deleteArtist: builder.mutation({
    //   query: (id: number) => ({
    //     url: "artists",
    //     method: "DELETE",
    //     params: {
    //       id: `eq.${id}`, // Фильтрация по ID для удаления конкретной записи
    //     },
    //   }),
    // }),
  }),
});

export const { useGetTableDataQuery, useIsHaveArtistQuery, useUploadNewArtistMutation, useUpdateArtistByIdMutation } =
  apiArtists;
