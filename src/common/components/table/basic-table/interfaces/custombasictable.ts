export interface ICustomColumnItem {
    field: string,
    header: string,
    sortable?: boolean,
    filter?: boolean,
    filterPlaceholder?: string,
    dataType?: 'text' | 'date' | 'number'
}