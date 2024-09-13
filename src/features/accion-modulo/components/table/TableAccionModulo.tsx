import CustomExpandTable from "@components/common/table/basic-table/CustomExpandTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import _ from 'lodash';
import { DataTable, } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { lang } from "../../../../langs";
import useQueryApi from "@hooks/useQueryApi";
import { AccionApi } from "@features/accion/service/accion.service";
import UseQueryMutation from "@hooks/useQueryMutation";
import { AccionModuloApi } from "@features/accion-modulo/service/accionModulo.service";
import toast from "react-hot-toast";
import { Column } from "primereact/column";


interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
    refetch: () => void; // Asume que tienes una función refetch para recargar los datos
}

export const TableAccionModulo = ({ data, isFetching, handleDelete, refetch }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'modulo.nombre', header: 'Módulo', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Módulo', dataType: 'text' },
    ];

    // Recuperar las acciones disponibles
    const { data: accionesData, isFetching: isFetchingAcciones } = useQueryApi("Accion", AccionApi.getAccionSearch);

    // Agrupamos los datos por módulo
    const groupedData = groupActionsByModule(data.data);

    const patchAccionModulo = UseQueryMutation({
        requestFn: AccionModuloApi.patchAccionModulo,
        options: {
            onError: () => {
                toast.error(t(lang.ActionModule.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.ActionModule.messages.updatedSuccess));
                refetch(); // Refrescar los datos después de la edición exitosa
            },
        },
    });

    // Función que se ejecuta al completar la edición de una fila
    const onRowEditComplete = (e: any) => {
        const { newData, index } = e;
        const rowData = groupedData[index]; // Datos originales de la fila
        
        // Llama a la mutación para enviar los datos actualizados
        patchAccionModulo.mutate({
            id: newData.id, // ID de la acción
            modulo: rowData.modulo.id, // Enviar el ID del módulo
            accion: newData.accion, // ID de la nueva acción seleccionada
        });
    };

    // Editor para el dropdown de acciones
    const actionEditor = (options: any) => {
        return (
            <Dropdown 
                value={options.value} 
                options={accionesData?.data.map((accion: any) => ({ label: accion.nombre, value: accion.id }))} 
                onChange={(e) => options.editorCallback(e.value)} 
                placeholder="Selecciona una acción"
                disabled={isFetchingAcciones}
            />
        );
    };

    // Cuerpo para mostrar el nombre de la acción sin editar
    const actionBodyTemplate = (rowData: any) => {
        const accion = accionesData?.data.find((accion: any) => accion.id === rowData.id);
        return accion ? accion.nombre : rowData.id; // Mostrar nombre si se encuentra, de lo contrario mostrar ID
    };

    // Verifica si la fila es expandible (si tiene acciones)
    const isRowExpandable = (rowData: any) => {
        return rowData.acciones && rowData.acciones.length > 0;
    };
    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    // Plantilla de expansión de fila con DataTable editable
    const rowExpansionTemplate = (rowData: any) => {
        return (
            <div className="p-3">
                <h5 className="font-bold" style={{ color: 'var(--primary-color)' }}>Acciones Disponibles</h5>
                <DataTable value={rowData.acciones} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete}>
                    <Column field="accion" header="Acción" body={actionBodyTemplate} editor={actionEditor} style={{ width: '30%' }}></Column>
                    <Column field="descripcion" header="Descripción" editor={(options:any) => textEditor(options)} style={{ width: '60%' }}></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        );
    };

    return (
        <CustomExpandTable
            data={groupedData}
            loading={isFetching}
            columns={columns}
            tableTitle={t(lang.ActionModule.subTitle)}
            handleDelete={handleDelete}
            filterDisplay={'row'}
            rowsPerPageOptions={[10, 100, 1000]}
            rows={10}
            rowExpansionTemplate={rowExpansionTemplate}
            isRowExpandable={isRowExpandable}
        />
    );
};

// Función para agrupar los datos por módulo
const groupActionsByModule = (data: any[]) => {
    const groupedData = _.groupBy(data, 'modulo.nombre');
    return Object.keys(groupedData).map((moduleName) => ({
        modulo: groupedData[moduleName][0].modulo,
        acciones: groupedData[moduleName].map((item:any) => ({
            id: item.accion.id,
            accion: item.accion.id, // Usamos accion.id para que se mantenga en el Dropdown
            nombre: item.accion.nombre,
            descripcion: item.accion.descripcion
        })),
    }));
};
