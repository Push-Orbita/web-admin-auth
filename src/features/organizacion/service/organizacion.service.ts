import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { OrganizacionURL } from "./url/organizacion.url";
import { OrganizacionDeleteDTO, OrganizacionPatchDTO, OrganizacionPostDTO } from "../model/dtos/organizacion.dto";

const url = OrganizacionURL;

class Organizacion {
    async getOrganizacionSearch(){
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getOrganizacionById(OrganizacionId: number) {
        return await Axios.get(replaceParamId(url.getById, OrganizacionId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postOrganizacion(req: OrganizacionPostDTO){
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchOrganizacion(req: OrganizacionPatchDTO){
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteOrganizacion(OrganizacionId: OrganizacionDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, OrganizacionId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const OrganizacionApi = new Organizacion();