import { AccionApi } from "@features/accion/service/accion.service";
import { ModuloService } from "@features/modulo/service/modulo.service";
import { OrganizacionApi } from "@features/organizacion/service/organizacion.service";
import { PersonaApi } from "@features/persona/service/persona.service";
import { PlanApi } from "@features/plan/service/plan.service";
import { RolApi } from "@features/rol/service/rol.service";
import { SistemasApi } from "@features/sistemas/service/sistemas.service";

import { SuscripcionApi } from "@features/suscripciones/service/suscripcion.service";
import { UsuarioApi } from "@features/usuario/service/usuario.service";

export interface SelectEntityConfig {
    apiService: () => Promise<any>;
    getById?: (id: number) => Promise<any>;
    labelField?: string;
    valueField?: string;
}

const selectEntitiesConfig: Record<string, SelectEntityConfig> = {
    sistema: {
        apiService: SistemasApi.getAll,
        labelField: 'nombre',
        valueField: 'id'
    },
    suscripcion: {
        apiService: SuscripcionApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    organizacion: {
        apiService: OrganizacionApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    plan: {
        apiService: PlanApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    accion: {
        apiService: AccionApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    persona: {
        apiService: PersonaApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    modulo: {
        apiService: () => new ModuloService().getAll(),
        labelField: 'nombre',
        valueField: 'id'
    },
    rol: {
        apiService: RolApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    usuario: {
        apiService: UsuarioApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    }
};

export default selectEntitiesConfig;
