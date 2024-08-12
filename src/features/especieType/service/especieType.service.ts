

import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { EspecieTypeURL } from "./url/especieType.url";
import { EspecieTypeDeleteDTO, EspecieTypePatchDTO, EspecieTypePostDTO } from "../model/dtos/especieType.dto";


const url = EspecieTypeURL;
class EspecieType {
    async getEspecieTypeSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getEspecieTypeById(EspecieTypeId: number) {
        return await Axios.get(replaceParamId(url.getById, EspecieTypeId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postEspecieType(req: EspecieTypePostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchEspecieType(req: EspecieTypePatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), { cancelToken: cancelTokenSource.token, });
    }
    async deleteEspecieType(EspecieTypeId: EspecieTypeDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, EspecieTypeId.id), { cancelToken: cancelTokenSource.token, });
    }
}

export const EspecieTypeApi = new EspecieType();