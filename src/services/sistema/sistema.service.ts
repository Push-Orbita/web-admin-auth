

import { replaceParamId } from "../../utilities/replace-param.utils";
import { Axios, cancelTokenSource } from '../../config/api/axios.config';
import { MarcaDeleteDTO, MarcaPatchDTO, MarcaPostDTO } from "../../model/dtos/marca/marca.dto";
import { SistemaURL } from "../url/sistema.url";


const url = SistemaURL;
class Marca {
    async getActionsSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getActionsById(MarcaId: number) {
        return await Axios.get(replaceParamId(url.getById, MarcaId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postActions(req: MarcaPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchActions(req: MarcaPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), req, { cancelToken: cancelTokenSource.token, });
    }
    async deleteActions(MarcaId: MarcaDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, MarcaId.id), { cancelToken: cancelTokenSource.token, });
    }
}

export const MarcaApi = new Marca();
