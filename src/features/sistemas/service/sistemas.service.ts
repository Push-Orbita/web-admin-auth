
import { SistemasEntity } from '../model/entity/sistema.entity';
import { SistemasURL } from './url/sistemas.url';
import { BaseService } from '../../../service/BaseService';

export class SistemasService extends BaseService<SistemasEntity> {
    constructor() {
        super(SistemasURL);
    }
}

export const SistemasApi = new SistemasService();