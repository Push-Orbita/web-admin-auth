import { BaseService } from '../../../service/BaseService';
import { UsuarioEntity } from '../model/entity/usuario.entity';
import { UsuarioURL } from "./url/usuario.url";

export class UsuarioService extends BaseService<UsuarioEntity> {
    constructor() {
        super(UsuarioURL);
    }
}

export const UsuarioApi = new UsuarioService(); 