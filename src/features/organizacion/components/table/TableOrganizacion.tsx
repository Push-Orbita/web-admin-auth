import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";
import { Button } from "primereact/button";
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}

export const TableOrganizacion = ({ data, isFetching, handleDelete }: Props) => {
    const [visible, setVisible] = useState(false);
    const [selectedCredenciales, setSelectedCredenciales] = useState<any>(null);

    const bodyTemplate = (rowData: any) => {
        return (
            <div>
                <Tooltip target=".ver-credenciales" />
                <Button
                    icon="pi pi-eye"
                    className="p-button-rounded p-button-text ver-credenciales"
                    data-pr-tooltip="Ver Credenciales"
                    onClick={() => {
                        setSelectedCredenciales(rowData);
                        setVisible(true);
                    }}
                />
            </div>
        );
    };

    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'nombre', header: 'Nombre', body: bodyTemplate, sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
    ];

    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Organizacion.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />

            <Dialog
                header="Credenciales"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                {selectedCredenciales && (
                    <div>
                        {/* Aquí puedes mostrar la información de las credenciales */}
                        <p>Información de las credenciales para: {selectedCredenciales.nombre}</p>
                    </div>
                )}
            </Dialog>
        </>
    );
};