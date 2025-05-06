import { BaseService } from '../../../service/BaseService';
import { AccionEntity } from '../model/entity/accion.entity';
import { AccionURL } from "./url/accion.url";

export class AccionService extends BaseService<AccionEntity> {
    constructor() {
        super(AccionURL);
    }
}

export const AccionApi = new AccionService(); 