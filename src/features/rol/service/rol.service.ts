import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { RolURL } from "./url/rol.url";
import { RolDeleteDTO, RolPatchDTO, RolPostDTO } from "../model/dtos/rol.dto";

const url = RolURL;

class Rol {
    async getRolSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getRolById(RolId: number) {
        return await Axios.get(replaceParamId(url.getById, RolId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postRol(req: RolPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchRol(req: RolPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteRol(RolId: RolDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, RolId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const RolApi = new Rol();