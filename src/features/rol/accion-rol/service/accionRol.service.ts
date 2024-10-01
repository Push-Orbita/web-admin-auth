import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { AccionRolURL } from "./url/accionRol.url";
import { AccionRolDeleteDTO, AccionRolPatchDTO, AccionRolPostDTO } from "../model/dtos/accionRol.dto";


const url = AccionRolURL;

class AccionRol {
    async getAccionRolSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getAccionRolById(AccionRolId: number) {
        return await Axios.get(replaceParamId(url.getById, AccionRolId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postAccionRol(req: AccionRolPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchAccionRol(req: AccionRolPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteAccionRol(AccionRolId: AccionRolDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, AccionRolId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const AccionRolApi = new AccionRol();