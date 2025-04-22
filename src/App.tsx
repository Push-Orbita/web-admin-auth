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
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './components/common/style/layout/layout.scss'
import './i18n';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store'; // Asegúrate de que la ruta sea correcta
import { useEffect } from "react";


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Refecht cuando se cambia de pantalla
        staleTime: Infinity,
        cacheTime: 1000 * 60 * 60 * 0, // 24 hours
        retry: 2, // Reintentar fetches fallidos hasta 2 veces automáticamente
        refetchOnMount: false,
        refetchOnReconnect: true,
      },
    },
  })
  const isDarkTheme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    const linkId = 'theme-link';
    let themeLink = document.getElementById(linkId) as HTMLLinkElement;

    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.id = linkId;
      themeLink.rel = 'stylesheet';
      document.head.appendChild(themeLink);
    }

    // Cambia la ruta del tema basado en isDarkTheme
    themeLink.href = isDarkTheme
      ? '/node_modules/primereact/resources/themes/soho-dark/theme.css'
      : '/node_modules/primereact/resources/themes/lara-light-blue/theme.css';

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
  )
}

export default App
