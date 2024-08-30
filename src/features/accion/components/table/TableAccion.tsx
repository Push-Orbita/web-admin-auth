import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableAccion = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Nombre', dataType: 'text' },
        { field: 'descripcion', header: 'Sigla/Simbolo', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Sigla/Simbolo', dataType: 'text' },
    ];
    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Action.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
        </>
    );
};