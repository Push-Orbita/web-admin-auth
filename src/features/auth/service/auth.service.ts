import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { AuthPostDTO } from "../model/dtos/auth.dto";
import { AuthURL } from "./url/auth.url";

const url = AuthURL;

class Auth {


    async postAuth(req: AuthPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

}

export const AuthApi = new Auth();