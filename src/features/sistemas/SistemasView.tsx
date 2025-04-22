import { fieldValidations } from "./components/form/fieldValidations/field.validations";
import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";

const SistemasView = () => {
    const formFields: FieldConfig[] = [
        { name: "nombre", label: "Titulo", type: "text", gridSize: "medium" },
        { name: "descripcion", label: "Descripción", type: "text", gridSize: "medium" },
        { name: "url", label: "URL", type: "text", gridSize: "medium" },
        { name: "icon", label: "Ícono", type: "icon-select", gridSize: "medium" },
        { name: "host", label: "Host", type: "text", gridSize: "medium" },
        { name: "port", label: "Puerto", type: "number", gridSize: "medium" },
        { name: "usuario", label: "Usuario", type: "text", gridSize: "medium" },
        { name: "password", label: "Contraseña", type: "password", gridSize: "medium" },
        { name: "tipobd", label: "Tipo de base de datos", type: "text", gridSize: "medium" },
    ];

    const columns: ICustomColumnItem[] = [
        { field: "nombre", header: "Nombre", sortable: true, filter: true, filterPlaceholder: "Buscar por titulo", dataType: "text" },
        { field: "descripcion", header: "Descripción", sortable: true, filter: true, filterPlaceholder: "Buscar por descripción", dataType: "text" },
        { field: "url", header: "URL", sortable: true, filter: true, filterPlaceholder: "Buscar por URL", dataType: "text" },
        { field: "icono", header: "Icono", sortable: true, filter: true, filterPlaceholder: "Buscar por icono", dataType: "text" },
    ];

    return (
        <DynamicCrudPage
            moduleKey="sistemas"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
        />
    );
};

export default SistemasView;