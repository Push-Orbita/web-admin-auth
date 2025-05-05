import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { ModuloApi } from "@features/modulo/service/modulo.service";
import { TreeNode } from "primereact/treenode";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adaptarModulosParaTreeSelect } from "./model/adapter/rol.adapter";
import { AccionesPorRol, RolEntity } from "./model/entity/rol.entity";


const RolView = () => {
    const [modulosTree, setModulosTree] = useState<TreeNode[]>([]);

    const cargarModulos = useCallback(async () => {
        try {
            const response = await ModuloApi.getAll();
            if ('data' in response && Array.isArray(response.data)) {
                const modulosAdaptados = adaptarModulosParaTreeSelect(response.data);
                setModulosTree(modulosAdaptados);  
            } else {
                console.error('Formato de respuesta inválido:', response);
                toast.error('Error en el formato de los datos');
            }
        } catch (error) {
            console.error('Error al cargar módulos:', error);
            toast.error('Error al cargar los módulos');
        }
    }, []);

    useEffect(() => {
        cargarModulos();
    }, [cargarModulos]);

    const formFields: FieldConfig[] = [
        {
            name: "nombre",
            type: "text",
            gridSize: "medium"
        },
        {
            name: "descripcion",
            type: "text",
            gridSize: "medium"
        },
        {
            name: "accionesPorRol",
            type: "treeselect",
            label: "Acciones",
            options: modulosTree,
            selectionMode: "checkbox",
            display: "chip",
            filter: true,
            filterMode: "lenient",
            showClear: true,
            gridSize: "full"
        }
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