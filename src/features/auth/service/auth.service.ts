import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { AuthPostDTO, AuthSistemPOSTDTO } from "../model/dtos/auth.dto";
import { AuthURL } from "./url/auth.url";
import { SistemaURL } from "@features/sistema/service/url/sistema.url";

const url = AuthURL;

class Auth {
    async postAuth(req: AuthPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postAuthSistem(req: AuthSistemPOSTDTO) {
        return await Axios.post(SistemaURL.postSistem, req, {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const AuthApi = new Auth();