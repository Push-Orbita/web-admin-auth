import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableContrato = ({ data, isFetching, handleDelete }: Props) => {
    const formatDate = (value: Date) => {
        return value.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    const dateBodyTemplate = (data: any) => {
        return formatDate(new Date(data.fechaVencimiento));
    };
    const columns: ICustomColumnItem[] = [
        { field: 'organizacion.nombre', header: 'Organización', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Organización', dataType: 'text' },
        { field: 'plan.nombre', header: 'Plan', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Plan', dataType: 'text' },
        { field: 'fechaVencimiento', header: 'Fecha De vencimiento', sortable: true, filter: true, filterField: "date", body: dateBodyTemplate, filterPlaceholder: 'Buscar Por Fecha', dataType: 'date' },
    ];

    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Contract.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
        </>
    );
};