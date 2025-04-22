import { authorize } from "@config/api/axios.config";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { RouterJs } from "./RouterJs";
import AuthLogin from "@pages/auth/AuthLogin";
import useQueryApi from "@hooks/useQueryApi";
import { setClientToken } from "@redux/slices/auth/autSlice";
import { AuthApi } from "@features/auth/service/auth.service";

export const AppRouter = () => {
  const { isLogged, tokenUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Estado para controlar si se debe ejecutar la petición del token
  const [shouldFetchToken, setShouldFetchToken] = useState(false);

  // Función para obtener el token de autenticación
  const getAuthToken = async () => {
    const response = await AuthApi.postAuthSistem({
      clientId: import.meta.env.VITE_APP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_APP_CLIENT_SECRET,
    });

    return response.data; // 🔥 Ahora devuelve solo los datos
  };

  // useQueryApi para obtener el token, controlado por shouldFetchToken
  const { data: clientTokenData } = useQueryApi<any>(
    "Client-token",
    () => getAuthToken(),
    {
      enabled: shouldFetchToken,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data: any) => {
        if (data && data.accessToken) {
          dispatch(setClientToken(data.accessToken));
          setShouldFetchToken(false);
        } else {
          console.error("Error: La respuesta no contiene accessToken");
        }
      },
      onError: (error) => {
        console.error("Error al obtener el token de cliente:", error);
        setShouldFetchToken(false);
      },
    }
  );


  // useEffect para activar la obtención del token solo después del deslogueo
  useEffect(() => {
    if (!isLogged) {
      setShouldFetchToken(true); // Activa la bandera solo después de desloguear
    }
  }, [isLogged]);

  useEffect(() => {
    if (clientTokenData) {
      // console.log("Client Token Data:", clientTokenData);
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
