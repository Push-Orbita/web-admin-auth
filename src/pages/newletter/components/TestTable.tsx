import { useEffect, useState } from 'react';
import CustomBasicTable from "../../../common/components/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from '../../../common/components/table/basic-table/interfaces/custombasictable';
import { CustomerService } from "../service/CustomerService.";
import { Customer } from '../interfaces/Inewletter';

export const TestTable = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setTimeout(() => {
            CustomerService.getCustomersMedium().then((data: any) => {
                setCustomers(getCustomers(data));
                setLoading(false);
            });
        }, 2000);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const getCustomers = (data: Customer[]) => {

        return [...(data || [])].map((d) => {
            // @ts-ignore
            d.date = new Date(d.date);

            return d;
        });
    };

    const columns: ICustomColumnItem[] = [
        { field: 'name', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Nombre', dataType: 'text' },
        { field: 'company', header: 'Compania', sortable: true, filter: true, filterPlaceholder: 'Buscar Por compania', dataType: 'text' }
    ]
    console.log(columns)
    return (
        <>
            <CustomBasicTable
                data={customers}
                loading={loading}
                filterDisplay={'row'}
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                tableTitle='Post NewsLetter'
                scrollable={true}
                columns={columns}
            />
        </>
    )
}
