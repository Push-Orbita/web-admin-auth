import { MenuProvider } from "@context/menucontext";
import { ModuleProvider } from "@hooks/useModules";
import { PermisosProvider } from "@hooks/usePermisos";
import { persistor } from "@redux/store/store";
import { AppRouter } from "@router/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'primeflex/primeflex.css';
import { PrimeReactProvider } from 'primereact/api';
import { ConfirmDialog } from "primereact/confirmdialog";
import 'primereact/resources/primereact.min.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/lib/integration/react";
import './components/common/style/layout/layout.scss';
import './i18n';
// import 'primereact/resources/themes/soho-dark/theme.css';
// import 'primereact/resources/themes/saga-orange/theme.css';
import 'primereact/resources/themes/lara-dark-teal/theme.css';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Refecht cuando se cambia de pantalla
        staleTime: 0,
        cacheTime: 1000 * 60 * 60 * 0, // 24 hours
        retry: 2, // Reintentar fetches fallidos hasta 2 veces automáticamente
        refetchOnMount: false,
        refetchOnReconnect: true,
      },
    },
  })


  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor}>
          <PrimeReactProvider >
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
            </PermisosProvider >
          </PrimeReactProvider>
        </PersistGate>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
