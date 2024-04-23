

import { ActionsDeleteDTO, ActionsPatchDTO, ActionsPostDTO } from "../../model/dtos/actions/actions.dto";
import { replaceParamId } from "../../utilities/replace-param.utils";
import { Axios, cancelTokenSource } from '../../config/api/axios.config';
import { ActionsURL } from "../url/actions.url";

const url = ActionsURL;
class Actions {
    async getActionsSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }
    async getActionsById(ActionsId: number) {
        return await Axios.get(replaceParamId(url.getById, ActionsId), {
            cancelToken: cancelTokenSource.token,
        });
    }
    async postActions(req: ActionsPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        })
    }
    async patchActions(req: ActionsPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id),req, { cancelToken: cancelTokenSource.token, });
    }
    async deleteActions(ActionsId: ActionsDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, ActionsId.id), { cancelToken: cancelTokenSource.token, });
    }
}

export const ActionsApi = new Actions();
