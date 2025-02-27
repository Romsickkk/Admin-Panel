import { createApi } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import supabase from "./supabase";

export const apiImageUpload = createApi({
  reducerPath: "supabaseImageApi",
  baseQuery: () => ({ data: null }), // Фиктивный baseQuery
  endpoints: (builder) => ({
    updateImage: builder.mutation<string | null, { file: File; storageName: string }>({
      async queryFn({ file, storageName }) {
        try {
          // Генерируем уникальное имя файла
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = fileName;

          // Загрузка файла
          const { error: uploadError } = await supabase.storage.from(storageName).upload(filePath, file, {
            upsert: true,
            cacheControl: "3600",
          });

          if (uploadError) {
            throw {
              status: "STORAGE_ERROR",
              message: uploadError.message,
            };
          }

          // Получение публичного URL
          const { data: urlData } = supabase.storage.from(storageName).getPublicUrl(filePath);

          if (!urlData?.publicUrl) {
            throw {
              status: "NO_URL",
              message: "Failed to get public URL",
            };
          }
          console.log(urlData);

          return { data: urlData.publicUrl };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              data: error instanceof Error ? error.message : "Unknown upload error",
            } as FetchBaseQueryError,
          };
        }
      },
    }),
  }),
});

export const { useUpdateImageMutation } = apiImageUpload;
