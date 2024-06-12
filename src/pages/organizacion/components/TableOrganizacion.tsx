import { t } from "i18next";
import CustomBasicTable from "../../../common/components/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "../../../common/components/table/basic-table/interfaces/custombasictable";
import { lang } from "../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableOrganizacion = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'bd', header: 'Base de datos', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Descripción', dataType: 'text' },
        { field: 'host', header: 'Host', sortable: true, filter: true, filterPlaceholder: 'Buscar Por url', dataType: 'text' },
        { field: 'port', header: 'Puerto', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Sistema ID', dataType: 'text' },
        { field: 'usuario', header: 'Usuario', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Sistema Secret', dataType: 'text' },
        { field: 'password', header: 'Contraseña', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Sistema Secret', dataType: 'text' },
        { field: 'tipobd', header: 'Tipo De Base de Datos', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Sistema Secret', dataType: 'text' },

    ]

    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Organization.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}

            />
        </>
    )
}
