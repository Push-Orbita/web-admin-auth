import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableSistema = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Nombre', dataType: 'text' },
        { field: 'descripción', header: 'Descripción', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Descripción', dataType: 'text' },
        { field: 'url', header: 'URL', sortable: true, filter: true, filterPlaceholder: 'Buscar Por URL', dataType: 'text' },
        { field: 'icono', header: 'Icono', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Icono', dataType: 'text' },
    ];
    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Sistema.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
        </>
    );
};