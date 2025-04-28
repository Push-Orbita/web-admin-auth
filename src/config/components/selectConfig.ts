import { SistemasApi } from "@features/sistemas/service/sistemas.service";
import { SuscripcionApi } from "@features/suscripciones/service/suscripcion.service";
import { OrganizacionApi } from "@features/organizacion/service/organizacion.service";
import { PlanApi } from "@features/plan/service/plan.service";
import { AccionApi } from "@features/accion/service/accion.service";
import { PersonaApi } from "@features/persona/service/persona.service";
import { ModuloApi } from "@features/modulo/service/modulo.service";
interface SelectEntityConfig {
    apiService: () => Promise<any>; // API que devuelve las opciones
    labelField: string; // Campo que se usará como label en el select
    valueField: string; // Campo que se usará como value en el select
}

const selectEntitiesConfig: Record<string, SelectEntityConfig> = {
    sistema: {
        apiService: SistemasApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
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
        apiService: ModuloApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    }

};

export default selectEntitiesConfig;
