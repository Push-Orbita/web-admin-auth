import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { fieldValidations } from "./components/form/fieldValidations/field.validations";

const PlanView = () => {
    const formFields: FieldConfig[] = [
        { name: "nombre", type: "text", gridSize: "medium", label: "Nombre" },
        { name: "descripcion", type: "text", gridSize: "full", label: "Descripción" },
        { name: "duracion", type: "number", gridSize: "quarter", label: "Duración" },
        { name: "precio", type: "number", gridSize: "quarter", label: "Precio" },
        { name: "suscripcion", type: "select", selectKey: "suscripcion", gridSize: "medium" }
    ];

    const columns: ICustomColumnItem[] = [
        { field: "nombre", header: "Nombre", sortable: true, filter: true },
        { field: "descripcion", header: "Descripción", sortable: true, filter: true },
        { field: "duracion", header: "Duración", sortable: true, filter: true },
        { field: "precio", header: "Precio", sortable: true, filter: true },
        {
            field: "suscripcion",
            header: "Suscripción",
            sortable: true,
            filter: true,
            body: (rowData: any) => rowData.suscripcion?.nombre || ''
        }
    ];

    return (
        <DynamicCrudPage
            moduleKey="plan"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
        />
    );
};

export default PlanView; 