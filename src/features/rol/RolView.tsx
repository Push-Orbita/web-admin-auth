import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";

const RolView = () => {
    const formFields: FieldConfig[] = [
        { name: "nombre", type: "text", gridSize: "medium" },
        { name: "descripcion", type: "text", gridSize: "medium" },
        { name: "accionesPorRol", type: "array", gridSize: "full" }
    ];

    const columns: ICustomColumnItem[] = [
        { field: "nombre", header: "Nombre", sortable: true, filter: true, filterPlaceholder: "Buscar por nombre" },
        { field: "descripcion", header: "Descripción", sortable: true, filter: true }
    ];

    return (
        <DynamicCrudPage
            moduleKey="rol"
            formFields={formFields}
            columns={columns}
        />
    );
};

export default RolView; 