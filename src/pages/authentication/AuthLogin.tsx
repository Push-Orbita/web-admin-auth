import 'primeicons/primeicons.css';
import fondo from '../../assets/img/auth/logo.svg';
import { AuthLayout } from "../../layout/AuthLayout";

import { AuthForm } from './components/AuthForm';
const AuthLogin = () => {
  return (
    <AuthLayout
      fondo={fondo}
      Form={<AuthForm />}
    />
  )
}

export default AuthLogin;


