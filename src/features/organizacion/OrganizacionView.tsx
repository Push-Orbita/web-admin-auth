import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { fieldValidations } from "./components/form/fieldValidations/field.validations";

const OrganizacionView = () => {
    const formFields: FieldConfig[] = [
        { name: "nombre", type: "text", gridSize: "full" }
    ];

    const columns: ICustomColumnItem[] = [
        { field: "nombre", header: "Nombre", sortable: true, filter: true }
    ];

    return (
        <DynamicCrudPage
            moduleKey="organizacion"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
        />
    );
};

export default OrganizacionView; 