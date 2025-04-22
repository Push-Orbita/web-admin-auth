import { CategoriaTypeApi } from "@features/categoria-type/service/categoriaType.service";
import { TagTypeApi } from "@features/tag-type/service/tagType.service";


interface SelectEntityConfig {
    apiService: () => Promise<any>; // API que devuelve las opciones
    labelField: string; // Campo que se usará como label en el select
    valueField: string; // Campo que se usará como value en el select
}

const selectEntitiesConfig: Record<string, SelectEntityConfig> = {

    categoriaTypeOption: {
        apiService: CategoriaTypeApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    tagTypeOption: {
        apiService: TagTypeApi.getAll,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },

};

export default selectEntitiesConfig;
