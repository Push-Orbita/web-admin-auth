import { PersonaApi } from "@features/persona/service/persona.service";
import { PersonaService } from "@features/persona/service/persona.service";
import { PersonaEntity } from "@features/persona/model/entity/persona.entity";
import { SistemasEntity } from "@features/sistemas/model/entity/sistema.entity";
import { SistemasApi, SistemasService } from "@features/sistemas/service/sistemas.service";
import { SuscripcionEntity } from "@features/suscripciones/model/entity/suscripcion.entity";
import { SuscripcionApi, SuscripcionService } from "@features/suscripciones/service/suscripcion.service";


// Definir los servicios (el mapa indica el tipo de cada servicio)
interface ServiceMap {
    sistemas: SistemasService,
    suscripcion: SuscripcionService,
    persona: PersonaService,
}

// Registro de servicios (instancias reales)
const serviceRegistry: ServiceMap = {
    sistemas: SistemasApi,
    suscripcion: SuscripcionApi,
    persona: PersonaApi,
};

// Definir los posibles módulos
export type ModuleKey = keyof ServiceMap;

interface EntityMap {
    sistemas: SistemasEntity,
    suscripcion: SuscripcionEntity,
    persona: PersonaEntity,
}

export type ModuleEntity<M extends ModuleKey> = EntityMap[M];

export const getServiceApi = <M extends ModuleKey>(moduleKey: M): ServiceMap[M] => {
    return serviceRegistry[moduleKey];
};
