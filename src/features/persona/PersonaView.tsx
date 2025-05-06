import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { GeneroOptions } from "@config/constants/gender";
import { fieldValidations } from "./components/form/fieldValidations/field.validations";


const PersonaView = () => {
    const formFields: FieldConfig[] = [
        { name: "nombre", type: "text", gridSize: "medium", label: "Nombre" },
        { name: "apellido", type: "text", gridSize: "medium", label: "Apellido" },
        { name: "cuil", type: "text", gridSize: "medium", label: "CUIL" },
        {
            name: "genero",
            type: "select",
            gridSize: "medium",
            label: "Género",
            options: GeneroOptions
        }
    ];

    const columns: ICustomColumnItem[] = [
        { field: "nombre", header: "Nombre", sortable: true, filter: true },
        { field: "apellido", header: "Apellido", sortable: true, filter: true },
        { field: "cuil", header: "CUIL", sortable: true, filter: true },
        { field: "genero", header: "Género", sortable: true, filter: true }
    ];

    return (
        <DynamicCrudPage
            moduleKey="persona"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
        />
    );
};

export default PersonaView; 