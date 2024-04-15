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

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PrimeReactProvider >
            <AppRouter />
          </PrimeReactProvider>
        </PersistGate>
      </Provider>
    </HashRouter>
  )
}

export default App
