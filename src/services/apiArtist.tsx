import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase from "./supabase";

interface ArtistData {
  name: string;
}

export const apiArtist = createApi({
  reducerPath: "apiArtist",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Указываем заглушку для baseQuery
  endpoints: (builder) => ({
    updateArtistById: builder.mutation<any, { id: number; newData: ArtistData }>({
      async queryFn({ id, newData }) {
        try {
          // Запрос к Supabase для обновления данных
          const { data, error } = await supabase
            .from("artists") // имя таблицы
            .update(newData) // передаем новые данные
            .eq("id", id); // фильтруем по id

          if (error) {
            // Используем стандартный формат ошибки, как требует RTK Query
            return { error: { status: 500, data: error.message } };
          }

          return { data }; // Возвращаем обновленные данные
        } catch (error) {
          // Обрабатываем исключение, если оно произошло
          return {
            error: { status: 500, data: error instanceof Error ? error.message : "Unknown error" },
          };
        }
      },
    }),
  }),
});

export const { useUpdateArtistByIdMutation } = apiArtist;
