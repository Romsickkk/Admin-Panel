import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/apiAuth";
import { supabaseApi } from "../artists/apiArtists";
import { apiImageUpload } from "../services/apiImageUpload";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    [apiImageUpload.reducerPath]: apiImageUpload.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, supabaseApi.middleware).concat(apiImageUpload.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
