import { authorize } from "@config/api/axios.config";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { RouterJs } from "./RouterJs";
import AuthLogin from "@pages/auth/AuthLogin";
import { AuthApi } from "@features/auth/service/auth.service";
import useQueryApi from "@hooks/useQueryApi";
import { setClientToken } from "@redux/slices/auth/autSlice";

export const AppRouter = () => {
  const { isLogged, tokenUser } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  // Función para obtener el token de autenticación
  const getAuthToken = async () => {
    return await AuthApi.postAuthSistem({
      clientId: import.meta.env.VITE_APP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_APP_CLIENT_SECRET
    });
  };

  // Uso de useQueryApi para obtener el token desde la API solo una vez
  const { data: clientTokenData } = useQueryApi<any>(
    "Client-token",
    () => getAuthToken(),
    {},
    {
      onSuccess: (data: any) => {
        if (data && data.accessToken) {
          dispatch(setClientToken(data.accessToken));
        } else {
          console.error("Error: La respuesta no contiene accessToken");
        }
      },
      onError: (error) => {
        console.error("Error al obtener el token de cliente:", error);
      },
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  // Efecto para verificar los datos del token
  useEffect(() => {
    if (clientTokenData) {
      console.log('Client Token Data:', clientTokenData);
    }
  }, [clientTokenData]);

  useEffect(() => {
    if (tokenUser) {
      authorize(tokenUser);
    }
  }, [tokenUser]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes isAutenticated={isLogged}>
              <AuthLogin />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes isAutenticated={isLogged}>
              <RouterJs />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};
