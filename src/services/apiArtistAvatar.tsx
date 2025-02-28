import { createApi } from "@reduxjs/toolkit/query/react";

import supabase from "./supabase";

interface PublicUrlResponse {
  publicUrl: string;
}

export const apiArtistAvatar = createApi({
  reducerPath: "supabaseImageApi",
  baseQuery: () => ({ data: null }),
  endpoints: (builder) => ({
    updateImage: builder.mutation<PublicUrlResponse, { file: File; storageName: string }>({
      async queryFn({ file, storageName }) {
        try {
          const fileName = `${Date.now()}-${file.name}`;

          const { error: uploadError } = await supabase.storage.from(storageName).upload(fileName, file, {
            upsert: true,
            cacheControl: "3600",
          });

          if (uploadError) {
            throw new Error(uploadError.message);
          }

          const { data: urlData } = supabase.storage.from(storageName).getPublicUrl(fileName);

          if (!urlData?.publicUrl) {
            throw new Error("Failed to get public URL");
          }

          return { data: { publicUrl: urlData.publicUrl } };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : "Unknown upload error",
            },
          };
        }
      },
    }),

    deleteImage: builder.mutation<void, { storageName: string; fileName: string }>({
      async queryFn({ storageName, fileName }) {
        try {
          const { error: deleteError } = await supabase.storage.from(storageName).remove([fileName]);

          if (deleteError) {
            throw new Error(deleteError.message);
          }

          return { data: undefined };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : "Unknown delete error",
            },
          };
        }
      },
    }),
  }),
});

export const { useUpdateImageMutation, useDeleteImageMutation } = apiArtistAvatar;
