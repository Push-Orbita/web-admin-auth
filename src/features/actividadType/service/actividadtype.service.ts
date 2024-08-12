import { ActividadTypeURL } from "./url/actividadtype.url";
import { ActividadTypeDeleteDTO, ActividadTypePatchDTO, ActividadTypePostDTO } from "../model/dtos/actividadType.dto";
import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";

const url = ActividadTypeURL;
class ActividadType {
    async getActividadTypeSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getActividadTypeById(ActividadTypeId: number) {
        return await Axios.get(replaceParamId(url.getById, ActividadTypeId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postActividadType(req: ActividadTypePostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchActividadType(req: ActividadTypePatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), { cancelToken: cancelTokenSource.token, });
    }
    async deleteActividadType(ActividadTypeId: ActividadTypeDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, ActividadTypeId.id), { cancelToken: cancelTokenSource.token, });
    }
}

export const ActividadTypeApi = new ActividadType();