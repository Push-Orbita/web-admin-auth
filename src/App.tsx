import { MenuProvider } from "@context/menucontext";
import { AppRouter } from "@router/AppRouter";
import { PermisosProvider } from "@hooks/usePermisos";
import { ModuleProvider } from "@hooks/useModules";
import { persistor } from "@redux/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from 'primereact/api';
import { Toaster } from 'react-hot-toast';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/lib/integration/react";
import { ConfirmDialog } from "primereact/confirmdialog";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './components/common/style/layout/layout.scss'
import './i18n';
// import './ui/themes/viva-light/theme.css'
// import './ui/themes/viva-dark/theme.css'
// import './ui/themes/lara-dark-teal/theme.css'
// import './ui/themes/lara-dark-purple/theme.css'
import './ui/themes/lara-light-teal/theme.css'
// import './ui/themes/soho-light/theme.css'
// import './ui/themes/soho-dark/theme.css'
// import './ui/themes/luna-green/theme.css'
// import './ui/themes/luna-amber/theme.css'
// import './ui/themes/arya-orange/theme.css'
// import './ui/themes/arya-purple/theme.css'
// import './ui/themes/fluent-light/theme.css'
// import './ui/themes/mira/theme.css'
// import './ui/themes/tailwind-light/theme.css'
// import './ui/themes/mdc-dark-indigo/theme.css'
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Refecht cuando se cambia de pantalla
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: 2, // Reintentar fetches fallidos hasta 2 veces automáticamente
      },
    },
  })
  7
  return (
    <HashRouter>
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
    </HashRouter>
  )
}

export default App
