import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHook';
const AuthLogin = lazy(() => import('../pages/auth/AuthLogin'));
const Home = lazy(() => import('../pages/home/Home'));
const ActividadType = lazy(() => import('../pages/actividadType/ActividadType'));
const EspecieType = lazy(() => import('../pages/especieType/EspecieType'));
const RazaType = lazy(() => import('../pages/RazaType'));
const Organizacion = lazy(() => import('../pages/Organizacion'));
const Sistema = lazy(() => import('../pages/Sistema'));


type ComponentsMap = Record<string, LazyExoticComponent<ComponentType<any>>>;
const componentsMap: ComponentsMap = {
    'AuthLogin': AuthLogin,
    'Home': Home,
    'ActividadType': ActividadType,
    'EspecieType': EspecieType,
    'RazaType': RazaType,
    'Organizacion': Organizacion,
    'Sistema': Sistema,
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
                        <Suspense fallback={<div>Loading...</div>}>
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