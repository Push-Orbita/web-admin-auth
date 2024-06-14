import { t } from "i18next";
import CustomBasicTable from "../../../common/components/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "../../../common/components/table/basic-table/interfaces/custombasictable";
import { lang } from "../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableUsuario = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre de Usuario', sortable: true, filter: true, filterPlaceholder: 'Buscar Por nombre', dataType: 'text' },
        { field: 'email', header: 'E-Mail', sortable: true, filter: true, filterPlaceholder: 'Buscar Por email', dataType: 'text' },
    ];

    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.User.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
        </>
    );
};