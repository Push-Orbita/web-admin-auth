import { t } from "i18next";
import CustomBasicTable from "../../../common/components/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "../../../common/components/table/basic-table/interfaces/custombasictable";
import { lang } from "../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableMarca = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'id', header: '#ID', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Nombre', dataType: 'text' },
    ]

    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.ActionsType.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}

            />
        </>
    )
}
