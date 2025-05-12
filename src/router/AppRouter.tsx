import { authorize } from "@config/api/axios.config";
import { AuthApi } from "@features/auth/service/auth.service";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import useQueryApi from "@hooks/useQueryApi";
import AuthLogin from "@pages/auth/AuthLogin";
import { LogOut, setClientToken } from "@redux/slices/auth/autSlice";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { RouterJs } from "./RouterJs";

export const AppRouter = () => {
  const { tokenUser, tokenSistem, refreshToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const checkingSystemToken = useRef(false);

  // Estado para controlar si se debe ejecutar la petición del token
  const [shouldFetchToken, setShouldFetchToken] = useState(false);

  // Función para obtener el token de autenticación
  const getAuthToken = async () => {
    if (checkingSystemToken.current) return null;

    try {
      checkingSystemToken.current = true;
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
    } finally {
      checkingSystemToken.current = false;
    }
  };

  // Verificar si el token del sistema está por expirar
  const isSystemTokenExpired = () => {
    if (!tokenSistem) return true;

    try {
      const tokenData = JSON.parse(atob(tokenSistem.split('.')[1]));
      const expirationTime = tokenData.exp * 1000; // Convertir a milisegundos
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      // Considerar expirado si faltan menos de 5 minutos
      return timeUntilExpiration < 1000 * 60 * 5;
    } catch (e) {
      console.warn("Error al decodificar el token del sistema:", e);
      return true;
    }
  };

  // useQueryApi para obtener el token
  const { refetch: refetchClientToken } = useQueryApi<any>(
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
    // Si no hay token del sistema o está expirado, y no estamos intentando obtenerlo
    if ((!tokenSistem || isSystemTokenExpired()) && !shouldFetchToken && !checkingSystemToken.current) {
      setShouldFetchToken(true);
    }
  }, [tokenSistem, shouldFetchToken]);

  // Efecto para configurar el token en axios
  useEffect(() => {
    if (tokenUser) {
      authorize(tokenUser).catch((error) => {
        console.error("Error al configurar el token en axios:", error);

        // No hacer logout inmediatamente, permitir a PrivateRoutes intentar refrescar el token primero
        if (error.response?.status === 401 && !refreshToken) {
          dispatch(LogOut());
          navigate("/login");
        }
      });
    }
  }, [tokenUser, dispatch, navigate, refreshToken]);

  // Efecto para manejar la reconexión
  useEffect(() => {
    const handleOnline = () => {
      if (!tokenSistem || isSystemTokenExpired()) {
        refetchClientToken();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [tokenSistem, refetchClientToken]);

  // Efecto para verificar el token del sistema periódicamente
  useEffect(() => {
    const checkTokenInterval = setInterval(() => {
      if (isSystemTokenExpired() && !checkingSystemToken.current) {
        refetchClientToken();
      }
    }, 1000 * 60 * 5); // Verificar cada 5 minutos

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
