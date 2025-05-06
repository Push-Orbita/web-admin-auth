import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import '../components/common/ui/style.css';
import { useAppSelector } from '../hooks/reduxHook';
import { UserModulo } from '@redux/slices/auth/interface/user.entity';

const AuthLogin = lazy(() => import('../pages/auth/AuthLogin'));
const Home = lazy(() => import('../pages/home/Home'));
const ConfiguracionUsuario = lazy(() => import('../pages/usuario/ConfiguracionUsuario'));
const Sistema = lazy(() => import('../pages/sistema/Sistema'));
const Suscripcion = lazy(() => import('../pages/suscripcion/Suscripcion'));
const Persona = lazy(() => import('../pages/persona/Persona'));
const Organizacion = lazy(() => import('../pages/organizacion/Organizacion'));
const Plan = lazy(() => import('../pages/plan/Plan'));
const Contrato = lazy(() => import('../pages/contarto/Contrato'));
const Accion = lazy(() => import('../pages/accion/Accion'));
const Usuario = lazy(() => import('../pages/usuario/Usuario'));
const Rol = lazy(() => import('../pages/rol/Rol'));
const Modulo = lazy(() => import('../pages/modulo/Modulo'));
const AccionModulo = lazy(() => import('../pages/modulo/AccionModulo'));
const Permisos = lazy(() => import('../pages/usuario/Permisos'));

type ComponentsMap = Record<string, LazyExoticComponent<ComponentType<any>>>;
const componentsMap: ComponentsMap = {
    'AuthLogin': AuthLogin,
    'Home': Home,
    'ConfiguracionUsuario': ConfiguracionUsuario,
    'Sistema': Sistema,
    'Suscripcion': Suscripcion,
    'Persona': Persona,
    'Organizacion': Organizacion,
    'Plan': Plan,
    'Contrato': Contrato,
    'Accion': Accion,
    'Usuario': Usuario,
    'Rol': Rol,
    'Modulo': Modulo,
    'AccionModulo': AccionModulo,
    'Permisos': Permisos
};

const LoadingFallback = () => (
    <div className="preloader-container">
        <div id="preloader5"></div>
    </div>
);

export const RouterJs = () => {
    const { userModulos } = useAppSelector((state) => state.auth);

    const renderRoutes = (modulos: UserModulo[]): JSX.Element[] => {
        if (!modulos || !Array.isArray(modulos)) return [];

        return modulos.flatMap((modulo: UserModulo): JSX.Element[] => {
            if (modulo.items && modulo.items.length > 0) {
                return renderRoutes(modulo.items);
            }
            if (!modulo.element || !modulo.path) {
                console.warn(`Módulo sin elemento o ruta: ${modulo.label}`);
                return [];
            }
            const Component = componentsMap[modulo.element];
            if (!Component) {
                console.warn(`No se encontró componente: ${modulo.element}`);
                return [];
            }
            return [
                <Route
                    key={modulo.path}
                    path={modulo.path}
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <Component />
                        </Suspense>
                    }
                />
            ];
        });
    };

    return (
        <div>
            <Routes>
                {/* Rutas dinámicas basadas en módulos */}
                {Array.isArray(userModulos) && userModulos.length > 0 && renderRoutes(userModulos)}

                {/* Rutas públicas que siempre están disponibles */}
                <Route path="/configuracion-usuario" element={
                    <Suspense fallback={<LoadingFallback />}>
                        <ConfiguracionUsuario />
                    </Suspense>
                } />
                <Route path="/home" element={
                    <Suspense fallback={<LoadingFallback />}>
                        <Home />
                    </Suspense>
                } />
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Ruta por defecto para cualquier otra ruta */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </div>
    );
};
