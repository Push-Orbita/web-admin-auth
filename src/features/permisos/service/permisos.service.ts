
import { PermisosEntity } from '../model/entity/permisos.entity';
import { PermisosURL } from "./url/permisos.url";
import { BaseService } from '../../../service/BaseService';

export class PermisosService extends BaseService<PermisosEntity> {
    constructor() {
        super(PermisosURL);
    }
}

export const PermisosApi = new PermisosService(); 