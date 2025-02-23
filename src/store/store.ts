import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/apiAuth";
import { supabaseApi } from "../services/apiArtists";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, supabaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
