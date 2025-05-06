import { AccionModuloEntity } from "@features/accion-modulo/model/entity/accionModulo.entity";
import { AccionModuloApi, AccionModuloService } from "@features/accion-modulo/service/accionModulo.service";
import { AccionEntity } from "@features/accion/model/entity/accion.entity";
import { AccionApi, AccionService } from "@features/accion/service/accion.service";
import { ContratoEntity } from "@features/contrato/model/entity/contrato.entity";
import { ContratoApi, ContratoService } from "@features/contrato/service/contrato.service";
import { ModuloEntity, PermisoEntity } from "@features/modulo/model/entity/modulo.entity";
import { ModuloApi, ModuloService } from "@features/modulo/service/modulo.service";
import { OrganizacionEntity } from "@features/organizacion/model/entity/organizacion.entity";
import { OrganizacionApi, OrganizacionService } from "@features/organizacion/service/organizacion.service";
import { PermisosApi, PermisosService } from "@features/permisos/service/permisos.service";
import { PersonaEntity } from "@features/persona/model/entity/persona.entity";
import { PersonaApi, PersonaService } from "@features/persona/service/persona.service";
import { PlanEntity } from "@features/plan/model/entity/plan.entity";
import { PlanApi, PlanService } from "@features/plan/service/plan.service";
import { RolEntity } from "@features/rol/model/entity/rol.entity";
import { RolApi, RolService } from "@features/rol/service/rol.service";
import { SistemasEntity } from "@features/sistemas/model/entity/sistema.entity";
import { SistemasApi, SistemasService } from "@features/sistemas/service/sistemas.service";
import { SuscripcionEntity } from "@features/suscripciones/model/entity/suscripcion.entity";
import { SuscripcionApi, SuscripcionService } from "@features/suscripciones/service/suscripcion.service";
import { UsuarioEntity } from "@features/usuario/model/entity/usuario.entity";
import { UsuarioApi, UsuarioService } from "@features/usuario/service/usuario.service";

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
    modulo: ModuloService,
    accionModulo: AccionModuloService,
    permisos: PermisosService
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
    modulo: ModuloApi,
    accionModulo: AccionModuloApi,
    permisos: PermisosApi,
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
    modulo: ModuloEntity,
    accionModulo: AccionModuloEntity,
    permisos: PermisoEntity
}

export type ModuleEntity<M extends ModuleKey> = EntityMap[M];

export const getServiceApi = <M extends ModuleKey>(moduleKey: M): ServiceMap[M] => {
    return serviceRegistry[moduleKey];
};
