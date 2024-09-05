import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";
import { useState } from "react";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import PersonaModal from "../modal/PersonaModal";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}

export const TableUsuario = ({ data, isFetching, handleDelete }: Props) => {
    const [selectedPerson, setSelectedPerson] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (userData: any) => {
        setSelectedPerson(userData);
        setIsOpen(true);
    };

    const personTemplate = (rowData: any) => {
        const personExists = rowData.persona && typeof rowData.persona === 'object';
        return (
            <Button
                rounded
                className="p-button-rounded p-button-text"
                onClick={() => openModal(
                    {
                        persona: `${rowData.persona.nombre} ${rowData.persona.apellido}`,
                        cuil: rowData.persona.cuil,
                    }
                )}
                disabled={!personExists}
            >
                <i className="pi pi-user p-overlay-badge" style={{ fontSize: '1.5rem' }}>
                    <Badge severity="info" value={personExists ? 1 : 0} />
                </i>
            </Button>
        );
    };

    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Usuario', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Usuario', dataType: 'text' },
        { field: 'email', header: 'Email', sortable: true, filter: true, filterPlaceholder: 'Buscar Por Email', dataType: 'text' },
        { field: 'persona', header: 'Persona', body: personTemplate, sortable: false },
    ];

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
            <PersonaModal isOpen={isOpen} setIsOpen={setIsOpen} selectedPerson={selectedPerson} />
        </>
    );
};
