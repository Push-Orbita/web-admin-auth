import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { ContratoURL } from "./url/contrato.url";
import { ContratoDeleteDTO, ContratoPatchDTO, ContratoPostDTO } from "../model/dtos/contrato.dto";

const url = ContratoURL;

class Contrato {
    async getContratoSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getContratoById(ContratoId: number) {
        return await Axios.get(replaceParamId(url.getById, ContratoId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postContrato(req: ContratoPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchContrato(req: ContratoPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deleteContrato(ContratoId: ContratoDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, ContratoId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const ContratoApi = new Contrato();