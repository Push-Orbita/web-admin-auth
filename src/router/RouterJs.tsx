import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHook';
import { SpinnerLoad } from '../layout/components/SpinnerLoad';
const AuthLogin = lazy(() => import('../pages/authentication/AuthLogin'));
const HomeAdmin = lazy(() => import('../pages/home/HomeAdmin'));
const Sistema = lazy(() => import('../pages/sistema/Sistema'));
const Organizacion = lazy(() => import('../pages/organizacion/Organizacion'));
const Actions = lazy(() => import('../pages/actions/ActionsType'));
const Suscripcion = lazy(() => import('../pages/suscripcion/Suscripcion'));
const Usuario = lazy(() => import('../pages/usuarios/Usuario'));



type ComponentsMap = Record<string, LazyExoticComponent<ComponentType<any>>>;
const componentsMap: ComponentsMap = {
    'AuthLogin': AuthLogin,
    'HomeAdmin': HomeAdmin,
    'Sistema': Sistema,
    'Organizacion': Organizacion,
    'Actions': Actions,
    'Suscripcion': Suscripcion,
    'Usuario': Usuario,
};

export const RouterJs = () => {
    const { userModulos } = useAppSelector((state) => state.auth);

    const renderRoutes = (modulos: any) => {
        return modulos.map((modulo: any) => {
            if (modulo.items && modulo.items.length > 0) {
                return renderRoutes(modulo.items);
            }
            const Component = componentsMap[modulo.element];
            if (!Component) {
                console.warn(`No se econtro componente: ${modulo.element}`);
                return null;
            }
            return (
                <Route
                    key={modulo.path}
                    path={modulo.path}
                    element={
                        <Suspense fallback={
                            <>
                                <SpinnerLoad />
                            </>
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
                {renderRoutes(userModulos)}
            </Routes>
        </div>
    );
};