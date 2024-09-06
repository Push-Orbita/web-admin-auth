import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { ModuloURL } from "./url/modulo.url";
import { ModuloDeleteDTO, ModuloPatchDTO, ModuloPostDTO } from "../model/dtos/modulo.dto";

const url = ModuloURL;

class Modulo {
    async getModuloSearch(){
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getModuloById(ModuloId: number) {
        return await Axios.get(replaceParamId(url.getById, ModuloId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postModulo(req: ModuloPostDTO){
        return await Axios.post(url.post, req.body, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchModulo(req: ModuloPatchDTO){
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteModulo(ModuloId: ModuloDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, ModuloId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const ModuloApi = new Modulo();