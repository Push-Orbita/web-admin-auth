import { BaseService } from '../../../service/BaseService';
import { ContratoEntity } from '../model/entity/contrato.entity';
import { ContratoURL } from "./url/contrato.url";

export class ContratoService extends BaseService<ContratoEntity> {
    constructor() {
        super(ContratoURL);
    }
}

export const ContratoApi = new ContratoService(); 