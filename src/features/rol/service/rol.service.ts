
import { RolEntity } from '../model/entity/rol.entity';
import { RolURL } from './url/rol.url';
import { BaseService } from '../../../service/BaseService';


export class RolService extends BaseService<RolEntity> {
    constructor() {
        super(RolURL);
    }
}

export const RolApi = new RolService(); 