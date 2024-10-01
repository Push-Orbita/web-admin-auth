import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { PermisosURL } from "./url/permisos.url";
import { PermisosDeleteDTO, PermisosPatchDTO, PermisosPostDTO } from "../model/dtos/permisos.dto";

const url = PermisosURL;

class Permisos {
    async getPermisosSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getPermisosById(PermisosId: number) {
        return await Axios.get(replaceParamId(url.getById, PermisosId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postPermisos(req: PermisosPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchPermisos(req: PermisosPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deletePermisos(PermisosId: PermisosDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, PermisosId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const PermisosApi = new Permisos();