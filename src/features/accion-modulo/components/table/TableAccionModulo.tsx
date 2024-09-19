import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableAccionModulo = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'modulo.nombre', header: 'Modulo', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Modulo', dataType: 'text' },
        { field: 'accion.nombre', header: 'Accion', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Accion', dataType: 'text' },
    ];
    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.ActionModule.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
        </>
    );
};