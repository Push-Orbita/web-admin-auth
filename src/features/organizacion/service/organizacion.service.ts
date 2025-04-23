import { OrganizacionEntity } from '../model/entity/organizacion.entity';
import { OrganizacionURL } from "./url/organizacion.url";
import { BaseService } from '../../../service/BaseService';

export class OrganizacionService extends BaseService<OrganizacionEntity> {
    constructor() {
        super(OrganizacionURL);
    }
}

export const OrganizacionApi = new OrganizacionService(); 