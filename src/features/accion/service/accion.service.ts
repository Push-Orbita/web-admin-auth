import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { AccionURL } from "./url/accion.url";
import { AccionDeleteDTO, AccionPatchDTO, AccionPostDTO } from "../model/dtos/accion.dto";

const url = AccionURL;

class Accion {
    async getAccionSearch(){
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getAccionById(AccionId: number) {
        return await Axios.get(replaceParamId(url.getById, AccionId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postAccion(req: AccionPostDTO){
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchAccion(req: AccionPatchDTO){
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteAccion(AccionId: AccionDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, AccionId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const AccionApi = new Accion();