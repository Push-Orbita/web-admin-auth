import { BaseService } from '../../../service/BaseService';
import { PlanEntity } from '../model/entity/plan.entity';
import { PlanURL } from "./url/plan.url";

export class PlanService extends BaseService<PlanEntity> {
    constructor() {
        super(PlanURL);
    }
}

export const PlanApi = new PlanService(); 