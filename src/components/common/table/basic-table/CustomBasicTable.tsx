import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { useState } from 'react';
import { useModuleContext } from '../../../../hooks/useModules';
import { usePermisos } from '../../../../hooks/usePermisos';
import { BasicTableHeader } from './components/BasicTableHeader';
import { ICustomColumnItem } from './interfaces/custombasictable';

interface Props {
    filterDisplay?: "row" | "menu",
    rows?: number,
    rowsPerPageOptions?: number[],
    tableTitle?: string,
    globalFilterFields?: string[],
    filterFields?: string[];
    scrollable?: boolean;
    data: any,
    loading: boolean;
    columns: ICustomColumnItem[],
    handleDelete: any;
}

export default function CustomBasicTable({
    filterDisplay = "row",
    rows = 5,
    rowsPerPageOptions = [5, 10, 25, 50],
    tableTitle = '',
    scrollable = true,
    loading,
    data,
    columns = [],
    handleDelete
}: Props) {
    const { setVisible, setRowData } = useModuleContext();
    const permisos = usePermisos();
    const globalFilterFields = columns.map(column => column.field);
    const filterFields = columns.map(column => column.field);
    const initialFilters = (): DataTableFilterMeta => {
        const fields = filterFields.reduce((acc, field) => {
            acc[field] = { value: null, matchMode: FilterMatchMode.CONTAINS };
            return acc;
        }, {} as DataTableFilterMeta);
        fields.global = { value: null, matchMode: FilterMatchMode.CONTAINS };
        return fields;
    };
    const [filters, setFilters] = useState<DataTableFilterMeta>(initialFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const edit = (rowData: any) => {
        setRowData(rowData);
        setVisible(true);
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                {permisos.puedeModificar ? (<Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => edit(rowData)} />) : ("")}
                {permisos.puedeBorrar ? (<Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleDelete(rowData.id)} />) : ("")}
            </>
        );
    };

    const header = (
        <BasicTableHeader
            filterFields={filterFields}
            globalFilterFields={globalFilterFields}
            onGlobalFilterChange={onGlobalFilterChange}
            tableTitle={tableTitle}
            globalFilterValue={globalFilterValue}
        />
    );

    return (
        <DataTable
            value={data}
            paginator
            rows={rows}
            rowsPerPageOptions={rowsPerPageOptions}
            dataKey="id"
            filters={filters}
            filterDisplay={filterDisplay}
            scrollable={scrollable}
            scrollHeight={scrollable ? '70vh' : ''}
            loading={loading}
            header={header}
            globalFilterFields={globalFilterFields}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first}-{last} de un total de {totalRecords} registros"
            emptyMessage="No se encontraron datos"
        >
            {columns.map((column) => (
                <Column
                    key={column.field}
                    field={column.field}
                    header={column.header}
                    sortable={column.sortable}
                    filter={column.filter}
                    filterPlaceholder={column.filterPlaceholder}
                    style={{ minWidth: '12rem' }}
                    dataType={column.dataType}
                    body={column.body ? column.body : undefined}
                />
            ))}
            <Column header='Acciones' body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
    );
}
