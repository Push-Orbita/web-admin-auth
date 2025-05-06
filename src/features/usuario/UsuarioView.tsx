import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { fieldValidations } from "./components/form/fieldValidations/field.validations";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

interface Permiso {
    id: number;
    sistema: {
        id: number;
        nombre: string;
        descripcion: string;
        url: string;
        icono: string;
    };
    organizacion: {
        id: number;
        nombre: string;
    };
    rol: {
        id: number;
        nombre: string;
        descripcion: string;
    };
}

interface UsuarioData {
    id: number;
    nombre: string;
    email: string;
    persona: {
        id: number;
        nombre: string;
        apellido: string;
    };
    permiso: Permiso[];
}

const UsuarioView = () => {
    const [selectedUsuario, setSelectedUsuario] = useState<UsuarioData | null>(null);
    const [showModal, setShowModal] = useState(false);

    const formFields: FieldConfig[] = [
        { name: "nombre", type: "text", gridSize: "medium", label: "Nombre" },
        { name: "email", type: "text", gridSize: "medium", label: "Email" },
        { name: "password", type: "password", gridSize: "medium", label: "Contraseña" },
        { name: "repeatPassword", type: "password", gridSize: "medium", label: "Repetir Contraseña" },
        { name: "persona", type: "select", selectKey: "persona", gridSize: "medium", label: "Persona" }
    ];

    const columns: ICustomColumnItem[] = [
        { field: "nombre", header: "Nombre", sortable: true, filter: true },
        { field: "email", header: "Email", sortable: true, filter: true },
        {
            field: "persona",
            header: "Persona",
            sortable: true,
            filter: true,
            body: (rowData: any) => <span>{`${rowData.persona?.nombre || ''} ${rowData.persona?.apellido || ''}`}</span>
        },
        {
            field: "acciones",
            header: "Acciones",
            body: (rowData: UsuarioData) => (
                <Button
                    icon="pi pi-eye"
                    className="p-button-rounded p-button-text"
                    onClick={() => {
                        setSelectedUsuario(rowData);
                        setShowModal(true);
                    }}
                />
            )
        }
    ];

    const renderModalContent = () => {
        if (!selectedUsuario) return null;

        return (
            <div className="p-4">
                <h3>Sistemas y Roles</h3>
                <div className="mt-4">
                    {selectedUsuario.permiso.map((permiso) => (
                        <div key={permiso.id} className="mb-4 p-3 border-1 border-round">
                            <h4 className="mb-2">{permiso.sistema.nombre}</h4>
                            <p className="mb-2"><strong>Organización:</strong> {permiso.organizacion.nombre}</p>
                            <p className="mb-2"><strong>Rol:</strong> {permiso.rol.nombre}</p>
                            <p><strong>Descripción del Rol:</strong> {permiso.rol.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <DynamicCrudPage
                moduleKey="usuario"
                formFields={formFields}
                columns={columns}
                validationSchema={fieldValidations}
            />
            <Dialog
                visible={showModal}
                onHide={() => setShowModal(false)}
                header="Detalles del Usuario"
                style={{ width: '50vw' }}
                modal
            >
                {renderModalContent()}
            </Dialog>
        </>
    );
};

export default UsuarioView; 