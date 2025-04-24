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
import { ContratoApi, ContratoService } from "@features/contrato/service/contrato.service";
import { ContratoEntity } from "@features/contrato/model/entity/contrato.entity";
import { AccionApi, AccionService } from "@features/accion/service/accion.service";
import { AccionEntity } from "@features/accion/model/entity/accion.entity";
import { UsuarioApi } from "@features/usuario/service/usuario.service";
import { UsuarioEntity } from "@features/usuario/model/entity/usuario.entity";
import { UsuarioService } from "@features/usuario/service/usuario.service";
import { RolApi, RolService } from "@features/rol/service/rol.service";
import { RolEntity } from "@features/rol/model/entity/rol.entity";
    // Definir los servicios (el mapa indica el tipo de cada servicio)
interface ServiceMap {
    sistemas: SistemasService,
    suscripcion: SuscripcionService,
    persona: PersonaService,
    organizacion: OrganizacionService,
    plan: PlanService,
    contrato: ContratoService,
    accion: AccionService,
    usuario: UsuarioService,
    rol: RolService,
}

// Registro de servicios (instancias reales)
const serviceRegistry: ServiceMap = {
    sistemas: SistemasApi,
    suscripcion: SuscripcionApi,
    persona: PersonaApi,
    organizacion: OrganizacionApi,
    plan: PlanApi,
    contrato: ContratoApi,
    accion: AccionApi,
    usuario: UsuarioApi,
    rol: RolApi,
};

// Definir los posibles módulos
export type ModuleKey = keyof ServiceMap;

interface EntityMap {
    sistemas: SistemasEntity,
    suscripcion: SuscripcionEntity,
    persona: PersonaEntity,
    organizacion: OrganizacionEntity,
    plan: PlanEntity,
    contrato: ContratoEntity,
    accion: AccionEntity,
    usuario: UsuarioEntity,
    rol: RolEntity,
}

export type ModuleEntity<M extends ModuleKey> = EntityMap[M];

export const getServiceApi = <M extends ModuleKey>(moduleKey: M): ServiceMap[M] => {
    return serviceRegistry[moduleKey];
};
