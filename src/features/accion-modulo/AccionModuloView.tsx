import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { fieldValidations } from './components/form/fieldValidations/field.validations';
import { Tag } from 'primereact/tag';
import { useModuleContext } from "@hooks/useModules";

const AccionModuloView = () => {
    const { rowData } = useModuleContext();

    const formFields: FieldConfig[] = [
        {
            name: "modulo",
            type: "select",
            gridSize: "medium",
            selectKey: "modulo"
        },
        {
            name: "accion",
            type: rowData ? "select" : "multiselect",
            gridSize: "medium",
            selectKey: "accion",
            optionLabel: "nombre"
        }
    ];

    const columns: ICustomColumnItem[] = [
        {
            field: "modulo",
            header: "Módulo",
            sortable: true,
            filter: true,
            body: (rowData: any) => {
                const modulo = rowData?.modulo || {};
                const sistema = modulo?.sistema || {};
                const suscripcion = modulo?.suscripcion || {};

                return (
                    <div className="flex flex-column">
                        <span className="font-bold">{modulo.nombre || 'Sin nombre'}</span>
                        <span className="text-sm text-gray-500">{modulo.descripcion || 'Sin descripción'}</span>
                        <div className="flex gap-2 mt-1">
                            {sistema.nombre && (
                                <Tag value={sistema.nombre} severity="info" />
                            )}
                            {suscripcion.nombre && (
                                <Tag value={suscripcion.nombre} severity="success" />
                            )}
                        </div>
                    </div>
                );
            }
        },
        {
            field: "accion",
            header: "Acción",
            sortable: true,
            filter: true,
            body: (rowData: any) => {
                const accion = rowData?.accion || {};

                return (
                    <div className="flex flex-column">
                        <span className="font-bold">{accion.nombre || 'Sin nombre'}</span>
                        <span className="text-sm text-gray-500">{accion.descripcion || 'Sin descripción'}</span>
                    </div>
                );
            }
        }
    ];

    const rowExpansionTemplate = (data: any) => {
        const accionesPorRol = data?.accionesPorRol || [];

        if (accionesPorRol.length === 0) {
            return <div className="p-3">No hay roles asignados</div>;
        }

        return (
            <div className="p-3">
                <h5 className="mb-3">Roles Asignados</h5>
                <div className="flex flex-wrap gap-1">
                    {accionesPorRol.map((accionRol: any) => {
                        const rol = accionRol?.rol || {};
                        return (
                            <Tag
                                key={accionRol.id}
                                value={rol.nombre || 'Sin nombre'}
                                severity="warning"
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <DynamicCrudPage
            moduleKey="accionModulo"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
            rowExpansionTemplate={rowExpansionTemplate}
            showExpandButtons={true}
        />
    );
};

export default AccionModuloView; 