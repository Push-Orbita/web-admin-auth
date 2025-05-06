
import { PersonaEntity } from '../model/entity/persona.entity';
import { PersonaURL } from "./url/persona.url";
import { BaseService } from '../../../service/BaseService';

export class PersonaService extends BaseService<PersonaEntity> {
    constructor() {
        super(PersonaURL);
    }
}

export const PersonaApi = new PersonaService(); 