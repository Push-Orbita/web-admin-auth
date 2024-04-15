import * as React from "react";
import { Navigate } from "react-router-dom";


interface Props {
    children: React.ReactElement;
    isAutenticated: boolean;
}

export const PublicRoutes = React.memo(({ children, isAutenticated }: Props) => {
    //verifico el estado del usuario isAutenticated y seteo las pantalla  publicas que pueden acceder sin estar autenticado
    return isAutenticated
        ? <Navigate to="/home" />
        : children
})