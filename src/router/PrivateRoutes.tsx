import * as React from "react";
import { Navigate } from "react-router-dom";



interface Props {
    children: React.ReactElement;
    isAutenticated: boolean;
}
export const PrivateRoutes = React.memo(({children,isAutenticated}:Props) => {
    //verifico el estado del usuario isAutenticated si no esta autenticado redirecciono al login
    return isAutenticated
    ? children
    : <Navigate to="/login"/>
})