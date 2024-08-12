

import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";


import { RazaTypeURL } from "./url/razaType.url";
import { RazaTypeDeleteDTO, RazaTypePatchDTO, RazaTypePostDTO } from "../model/dtos/razaType.dto";


const url = RazaTypeURL;
class RazaType {
    async getRazaTypeSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getRazaTypeById(RazaTypeId: number) {
        return await Axios.get(replaceParamId(url.getById, RazaTypeId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postRazaType(req: RazaTypePostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchRazaType(req: RazaTypePatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), { cancelToken: cancelTokenSource.token, });
    }
    async deleteRazaType(RazaTypeId: RazaTypeDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, RazaTypeId.id), { cancelToken: cancelTokenSource.token, });
    }
}

export const RazaTypeApi = new RazaType();