import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import '../components/common/ui/style.css';
import { useAppSelector } from '../hooks/reduxHook';
const AuthLogin = lazy(() => import('../pages/auth/AuthLogin'));
const Home = lazy(() => import('../pages/home/Home'));
const ConfiguracionUsuario = lazy(() => import('../pages/usuario/ConfiguracionUsuario'));
const Sistema = lazy(() => import('../pages/sistema/Sistema'));
const Suscripcion = lazy(() => import('../pages/suscripcion/Suscripcion'));
const Persona = lazy(() => import('../pages/persona/Persona'));

type ComponentsMap = Record<string, LazyExoticComponent<ComponentType<any>>>;
const componentsMap: ComponentsMap = {
    'AuthLogin': AuthLogin,
    'Home': Home,
    'ConfiguracionUsuario': ConfiguracionUsuario,
    'Sistema': Sistema,
    'Suscripcion': Suscripcion,
    'Persona': Persona,
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
                {/* Ruta por defecto que redirige a Home */}
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
                <Route path="/configuracion-usuario" element={
                    <Suspense fallback={
                        <div className="preloader-container">
                            <div id="preloader5"></div>
                        </div>
                    }>
                        <ConfiguracionUsuario />
                    </Suspense>
                } />
            </Routes>
        </div>
    );
};
