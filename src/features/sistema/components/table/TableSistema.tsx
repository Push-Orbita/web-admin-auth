import CustomExpandTable from "@components/common/table/basic-table/CustomExpandTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}

export const TableSistema = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Nombre', dataType: 'text' },
        { field: 'descripcion', header: 'Descripción', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Descripción', dataType: 'text' },
        { field: 'url', header: 'URL', sortable: true, filter: true, filterPlaceholder: 'Buscar Por URL', dataType: 'text' },
        { field: 'icono', header: 'Icono', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Icono', dataType: 'text' },
    ];

    const isRowExpandable = (rowData: any) => {
        return rowData.modulos.length > 0 || rowData.permisos.length > 0;
    };

    const rowExpansionTemplate = (rowData: any) => {
        return (
            <div className="p-3">
                <h5 className="font-bold" style={{
                    color: 'var(--primary-color)'
                }}>Modulos</h5>
                {rowData.modulos && rowData.modulos.length > 0 ? (
                    <DataTable value={rowData.modulos}>
                        <Column field="nombre" header="Nombre del modulo" />
                        <Column field="descripcion" header="Descripción del modulo" />
                    </DataTable>
                ) : (
                    <p>No hay módulos disponibles.</p>
                )}

                <h5 className="font-bold" style={{
                    color: 'var(--primary-color)'
                }}>Permisos De Acceso</h5>
                {rowData.permisos && rowData.permisos.length > 0 ? (
                    <DataTable value={rowData.permisos}>
                        <Column field="nombre" header="Nombre del permiso" />
                        <Column field="descripcion" header="Descripción del permiso" />
                    </DataTable>
                ) : (
                    <p>No hay permisos disponibles.</p>
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
                tableTitle={t(lang.Sistema.subTitle)}
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
