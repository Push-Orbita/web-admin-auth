import { BaseService } from '../../../service/BaseService';
import { ModuloEntity } from '../model/entity/modulo.entity';
import { ModuloURL } from './url/modulo.url';

export class ModuloService extends BaseService<ModuloEntity> {
    constructor() {
        super(ModuloURL);
    }
}

export const ModuloApi = new ModuloService(); 