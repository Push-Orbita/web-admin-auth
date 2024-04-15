import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Componentes que siempre estarán disponibles
import { useAppSelector } from '../hooks/reduxHook';
import NewsLetterCreate from '../pages/newletter/create';
// Carga dinámica de componentes
const AuthLogin = lazy(() => import('../pages/authentication/AuthLogin'));
const HomeAdmin = lazy(() => import('../pages/home/HomeAdmin'));
const NewsLetter = lazy(() => import('../pages/newletter/NewsLetter'));
type ComponentsMap = Record<string, LazyExoticComponent<ComponentType<any>>>;
const componentsMap: ComponentsMap = {
    'AuthLogin': AuthLogin,
    'HomeAdmin': HomeAdmin,
    'NewsLetter': NewsLetter,
};

export const RouterJs = () => {
    const { userModulos } = useAppSelector((state) => state.auth);

    const renderRoutes = (modulos: any) => {
        return modulos.map((modulo: any) => {
            // Verifica si el módulo tiene un array 'items' y lo procesa recursivamente
            if (modulo.items && modulo.items.length > 0) {
                return renderRoutes(modulo.items); // Llamada recursiva para manejar la estructura anidada
            }

            // Acceso directo a 'element' para módulos sin 'items'
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
                <Route key={'/news-letter/create'} path='/news-letter/create' element={<NewsLetterCreate />}></Route>
                {renderRoutes(userModulos)}
            </Routes>
        </div>
    );
};