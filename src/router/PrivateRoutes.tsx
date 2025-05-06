import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@hooks/reduxHook";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {
    children: React.ReactElement;
}

export const PrivateRoutes = React.memo(({ children }: Props) => {
    const { isLogged, tokenUser, userModulos } = useAppSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (!isLogged) {
            toast.error("Debes iniciar sesión para acceder a esta página");
        }
    }, [isLogged]);

    // Verificar si el usuario tiene acceso al módulo actual
    const hasAccessToModule = () => {
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

    if (!isLogged || !tokenUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!hasAccessToModule()) {
        return <Navigate to="/home" replace />;
    }

    return children;
});