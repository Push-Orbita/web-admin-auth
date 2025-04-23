import { fieldValidations } from "./components/form/fieldValidations/field.validations";
import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";

const SuscripcionView = () => {
    const formFields: FieldConfig[] = [
        { name: "nombre", type: "text", gridSize: "medium" },
        { name: "descripcion", type: "text", gridSize: "medium" },
        { name: "sistema", type: "select", selectKey: "sistema", gridSize: "medium" },
    ];

    const columns: ICustomColumnItem[] = [
        { field: "nombre", header: "Nombre", sortable: true, filter: true, filterPlaceholder: "Buscar por nombre", dataType: "text" },
        { field: "descripcion", header: "Descripción", sortable: true, filter: true, filterPlaceholder: "Buscar por descripción", dataType: "text" },

    ];

    return (
        <DynamicCrudPage
            moduleKey="suscripcion"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
        />
    );
};

export default SuscripcionView;