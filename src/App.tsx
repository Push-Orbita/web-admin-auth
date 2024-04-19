import 'primeflex/primeflex.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/lib/integration/react";
import './common/styles/layout/layout.scss';
import './i18n';
import { persistor, store } from "./redux/store/store";
import { AppRouter } from './router/AppRouter';
// import './themes/lara-dark-purple/theme.css';
import './themes/lara-light-purple/theme.css';
import { PermisosProvider } from './hooks/usePermisos';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ModuleProvider } from './hooks/useModules';

function App() {
  const queryClient = new QueryClient()
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>


        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <PrimeReactProvider >
              <PermisosProvider>
                <ModuleProvider>
                  <AppRouter />
                </ModuleProvider>
              </PermisosProvider >
            </PrimeReactProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </HashRouter>
  )
}

export default App
