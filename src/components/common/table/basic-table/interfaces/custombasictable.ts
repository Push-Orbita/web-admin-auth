export interface ICustomColumnItem {
    field?: string,
    header: string,
    sortable?: boolean,
    filter?: boolean,
    filterPlaceholder?: string,
    dataType?: 'text' | 'date' | 'number',
    body?: (rowData: any) => JSX.Element;
    style?: React.CSSProperties;
    [x: string]: string | undefined | any;
}