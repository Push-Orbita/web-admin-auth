import { AccionApi } from "@features/accion/service/accion.service";
import { ModuloApi } from "@features/modulo/service/modulo.service";
import { OrganizacionApi } from "@features/organizacion/service/organizacion.service";
import { PersonaApi } from "@features/persona/service/persona.service";
import { PlanApi } from "@features/plan/service/plan.service";
import { SistemaApi } from "@features/sistema/service/sistema.service";
import { SuscripcionApi } from "@features/suscripcion/service/suscripcion.service";

interface SelectEntityConfig {
    apiService: () => Promise<any>; // API que devuelve las opciones
    labelField: string; // Campo que se usará como label en el select
    valueField: string; // Campo que se usará como value en el select
}

const selectEntitiesConfig: Record<string, SelectEntityConfig> = {
    persona: {
        apiService: PersonaApi.getPersonaSearch,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    modulo: {
        apiService: ModuloApi.getModuloSearch,
        labelField: "nombre",
        valueField: "id",
    },
    accion: {
        apiService: AccionApi.getAccionSearch,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    plan: {
        apiService: PlanApi.getPlanSearch,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    organizacion: {
        apiService: OrganizacionApi.getOrganizacionSearch,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    suscripcion: {
        apiService: SuscripcionApi.getSuscripcionSearch,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    sistema: {
        apiService: SistemaApi.getSistemaSearch,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },

};

export default selectEntitiesConfig;
