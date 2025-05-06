import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { fieldValidations } from "./components/form/fieldValidations/field.validations";

const AccionView = () => {
    const formFields: FieldConfig[] = [
        { name: "nombre", type: "text", gridSize: "medium", label: "Nombre" },
        { name: "descripcion", type: "text", gridSize: "full", label: "Acronimo" }
    ];

    const columns: ICustomColumnItem[] = [
        { field: "nombre", header: "Nombre", sortable: true, filter: true },
        { field: "descripcion", header: "Acronimo", sortable: true, filter: true }
    ];

    return (
        <DynamicCrudPage
            moduleKey="accion"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
        />
    );
};

export default AccionView; 