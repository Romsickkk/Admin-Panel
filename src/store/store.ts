import { authApi } from "../services/apiAuth";
import { apiArtist } from "../services/apiArtist";
import { supabaseApi } from "../artists/apiArtists";
import { configureStore } from "@reduxjs/toolkit";
import { apiArtistAvatar } from "../services/apiArtistAvatar";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [apiArtist.reducerPath]: apiArtist.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    [apiArtistAvatar.reducerPath]: apiArtistAvatar.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiArtist.middleware)
      .concat(apiArtistAvatar.middleware)
      .concat(authApi.middleware, supabaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
