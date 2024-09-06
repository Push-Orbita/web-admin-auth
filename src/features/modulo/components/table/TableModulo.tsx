import CustomExpandTable from "@components/common/table/basic-table/CustomExpandTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}

export const TableModulo = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Nombre', dataType: 'text' },
        { field: 'descripcion', header: 'Descripción', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Descripción', dataType: 'text' },
        { field: 'label', header: 'Label', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Label', dataType: 'text' },
        { field: 'element', header: 'Elemento React', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Elemento', dataType: 'text' },
        { field: 'icon', header: 'Icono', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Icono', dataType: 'text' },
        { field: 'path', header: 'Path', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Path', dataType: 'text' },
        { field: 'sistema.nombre', header: 'Sistema', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Path', dataType: 'text' },
    ];

    const isRowExpandable = (rowData: any) => {
        // Si existe un objeto "sistema", la fila es expandible
        return !!rowData.sistema;
    };

    const rowExpansionTemplate = (rowData: any) => {
        const sistema = rowData.sistema;

        return (
            <div className="p-3">
                <h5 className="font-bold" style={{ color: 'var(--primary-color)' }}>Detalles del Sistema</h5>
                {sistema ? (
                    <div>
                        <p><strong>Nombre del Sistema:</strong> {sistema.nombre}</p>
                        <p><strong>Descripción:</strong> {sistema.descripcion}</p>
                        <p><strong>URL:</strong> {sistema.url}</p>
                        <p><strong>Icono:</strong> {sistema.icono}</p>
                        {/* Agrega otros campos del sistema aquí si es necesario */}
                    </div>
                ) : (
                    <p>No hay detalles disponibles para este sistema.</p>
                )}
            </div>
        );
    };

    return (
        <>
            <CustomExpandTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Module.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
                rowExpansionTemplate={rowExpansionTemplate}
                isRowExpandable={isRowExpandable}
            />
        </>
    );
};
