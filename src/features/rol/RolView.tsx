import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { AccionesPorRol, RolEntity } from "./model/entity/rol.entity";

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

    const renderRowExpand = (rowData: RolEntity) => {
        if (!rowData?.accionesPorRol || !Array.isArray(rowData.accionesPorRol)) {
            return (
                <div className="p-4">
                    <p>No hay acciones disponibles para este rol.</p>
                </div>
            );
        }

        return (
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-3">Acciones Permitidas por Módulo</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {rowData.accionesPorRol.map((accion: AccionesPorRol, index: number) => {
                        const moduloNombre = accion?.accionPorModulo?.modulo?.nombre || 'Módulo no especificado';
                        const accionNombre = accion?.accionPorModulo?.accion?.nombre || 'Acción no especificada';
                        const accionDescripcion = accion?.accionPorModulo?.accion?.descripcion || '';

                        return (
                            <li key={index} className="text-sm">
                                <span className="font-medium">{moduloNombre}:</span>
                                <span className="ml-2">{accionNombre} {accionDescripcion && `(${accionDescripcion})`}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <DynamicCrudPage
            moduleKey="rol"
            formFields={formFields}
            columns={columns}
            rowExpansionTemplate={renderRowExpand}
            showExpandButtons={true}
        />
    );
};

export default RolView; 