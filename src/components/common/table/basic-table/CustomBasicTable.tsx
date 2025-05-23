import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableExpandedRows, DataTableFilterMeta, DataTableRowEvent } from 'primereact/datatable';
import { useState } from 'react';
import { useModuleContext } from '../../../../hooks/useModules';
import { usePermisos } from '../../../../hooks/usePermisos';
import { BasicTableHeader } from './components/BasicTableHeader';
import { ICustomColumnItem } from './interfaces/custombasictable';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';

interface Props {
    filterDisplay?: "row" | "menu";
    rows?: number;
    rowsPerPageOptions?: number[];
    tableTitle?: string;
    globalFilterFields?: string[];
    filterFields?: string[];
    scrollable?: boolean;
    data: any;
    loading: boolean;
    columns: ICustomColumnItem[];
    handleDelete: any;
    size?: 'small' | 'normal' | 'large';
    footerColumnGroup?: JSX.Element;
    headerColumnGroup?: JSX.Element;
    rowExpansionTemplate?: (data: any) => React.ReactNode;
    allowExpansion?: (rowData: any) => boolean;
    onRowExpand?: (event: DataTableRowEvent) => void;
    onRowCollapse?: (event: DataTableRowEvent) => void;
    showExpandButtons?: boolean;
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
    size = 'normal',
    handleDelete,
    footerColumnGroup,
    headerColumnGroup,
    rowExpansionTemplate,
    // allowExpansion,
    onRowExpand,
    onRowCollapse,
    showExpandButtons = true,
}: Props) {
    const { setVisible, setRowData } = useModuleContext();
    const permisos = usePermisos();
    const { showGridlines } = useSelector((state: RootState) => state.ui);
    const globalFilterFields = columns.map(column => column.field).filter((field): field is string => field !== undefined);
    const filterFields = columns.map(column => column.field).filter((field): field is string => field !== undefined);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | undefined>(undefined);

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
        const globalFilter = _filters['global'];

        if ('value' in globalFilter) {
            globalFilter.value = value;
        }

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const edit = (rowData: any) => {
        setRowData(rowData);
        setVisible(true);
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                {permisos.puedeModificar ? (
                    <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => edit(rowData)} />
                ) : null}
                {permisos.puedeBorrar ? (
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleDelete(rowData.id)} />
                ) : null}
            </>
        );
    };

    const handleExpandAll = () => {
        let _expandedRows: DataTableExpandedRows = {};
        data.forEach((item: { id: string | number }) => (_expandedRows[`${item.id}`] = true));
        setExpandedRows(_expandedRows);
    };

    const handleCollapseAll = () => {
        setExpandedRows(undefined);
    };

    const header = (
        <div className="flex flex-wrap justify-content-between align-items-center">
            <BasicTableHeader
                filterFields={filterFields}
                globalFilterFields={globalFilterFields}
                onGlobalFilterChange={onGlobalFilterChange}
                tableTitle={tableTitle}
                globalFilterValue={globalFilterValue}
            />
            {rowExpansionTemplate && showExpandButtons && data && data.length > 0 && (
                <div className="flex gap-2 ml-5">
                    <Button icon="pi pi-plus" label="Expandir Todo" onClick={handleExpandAll} text />
                    <Button icon="pi pi-minus" label="Colapsar Todo" onClick={handleCollapseAll} text />
                </div>
            )}
        </div>
    );

    // Verificar si se debe mostrar la columna de acciones
    const mostrarColumnaAcciones = permisos.puedeModificar || permisos.puedeBorrar;

    return (
        <DataTable
            value={data}
            paginator
            showGridlines={showGridlines}
            rows={rows}
            rowsPerPageOptions={rowsPerPageOptions}
            dataKey="id"
            filters={filters}
            filterDisplay={filterDisplay}
            scrollable={scrollable}
            scrollHeight={scrollable ? '80vh' : ''}
            loading={loading}
            header={header}
            globalFilterFields={globalFilterFields}
            size={size}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first}-{last} de un total de {totalRecords} registros"
            emptyMessage="No se encontraron datos"
            footerColumnGroup={footerColumnGroup}
            headerColumnGroup={headerColumnGroup}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data as DataTableExpandedRows)}
            onRowExpand={onRowExpand}
            onRowCollapse={onRowCollapse}
            rowExpansionTemplate={rowExpansionTemplate}
        >
            {rowExpansionTemplate && showExpandButtons && data && data.length > 0 && (
                <Column expander={true} style={{ width: '5rem' }} />
            )}
            {columns.map((column) => (
                <Column
                    key={column.field}
                    field={column.field}
                    header={column.header}
                    sortable={column.sortable}
                    filter={column.filter}
                    filterPlaceholder={column.filterPlaceholder}
                    style={column.style ? column.style : { minWidth: '12rem' }}
                    className={column.className}
                    dataType={column.dataType}
                    body={column.body ? column.body : undefined}
                />
            ))}
            {mostrarColumnaAcciones && (
                <Column
                    header='Acciones'
                    body={actionBodyTemplate}
                    exportable={false}
                    style={{ minWidth: '12rem' }}
                />
            )}
        </DataTable>
    );
}
