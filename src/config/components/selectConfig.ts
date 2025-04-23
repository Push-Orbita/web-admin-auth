import { SistemasApi } from "@features/sistemas/service/sistemas.service";
import { SuscripcionApi } from "@features/suscripciones/service/suscripcion.service";


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

};

export default selectEntitiesConfig;
