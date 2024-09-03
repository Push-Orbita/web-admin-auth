import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { PersonaURL } from "./url/persona.url";
import { PersonaDeleteDTO, PersonaPatchDTO, PersonaPostDTO } from "../model/dtos/persona.dto";

const url = PersonaURL;

class Persona {
    async getPersonaSearch(){
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getPersonaById(PersonaId: number) {
        return await Axios.get(replaceParamId(url.getById, PersonaId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postPersona(req: PersonaPostDTO){
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchPersona(req: PersonaPatchDTO){
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deletePersona(PersonaId: PersonaDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, PersonaId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const PersonaApi = new Persona();