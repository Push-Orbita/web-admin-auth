import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { AccionesPorRol, PermisosDeAcceso, RolEntity } from "./model/entity/rol.entity";

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
        return (
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-3">Acciones Permitidas por Módulo</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {rowData.accionesPorRol.map((accion: any, index: number) => (
                        <li key={index} className="text-sm">
                            <span className="font-medium">{accion.accionPorModulo.modulo.nombre}:</span>
                            <span className="ml-2">{accion.accionPorModulo.accion.nombre} ({accion.accionPorModulo.accion.descripcion})</span>
                        </li>
                    ))}
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