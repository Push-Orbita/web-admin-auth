import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHook';
const AuthLogin = lazy(() => import('../pages/auth/AuthLogin'));
const Home = lazy(() => import('../pages/home/Home'));
const Organizacion = lazy(() => import('../pages/Organizacion'));
const Sistema = lazy(() => import('../pages/Sistema'));
const Suscripcion = lazy(() => import('../pages/Suscripcion'));
const Plan = lazy(() => import('../pages/Plan'));
const Accion = lazy(() => import('../pages/Accion'));
const Contrato = lazy(() => import('../pages/Contrato'));
const Persona = lazy(() => import('../pages/Persona'));
const Usuario = lazy(() => import('../pages/Usuario'));
const Modulo = lazy(() => import('../pages/Modulo'));


type ComponentsMap = Record<string, LazyExoticComponent<ComponentType<any>>>;
const componentsMap: ComponentsMap = {
    'AuthLogin': AuthLogin,
    'Home': Home,
    'Organizacion': Organizacion,
    'Sistema': Sistema,
    'Suscripcion': Suscripcion,
    'Plan': Plan,
    'Accion': Accion,
    'Contrato': Contrato,
    'Persona': Persona,
    'Usuario': Usuario,
    'Modulo': Modulo,
};

export const RouterJs = () => {
    const { userModulos } = useAppSelector((state) => state.auth);

    const renderRoutes = (modulos: any) => {
        return modulos.flatMap((modulo: any) => {
            if (modulo.items && modulo.items.length > 0) {
                return renderRoutes(modulo.items);
            }
            const Component = componentsMap[modulo.element];
            if (!Component) {
                console.warn(`No se encontró componente: ${modulo.element}`);
                return [];
            }
            return (
                <Route
                    key={modulo.path}
                    path={modulo.path}
                    element={
                        <Suspense fallback={<div className="preloader-container">
                            <div id="preloader5"></div>
                        </div>
                        }>
                            <Component />
                        </Suspense>
                    }
                />
            );
        });
    };

    return (
        <div>
            <Routes>
                {userModulos && userModulos.length > 0 ? (
                    renderRoutes(userModulos)
                ) : (
                    // Ruta por defecto cuando no hay módulos disponibles
                    <Route path="*" element={<Navigate to="/home" replace />} />
                )}
                {/* Ruta por defecto que redirige a HomeAdmin */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={
                    <Suspense fallback={
                        <div className="preloader-container">
                            <div id="preloader5"></div>
                        </div>

                    }>
                        <Home />
                    </Suspense>
                } />
            </Routes>
        </div>
    );
};
