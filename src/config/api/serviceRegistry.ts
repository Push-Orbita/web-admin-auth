import { PersonaApi } from "@features/persona/service/persona.service";
import { PersonaService } from "@features/persona/service/persona.service";
import { PersonaEntity } from "@features/persona/model/entity/persona.entity";
import { SistemasEntity } from "@features/sistemas/model/entity/sistema.entity";
import { SistemasApi, SistemasService } from "@features/sistemas/service/sistemas.service";
import { SuscripcionEntity } from "@features/suscripciones/model/entity/suscripcion.entity";
import { SuscripcionApi, SuscripcionService } from "@features/suscripciones/service/suscripcion.service";
import { OrganizacionApi, OrganizacionService } from "@features/organizacion/service/organizacion.service";
import { OrganizacionEntity } from "@features/organizacion/model/entity/organizacion.entity";
import { PlanService } from "@features/plan/service/plan.service";
import { PlanApi } from "@features/plan/service/plan.service";
import { PlanEntity } from "@features/plan/model/entity/plan.entity";
// Definir los servicios (el mapa indica el tipo de cada servicio)
interface ServiceMap {
    sistemas: SistemasService,
    suscripcion: SuscripcionService,
    persona: PersonaService,
    organizacion: OrganizacionService,
    plan: PlanService,
}

// Registro de servicios (instancias reales)
const serviceRegistry: ServiceMap = {
    sistemas: SistemasApi,
    suscripcion: SuscripcionApi,
    persona: PersonaApi,
    organizacion: OrganizacionApi,
    plan: PlanApi,
};

// Definir los posibles módulos
export type ModuleKey = keyof ServiceMap;

interface EntityMap {
    sistemas: SistemasEntity,
    suscripcion: SuscripcionEntity,
    persona: PersonaEntity,
    organizacion: OrganizacionEntity,
    plan: PlanEntity,
}

export type ModuleEntity<M extends ModuleKey> = EntityMap[M];

export const getServiceApi = <M extends ModuleKey>(moduleKey: M): ServiceMap[M] => {
    return serviceRegistry[moduleKey];
};
