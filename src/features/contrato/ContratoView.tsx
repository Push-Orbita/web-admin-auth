import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { fieldValidations } from "./components/form/fieldValidations/field.validations";

const ContratoView = () => {
    const formFields: FieldConfig[] = [
        { name: "plan", type: "select", selectKey: "plan", gridSize: "medium", label: "Plan" },
        { name: "organizacion", type: "select", selectKey: "organizacion", gridSize: "medium", label: "Organización" },
        { name: "fechaVencimiento", type: "date", gridSize: "medium", label: "Fecha de Vencimiento" }
    ];

    const columns: ICustomColumnItem[] = [
        {
            field: "fechaVencimiento",
            header: "Fecha de Vencimiento",
            sortable: true,
            filter: true,
            body: (rowData: any) => {
                const date = new Date(rowData.fechaVencimiento);
                return date.toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
        },
        {
            field: "plan",
            header: "Plan",
            sortable: true,
            filter: true,
            body: (rowData: any) => rowData.plan?.nombre || ''
        },
        {
            field: "organizacion",
            header: "Organización",
            sortable: true,
            filter: true,
            body: (rowData: any) => rowData.organizacion?.nombre || ''
        }
    ];

    return (
        <DynamicCrudPage
            moduleKey="contrato"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
        />
    );
};

export default ContratoView; 