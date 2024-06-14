import { Axios, cancelTokenSource } from '../../config/api/axios.config';
import { UsuarioDeleteDTO, UsuarioPatchDTO, UsuarioPostDTO } from '../../model/dtos/usuario/usuario.dto';


import { omitId, replaceParamId } from "../../utilities/replace-param.utils";
import { UsuarioURL } from '../url/usuario.url';

const url = UsuarioURL;
class Usuario {
    async getUsuarioSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getUsuarioById(UsuarioId: number) {
        return await Axios.get(replaceParamId(url.getById, UsuarioId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postUsuario(req: UsuarioPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async patchUsuario(req: UsuarioPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async deleteUsuario(UsuarioId: UsuarioDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, UsuarioId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const UsuarioApi = new Usuario();