import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import uiSlice from "../slices/uiSlices/uiSlice";
import { thunk } from "redux-thunk";
import authSlice from "../slices/auth/autSlice";

// Configuración para UI (preferencias del usuario)
const persistUiConfig = {
  key: "ui",
  storage, // Usa localStorage para preferencias de UI
  whitelist: ['theme', 'isCollapsed', 'isOpenMenu', 'drawerWidth'], // Solo persistir estos campos
};

// Configuración para Auth (datos sensibles)
const persistAuthConfig = {
  key: "auth",
  storage: sessionStorage, // Usa sessionStorage para datos sensibles
  whitelist: ['userNombre', 'organizacion', 'sistema', 'activo', 'lang', 'userModulos'], // Solo persistir estos campos
  blacklist: ['tokenUser', 'tokenSistem'], // No persistir tokens
};

export const store = configureStore({
  reducer: {
    ui: persistReducer<ReturnType<typeof uiSlice>>(persistUiConfig, uiSlice),
    auth: persistReducer<ReturnType<typeof authSlice>>(
      persistAuthConfig,
      authSlice
    ),
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // Ignorar estas acciones de redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk);
  },
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
