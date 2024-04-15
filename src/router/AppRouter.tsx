import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { authorize } from "../common/config/axios";
import { useAppSelector } from "../hooks/reduxHook";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { RouterJs } from './RouterJs';
import AuthLogin from "../pages/authentication/AuthLogin";

export const AppRouter = () => {
  const { isLogged, tokenUser } = useAppSelector(
    (state) => state.auth
  );
  //   const dispatch = useAppDispatch();

  useEffect(() => {
    tokenUser && authorize(tokenUser);
  }, [tokenUser]);
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes isAutenticated={isLogged}>
              <AuthLogin />
            </PublicRoutes>
          }
        ></Route>
        <Route
          path="/*"
          element={
            //Mando por props el valor isLoggedIn del estado del usuario que puede ser true o false
            <PrivateRoutes isAutenticated={isLogged}>
              {/* llamo al componente con la configuración de las rutas privadas que es necesario estar autenticado */}
              <RouterJs />
            </PrivateRoutes>
          }
        ></Route>
      </Routes>
    </>
  );
};
