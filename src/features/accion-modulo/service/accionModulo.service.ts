import { AccionModuloEntity } from '../model/entity/accionModulo.entity';
import { AccionModuloURL } from './url/accionModulo.url';
import { BaseService } from '../../../service/BaseService';

export class AccionModuloService extends BaseService<AccionModuloEntity> {
    constructor() {
        super(AccionModuloURL);
    }
}

export const AccionModuloApi = new AccionModuloService(); 