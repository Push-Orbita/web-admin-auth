
import { SuscripcionURL } from './url/suscripcion.url';
import { BaseService } from '../../../service/BaseService';
import { SuscripcionEntity } from '../model/entity/suscripcion.entity';

export class SuscripcionService extends BaseService<SuscripcionEntity> {
    constructor() {
        super(SuscripcionURL);
    }
}

export const SuscripcionApi = new SuscripcionService();