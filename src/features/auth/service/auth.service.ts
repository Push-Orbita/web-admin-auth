import { AuthAxios, cancelTokenSource } from "@config/api/axios.config";

import { AxiosRequestConfig } from "axios"; // Importar el tipo para la configuración de Axios
import { AuthPostDTO, AuthSistemPOSTDTO } from "../model/dtos/auth.dto";
import { AuthURL } from "./url/auth.url";
import { SistemaURL } from "./url/sistema.url";

const url = AuthURL;

class Auth {
    // Aceptamos un segundo argumento opcional 'config' para permitir agregar headers
    async postAuth(req: AuthPostDTO, config?: AxiosRequestConfig) {
        return await AuthAxios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
            ...config,  // Extender la configuración para aceptar headers adicionales
        });
    }

    async postAuthSistem(req: AuthSistemPOSTDTO) {
        return await AuthAxios.post(SistemaURL.postSistem, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async refreshToken(accessToken: string) {
        return await AuthAxios.post(url.refreshToken, {}, {
            cancelToken: cancelTokenSource.token,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    async refreshWithRefreshToken(refreshToken: string) {
        return await AuthAxios.post(url.refreshWithRefreshToken, { refreshToken }, {
            cancelToken: cancelTokenSource.token
        });
    }
}

export const AuthApi = new Auth();
