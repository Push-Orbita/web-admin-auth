import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { Tag } from 'primereact/tag';
import { fieldValidations } from './components/form/fieldValidations/field.validations';

const ModuloView = () => {
    const formFields: FieldConfig[] = [
        { name: "nombre", type: "text", gridSize: "medium", label: "Nombre" },
        { name: "descripcion", type: "text", gridSize: "medium", label: "Descripción" },
        { name: "label", type: "text", gridSize: "medium", label: "Label" },
        { name: "element", type: "text", gridSize: "medium", label: "Element" },
        { name: "icon", type: "text", gridSize: "medium", label: "Icono" },
        { name: "path", type: "text", gridSize: "medium", label: "Path" },
        { name: "moduloPadre", type: "select", selectKey: "modulo", gridSize: "medium", label: "Módulo Padre" },
        { name: "sistema", type: "select", gridSize: "medium", label: "Sistema", selectKey: "sistema" },
        {
            name: "accionesPorModulo",
            type: "multiselect",
            gridSize: "full",
            label: "Acciones por Módulo",
            selectKey: "accion",
            optionLabel: "nombre"
        }
    ];

    const columns: ICustomColumnItem[] = [
        {
            field: "nombre",
            header: "Nombre",
            sortable: true,
            filter: true,
            body: (rowData: any) => <div>{rowData?.nombre || "-"}</div>
        },
        {
            field: "descripcion",
            header: "Descripción",
            sortable: true,
            filter: true,
            body: (rowData: any) => <div>{rowData?.descripcion || "-"}</div>
        },
        {
            field: "label",
            header: "Label",
            sortable: true,
            filter: true,
            body: (rowData: any) => <div>{rowData?.label || "-"}</div>
        },
        {
            field: "element",
            header: "Element",
            sortable: true,
            filter: true,
            body: (rowData: any) => <div>{rowData?.element || "-"}</div>
        },
        {
            field: "icon",
            header: "Icono",
            sortable: true,
            filter: true,
            body: (rowData: any) => <div>{rowData?.icon || "-"}</div>
        },
        {
            field: "path",
            header: "Path",
            sortable: true,
            filter: true,
            body: (rowData: any) => <div>{rowData?.path || "-"}</div>
        },
        {
            field: "moduloPadre",
            header: "Módulo Padre",
            sortable: true,
            filter: true,
            body: (rowData: any) => {
                if (!rowData?.moduloPadre) return <div>-</div>;
                if (typeof rowData.moduloPadre === 'object') {
                    return <div>{rowData.moduloPadre.nombre || "-"}</div>;
                }
                return <div>{rowData.moduloPadre || "-"}</div>;
            }
        },
        {
            field: "sistema",
            header: "Sistema",
            sortable: true,
            filter: true,
            body: (rowData: any) => <div>{rowData?.sistema?.nombre || "-"}</div>
        }
    ];

    const renderRowExpand = (rowData: any) => {
        if (!rowData?.accionesPorModulo || !Array.isArray(rowData.accionesPorModulo) || rowData.accionesPorModulo.length === 0) {
            return (
                <div className="p-4">
                    <p>No hay acciones disponibles para este módulo.</p>
                </div>
            );
        }

        return (
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-3">Acciones del Módulo</h3>
                <div className="flex flex-wrap gap-2">
                    {rowData.accionesPorModulo.map((accion: any) => (
                        <Tag
                            key={accion.id}
                            value={accion?.accion?.nombre || "-"}
                            severity="warning"
                            className="text-sm"
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <DynamicCrudPage
            moduleKey="modulo"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
            rowExpansionTemplate={renderRowExpand}
            showExpandButtons={true}
        />
    );
};

export default ModuloView; 