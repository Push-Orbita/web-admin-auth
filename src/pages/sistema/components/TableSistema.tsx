import { t } from "i18next";
import CustomBasicTable from "../../../common/components/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "../../../common/components/table/basic-table/interfaces/custombasictable";
import { lang } from "../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableSistema = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'descripcion', header: 'Descripción', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Descripción', dataType: 'text' },
        { field: 'url', header: 'URL', sortable: true, filter: true, filterPlaceholder: 'Buscar Por url', dataType: 'text' },
        { field: 'clientId', header: 'Sistema #ID', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Sistema ID', dataType: 'text' },
        { field: 'clientSecret', header: 'Sistema #Secret', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Sistema Secret', dataType: 'text' },

    ]

    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.System.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}

            />
        </>
    )
}
