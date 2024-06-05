

import { Axios, cancelTokenSource } from '../../config/api/axios.config';
import { OrganizacionDeleteDTO, OrganizacionPatchDTO, OrganizacionPostDTO } from '../../model/dtos/organizacion/organizacion.dto';
import { omitId, replaceParamId } from "../../utilities/replace-param.utils";
import { OrganizacionURL } from '../url/organizacion.url';


const url = OrganizacionURL;

class Organizcion {
    async getOrganizcionSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getOrganizcionById(OrganizcionId: number) {
        return await Axios.get(replaceParamId(url.getById, OrganizcionId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postOrganizcion(req: OrganizacionPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchOrganizcion(req: OrganizacionPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), { cancelToken: cancelTokenSource.token, });
    }
    async deleteOrganizcion(OrganizcionId: OrganizacionDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, OrganizcionId.id), { cancelToken: cancelTokenSource.token, });
    }
}

export const OrganizacionApi = new Organizcion();
