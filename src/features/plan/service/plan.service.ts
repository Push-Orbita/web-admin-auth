import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";
import { PlanURL } from "./url/plan.url";
import { PlanDeleteDTO, PlanPatchDTO, PlanPostDTO } from "../model/dtos/plan.dto";

const url = PlanURL;

class Plan {
    async getPlanSearch() {
        return await Axios.get(`${url.get}`, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async getPlanById(PlanId: number) {
        return await Axios.get(replaceParamId(url.getById, PlanId), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async postPlan(req: PlanPostDTO) {
        return await Axios.post(url.post, req, {
            cancelToken: cancelTokenSource.token,
        });
    }

    async patchPlan(req: PlanPatchDTO) {
        return await Axios.patch(replaceParamId(url.patch, req.id), omitId(req), {
            cancelToken: cancelTokenSource.token,
        });
    }

    async deletePlan(PlanId: PlanDeleteDTO) {
        return await Axios.delete(replaceParamId(url.delete, PlanId.id), {
            cancelToken: cancelTokenSource.token,
        });
    }
}

export const PlanApi = new Plan();