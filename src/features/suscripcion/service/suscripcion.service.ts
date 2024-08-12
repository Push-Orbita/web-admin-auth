import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { SuscripcionURL } from "./url/suscripcion.url";
import { SuscripcionDeleteDTO, SuscripcionPatchDTO, SuscripcionPostDTO } from "../model/dtos/suscripcion.dto";

const url = SuscripcionURL;

class Suscripcion {
    async getSuscripcionSearch(){
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getSuscripcionById(SuscripcionId: number) {
        return await Axios.get(replaceParamId(url.getById, SuscripcionId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postSuscripcion(req: SuscripcionPostDTO){
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchSuscripcion(req: SuscripcionPatchDTO){
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteSuscripcion(SuscripcionId: SuscripcionDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, SuscripcionId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const SuscripcionApi = new Suscripcion();