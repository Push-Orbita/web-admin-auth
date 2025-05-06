import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@hooks/reduxHook";

interface Props {
    children: React.ReactElement;
}

export const PublicRoutes = React.memo(({ children }: Props) => {
    const { isLogged, tokenUser } = useAppSelector((state) => state.auth);
    const location = useLocation();

    // Si el usuario está autenticado y tiene token, redirigir a home
    if (isLogged && tokenUser) {
        // Guardamos la ruta original para redirigir después del login
        const from = location.state?.from?.pathname || "/home";
        return <Navigate to={from} replace />;
    }

    return children;
});