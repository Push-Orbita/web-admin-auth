

import { Axios, cancelTokenSource } from '../../config/api/axios.config';
import { SistemaDeleteDTO, SistemaPatchDTO, SistemaPostDTO } from "../../model/dtos/sistema/sistema.dto";
import { omitId, replaceParamId } from "../../utilities/replace-param.utils";
import { SuscripcionURL } from '../url/suscripcion.url';



const url = SuscripcionURL;
class Sistema {
    async getSistemaSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getSistemaById(SistemaId: number) {
        return await Axios.get(replaceParamId(url.getById, SistemaId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postSistema(req: SistemaPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchSistema(req: SistemaPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), { cancelToken: cancelTokenSource.token, });
    }
    async deleteSistema(SistemaId: SistemaDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, SistemaId.id), { cancelToken: cancelTokenSource.token, });
    }
}

export const SistemaApi = new Sistema();
