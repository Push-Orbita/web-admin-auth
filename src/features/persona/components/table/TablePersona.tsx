import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { useState } from "react";
import { lang } from "../../../../langs";
import UserModal from "../modal/UserModal";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TablePersona = ({ data, isFetching, handleDelete }: Props) => {

    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (userData: any) => {
        setSelectedUser(userData);
        setIsOpen(true);
    };

    const userTemplate = (rowData: any) => {
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

    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Nombre', dataType: 'text' },
        { field: 'apellido', header: 'Apellido', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Apellido', dataType: 'text' },
        { field: 'cuil', header: 'Cuil', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Cuil', dataType: 'text' },
        { field: 'genero', header: 'Genero', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Genero', dataType: 'text' },
        { field: 'usuarios', header: 'Usuarios', body: userTemplate, sortable: false },
    ];


    return (
        <>

            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Person.list)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
            <UserModal isOpen={isOpen} setIsOpen={setIsOpen} selectedUser={selectedUser} />
        </>

    );
};