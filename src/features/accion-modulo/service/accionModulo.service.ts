import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { AccionModuloURL } from "./url/accionModulo.url";
import { AccionModuloDeleteDTO, AccionModuloPatchDTO, AccionModuloPostDTO } from "../model/dtos/accionModulo.dto";

const url = AccionModuloURL;

class AccionModulo {
    async getAccionModuloSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getAccionModuloById(AccionModuloId: number) {
        return await Axios.get(replaceParamId(url.getById, AccionModuloId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postAccionModulo(req: AccionModuloPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchAccionModulo(req: AccionModuloPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteAccionModulo(AccionModuloId: AccionModuloDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, AccionModuloId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getAccionModuloByModuloId(moduloId: number) {
        return await Axios.get(`${url.get}?modulo=${moduloId}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const AccionModuloApi = new AccionModulo();