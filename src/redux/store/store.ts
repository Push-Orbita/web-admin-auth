import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import uiSlice from "../slices/uiSlices/uiSlice";
import { thunk } from "redux-thunk";
import authSlice from "../slices/auth/autSlice";
const persistUiConfig = {
  key: "ui",
  storage,
};
const persistAuthConfig = {
  key: "auth",
  storage,
};

export const store = configureStore({
  reducer: {
    ui: persistReducer<ReturnType<typeof uiSlice>>(persistUiConfig, uiSlice),
    auth: persistReducer<ReturnType<typeof authSlice>>(
      persistAuthConfig,
      authSlice
    ),
  }, middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk);
  },

});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
