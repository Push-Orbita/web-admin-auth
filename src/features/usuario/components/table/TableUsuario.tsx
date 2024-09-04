import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";
import { useState } from "react";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableUsuario = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Usuario', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Usuario', dataType: 'text' },
        { field: 'email', header: 'Email', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Email', dataType: 'text' },
    ];

    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (userData: any) => {
        setSelectedUser(userData);
        setIsOpen(true);
    };

    const personTemplate = (rowData: any) => {
        const userCount = rowData.usuarios ? rowData.usuarios.length : 0;
        return (
            <Button
                rounded
                className="p-button-rounded p-button-text"
                onClick={() => openModal(
                    {
                        persona: rowData.nombre + ' ' + rowData.apellido,
                        usuario: rowData.usuarios
                    }
                )}
                disabled={userCount === 0}
            >
                <i className="pi pi-users p-overlay-badge" style={{ fontSize: '1.5rem' }}>
                    <Badge severity="info" value={userCount} />
                </i>
            </Button>
        );
    };

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