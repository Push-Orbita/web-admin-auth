import { t } from "i18next";
import CustomBasicTable from "../../../../common/components/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "../../../../common/components/table/basic-table/interfaces/custombasictable";
import { lang } from "../../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableAction = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'descripcion', header: 'Descripcion', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Descripcion', dataType: 'text' },
        { field: 'porcentaje', header: 'Porcentaje', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Porcentaje', dataType: 'text' },

    ]

    return (
        <>
            <CustomBasicTable
                data={data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.IvaType.subTitle)}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
                handleDelete={handleDelete}

            />
        </>
    )
}
