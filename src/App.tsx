import { MenuProvider } from "@context/menucontext";
import { AppRouter } from "@router/AppRouter";
import { PermisosProvider } from "@hooks/usePermisos";
import { ModuleProvider } from "@hooks/useModules";
import { persistor } from "@redux/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from 'primereact/api';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/lib/integration/react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';
import { useEffect } from 'react';
import { getThemePath } from '@config/theme.config';

// Importar los temas de PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './components/common/style/layout/layout.scss';
import './i18n';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: 1000 * 60 * 60 * 0,
        retry: 3,
        refetchOnMount: false,
        refetchOnReconnect: true,
      },
    },
  });

  const isDarkTheme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    const existingThemes = document.querySelectorAll('link[href*="primereact/resources/themes"]');
    existingThemes.forEach(theme => theme.remove());

    // Crear y agregar el nuevo tema
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = getThemePath(isDarkTheme);
    document.head.appendChild(themeLink);

    // Limpiar al desmontar
    return () => {
      themeLink.remove();
    };
  }, [isDarkTheme]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor}>
          <PrimeReactProvider>
            <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
              <PermisosProvider>
                <ModuleProvider>
                  <MenuProvider>
                    <Toaster position="bottom-right" toastOptions={{
                      duration: 5000
                    }} />
                    <ConfirmDialog />
                    <AppRouter />
                  </MenuProvider>
                </ModuleProvider>
              </PermisosProvider>
            </div>
          </PrimeReactProvider>
        </PersistGate>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
