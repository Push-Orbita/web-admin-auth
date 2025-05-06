import { authorize } from "@config/api/axios.config";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { RouterJs } from "./RouterJs";
import AuthLogin from "@pages/auth/AuthLogin";
import useQueryApi from "@hooks/useQueryApi";
import { setClientToken, LogOut } from "@redux/slices/auth/autSlice";
import { AuthApi } from "@features/auth/service/auth.service";
import { toast } from "react-hot-toast";

export const AppRouter = () => {
  const { isLogged, tokenUser, tokenSistem } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Estado para controlar si se debe ejecutar la petición del token
  const [shouldFetchToken, setShouldFetchToken] = useState(false);

  // Función para obtener el token de autenticación
  const getAuthToken = async () => {
    try {
      const response = await AuthApi.postAuthSistem({
        clientId: import.meta.env.VITE_APP_CLIENT_ID,
        clientSecret: import.meta.env.VITE_APP_CLIENT_SECRET,
      });
      return response.data;
    } catch (error) {
      toast.error("Error al obtener el token del sistema");
      dispatch(LogOut());
      navigate("/login");
      return null;
    }
  };

  // useQueryApi para obtener el token
  const { data: clientTokenData, refetch: refetchClientToken } = useQueryApi<any>(
    "Client-token",
    () => getAuthToken(),
    {
      enabled: shouldFetchToken,
      staleTime: 1000 * 60 * 55, // 55 minutos
      cacheTime: 1000 * 60 * 60, // 1 hora
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      onSuccess: (data: any) => {
        if (data?.accessToken) {
          dispatch(setClientToken(data.accessToken));
          setShouldFetchToken(false);
        } else {
          console.error("Error: La respuesta no contiene accessToken");
          dispatch(LogOut());
          navigate("/login");
        }
      },
      onError: (error) => {
        console.error("Error al obtener el token de cliente:", error);
        setShouldFetchToken(false);
        dispatch(LogOut());
        navigate("/login");
      },
    }
  );

  // Efecto para manejar el token del sistema
  useEffect(() => {
    // Si no hay token del sistema y no estamos intentando obtenerlo
    if (!tokenSistem && !shouldFetchToken) {
      setShouldFetchToken(true);
    }
  }, [tokenSistem, shouldFetchToken]);

  // Efecto para configurar el token en axios
  useEffect(() => {
    if (tokenUser) {
      authorize(tokenUser).catch(() => {
        dispatch(LogOut());
        navigate("/login");
      });
    }
  }, [tokenUser, dispatch, navigate]);

  // Efecto para manejar la reconexión
  useEffect(() => {
    const handleOnline = () => {
      if (!tokenSistem) {
        refetchClientToken();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [tokenSistem, refetchClientToken]);

  // Efecto para verificar el token del sistema periódicamente
  useEffect(() => {
    const checkTokenInterval = setInterval(() => {
      if (tokenSistem) {
        // Verificar si el token está próximo a expirar (por ejemplo, 5 minutos antes)
        const tokenData = JSON.parse(atob(tokenSistem.split('.')[1]));
        const expirationTime = tokenData.exp * 1000; // Convertir a milisegundos
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        if (timeUntilExpiration < 1000 * 60 * 5) { // 5 minutos
          refetchClientToken();
        }
      }
    }, 1000 * 60); // Verificar cada minuto

    return () => clearInterval(checkTokenInterval);
  }, [tokenSistem, refetchClientToken]);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <AuthLogin />
          </PublicRoutes>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRoutes>
            <RouterJs />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};
