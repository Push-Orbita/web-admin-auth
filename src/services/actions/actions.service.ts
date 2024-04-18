

import { ActionsDeleteDTO, ActionsPatchDTO } from "../../model/dtos/actions/actions.dto";

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

    async patchActions(req: ActionsPatchDTO) {
        return await Axios.patch(url.patch, req, { cancelToken: cancelTokenSource.token, });
    }
    async deleteActions(ActionsId: ActionsDeleteDTO) {
        return await Axios.delete(url.delete, {
            data: ActionsId,
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const ActionsApi = new Actions();
