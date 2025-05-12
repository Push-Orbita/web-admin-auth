import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { AuthApi } from "@features/auth/service/auth.service";
import { setUserToken, LogOut } from "@redux/slices/auth/autSlice";

interface Props {
    children: React.ReactElement;
}

// Lista de rutas públicas que siempre están disponibles para usuarios autenticados
const PUBLIC_AUTHENTICATED_ROUTES = ['/configuracion-usuario', '/home'];

export const PrivateRoutes = React.memo(({ children }: Props) => {
    const authState = useAppSelector((state) => state.auth);
    const { isLogged, tokenUser, userModulos, refreshToken } = authState;
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const refreshingToken = useRef(false);
    const initialLoadRef = useRef(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Si ya estamos refrescando, no intentamos refrescar de nuevo
            if (refreshingToken.current) {
                setIsCheckingAuth(false);
                return;
            }

            // En la carga inicial, siempre intentamos refrescar el token si lo tenemos
            if (initialLoadRef.current && authState.tokenUser) {
                initialLoadRef.current = false;
                refreshingToken.current = true;

                try {
                    // Intentar refrescar el token usando el access token
                    const response = await AuthApi.refreshToken(authState.tokenUser);
                    const newToken = response.data.tokens.access_token;
                    const newRefreshToken = response.data.tokens.refresh_token || authState.refreshToken;

                    // Mantener todos los datos actuales del usuario y solo actualizar el token
                    dispatch(setUserToken({
                        ...authState,
                        tokenUser: newToken,
                        refreshToken: newRefreshToken,
                        isLogged: true
                    }));

                    setIsCheckingAuth(false);
                } catch (error) {
                    console.error('Error al refrescar el token en carga inicial:', error);

                    // Si hay un refresh token disponible, intentar usarlo como último recurso
                    if (authState.refreshToken) {
                        try {
                            const response = await AuthApi.refreshWithRefreshToken(authState.refreshToken);
                            const newToken = response.data.tokens.access_token;
                            const newRefreshToken = response.data.tokens.refresh_token || authState.refreshToken;

                            dispatch(setUserToken({
                                ...authState,
                                tokenUser: newToken,
                                refreshToken: newRefreshToken,
                                isLogged: true
                            }));

                            setIsCheckingAuth(false);
                        } catch (refreshError) {
                            console.error('Error al refrescar con refresh token:', refreshError);
                            dispatch(LogOut());
                            toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                            setIsCheckingAuth(false);
                        }
                    } else {
                        // Si no hay refresh token, logout
                        dispatch(LogOut());
                        toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                        setIsCheckingAuth(false);
                    }
                } finally {
                    refreshingToken.current = false;
                }

                return;
            }

            // Para actualizaciones normales, verificar si el token está por expirar
            const shouldRefreshToken = () => {
                try {
                    const tokenData = JSON.parse(atob(authState.tokenUser.split('.')[1]));
                    const expirationTime = tokenData.exp * 1000; // Convertir a milisegundos
                    const currentTime = Date.now();
                    const timeUntilExpiration = expirationTime - currentTime;

                    // Refrescar solo si expira en menos de 5 minutos
                    return timeUntilExpiration < 1000 * 60 * 5;
                } catch (e) {
                    // Si hay un error al decodificar el token, asumimos que debe refrescarse
                    console.warn('Error al decodificar el token:', e);
                    return true;
                }
            };

            // Si no tiene token o no debemos refrescarlo, simplemente continuamos
            if (!authState.tokenUser || !shouldRefreshToken()) {
                setIsCheckingAuth(false);
                return;
            }

            refreshingToken.current = true;
            try {
                // Intentar refrescar el token usando el access token
                const response = await AuthApi.refreshToken(authState.tokenUser);
                const newToken = response.data.tokens.access_token;
                const newRefreshToken = response.data.tokens.refresh_token || authState.refreshToken;

                // Mantener todos los datos actuales del usuario y solo actualizar el token
                dispatch(setUserToken({
                    ...authState,
                    tokenUser: newToken,
                    refreshToken: newRefreshToken,
                    isLogged: true
                }));
            } catch (error) {
                console.error('Error al refrescar el token:', error);

                // Verificamos si hay un error de autenticación (401) y tenemos refresh token
                if (error.response?.status === 401 && authState.refreshToken) {
                    try {
                        const response = await AuthApi.refreshWithRefreshToken(authState.refreshToken);
                        const newToken = response.data.tokens.access_token;
                        const newRefreshToken = response.data.tokens.refresh_token || authState.refreshToken;

                        dispatch(setUserToken({
                            ...authState,
                            tokenUser: newToken,
                            refreshToken: newRefreshToken,
                            isLogged: true
                        }));
                    } catch (refreshError) {
                        console.error('Error al refrescar con refresh token:', refreshError);
                        dispatch(LogOut());
                        toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                    }
                } else if (error.response?.status === 401) {
                    // Solo si es 401 y no tenemos refresh token o falló el refresh
                    dispatch(LogOut());
                    toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                }
                // Otros errores no causan logout
            } finally {
                refreshingToken.current = false;
                setIsCheckingAuth(false);
            }
        };

        // Solo intentamos refrescar si está cargando o tenemos token
        if (isCheckingAuth) {
            checkAuth();
        }
    }, [authState, dispatch, isCheckingAuth]);

    // Verificar si el usuario tiene acceso al módulo actual
    const hasAccessToModule = () => {
        // Si la ruta está en la lista de rutas públicas, permitir el acceso
        if (PUBLIC_AUTHENTICATED_ROUTES.includes(location.pathname)) {
            return true;
        }

        if (!userModulos || userModulos.length === 0) return false;

        const checkModuleAccess = (modules: any[]): boolean => {
            for (const module of modules) {
                if (module.path === location.pathname) {
                    return true;
                }
                if (module.items && module.items.length > 0) {
                    if (checkModuleAccess(module.items)) {
                        return true;
                    }
                }
            }
            return false;
        };

        return checkModuleAccess(userModulos);
    };

    // Mostrar un estado de carga mientras se verifica la autenticación
    if (isCheckingAuth) {
        return <div className="preloader-container">
            <div id="preloader5"></div>
        </div>;
    }

    // Solo redirigir al login si realmente no hay token o no está logueado
    if (!tokenUser || !isLogged) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!hasAccessToModule()) {
        return <Navigate to="/home" replace />;
    }

    return children;
});