import { InputText } from 'primereact/inputtext';
interface Props {
    tableTitle?: string,
    globalFilterFields?: string[],
    filterFields?: string[];
    onGlobalFilterChange?:any
    globalFilterValue:any
}
export const BasicTableHeader = ({tableTitle,globalFilterFields,globalFilterValue,onGlobalFilterChange}:Props) => {
    
    return (
        <>

            <div className="flex-1">
                <div className='flex justify-content-between align-items-center'>
                    <span className="text-xl">
                        {tableTitle}
                    </span>
                    {
                        globalFilterFields && globalFilterFields.length > 0 ? (
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Búsqueda palabra clave" />
                            </span>
                        ) : ('')
                    }

                </div>
            </div>
        </>
    );
}
