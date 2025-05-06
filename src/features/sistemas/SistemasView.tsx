import { fieldValidations } from "./components/form/fieldValidations/field.validations";
import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { TYPEBDOptions } from "@config/constants/typeBD";
import { useState } from "react";
import { Button } from "primereact/button";
import { PrivateDataModal } from "./components/PrivateDataModal";
import { usePermisos } from "@hooks/usePermisos";

const SistemasView = () => {
    const [selectedSistemaId, setSelectedSistemaId] = useState<number | null>(null);
    const [showPrivateDataModal, setShowPrivateDataModal] = useState(false);
    const { puedeVerCredenciales } = usePermisos();

    const handleShowPrivateData = (sistemaId: number) => {
        setSelectedSistemaId(sistemaId);
        setShowPrivateDataModal(true);
    };

    const formFields: FieldConfig[] = [
        { name: "nombre", type: "text", gridSize: "medium" },
        { name: "descripcion", type: "text", gridSize: "medium" },
        { name: "url", type: "text", gridSize: "medium" },
        { name: "icono", type: "icon-select", gridSize: "medium" },
        {
            name: "credenciales",
            label: "Credenciales de Acceso",
            type: "group",
            toggleable: true,
            fields: [
                {
                    name: "host",
                    type: "text",
                    gridSize: "medium",
                    hidden: (rowData: any) => Boolean(rowData)
                },
                {
                    name: "port",
                    type: "number",
                    gridSize: "medium",
                    hidden: (rowData: any) => Boolean(rowData)
                },
                {
                    name: "usuario",
                    type: "text",
                    gridSize: "medium",
                    hidden: (rowData: any) => Boolean(rowData)
                },
                {
                    name: "password",
                    type: "password",
                    gridSize: "medium",
                    hidden: (rowData: any) => Boolean(rowData)
                },
                {
                    name: "tipobd",
                    type: "select",
                    gridSize: "medium",
                    options: TYPEBDOptions,
                    defaultValue: 'mysql',
                    hidden: (rowData: any) => Boolean(rowData)
                }
            ]
        },
    ];

    const columns: ICustomColumnItem[] = [
        { field: "nombre", header: "Nombre", sortable: true, filter: true, filterPlaceholder: "Buscar por titulo", dataType: "text" },
        { field: "descripcion", header: "Descripción", sortable: true, filter: true, filterPlaceholder: "Buscar por descripción", dataType: "text" },
        { field: "url", header: "URL", sortable: true, filter: true, filterPlaceholder: "Buscar por URL", dataType: "text" },
        { field: "icono", header: "Icono", sortable: true, filter: true, filterPlaceholder: "Buscar por icono", dataType: "text" },
        ...(puedeVerCredenciales ? [
            {
                field: "verCredenciales",
                header: "Ver datos privados",
                body: (rowData: any) => (
                    <Button
                        icon="pi pi-eye"
                        className="p-button-rounded p-button-text"
                        onClick={() => handleShowPrivateData(rowData.id)}
                        tooltip="Ver datos privados"
                    />
                )
            }
        ] : [])
    ];

    return (
        <>
            <DynamicCrudPage
                moduleKey="sistemas"
                formFields={formFields}
                columns={columns}
                validationSchema={fieldValidations}
            />
            {selectedSistemaId && (
                <PrivateDataModal
                    visible={showPrivateDataModal}
                    onHide={() => {
                        setShowPrivateDataModal(false);
                        setSelectedSistemaId(null);
                    }}
                    sistemaId={selectedSistemaId}
                />
            )}
        </>
    );
};

export default SistemasView;