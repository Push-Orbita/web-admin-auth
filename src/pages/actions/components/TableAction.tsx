import CustomBasicTable from "../../../common/components/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "../../../common/components/table/basic-table/interfaces/custombasictable";

interface Props {
    data: any;
    isFetching: boolean;
}
export const TableAction = ({ data, isFetching }: Props) => {

    // const [loading, setLoading] = useState<boolean>(true);


    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Nombre', dataType: 'text' },
        { field: 'descripcion', header: 'Descripcion', sortable: true, filter: true, filterPlaceholder: 'Buscar Por compania', dataType: 'text' },

    ]
    console.log('datatable', data)
    return (
        <>
            <CustomBasicTable
                data={data}
                loading={isFetching}
                columns={columns}
                tableTitle='Acciones'
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}

            />
        </>
    )
}
