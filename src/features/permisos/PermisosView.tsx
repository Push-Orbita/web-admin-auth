import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { fieldValidations } from "./components/form/fieldValidations/field.validations";
import { PermisosEntity } from "./model/entity/permisos.entity";
import { useMemo } from 'react';

interface UsuarioPermisos {
    id: number;
    nombre: string;
    email: string;
    permisos: PermisosEntity[];
}

const PermisosView = () => {
    const formFields: FieldConfig[] = [
        {
            name: "usuario",
            type: "select",
            gridSize: "medium",
            selectKey: "usuario",
        },
        {
            name: "sistema",
            type: "select",
            gridSize: "medium",
            selectKey: "sistema",
        },
        {
            name: "organizacion",
            type: "select",
            gridSize: "medium",
            selectKey: "organizacion",
        },
        {
            name: "rol",
            type: "select",
            gridSize: "medium",
            selectKey: "rol",
        }
    ];

    const columns: ICustomColumnItem[] = [
        {
            field: "usuario.nombre",
            header: "Usuario",
            sortable: true,
            filter: true,
        },
        {
            field: "usuario.email",
            header: "Email",
            sortable: true,
            filter: true,
        },
        {
            field: "sistema.nombre",
            header: "Sistema",
            sortable: true,
            filter: true,
        }
    ];

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="p-3">
                <Card className="shadow-2">
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-building mr-2 text-xl text-primary"></i>
                                <h3 className="m-0 text-xl">Organización</h3>
                            </div>
                            <div className="surface-100 p-3 border-round">
                                <p className="text-lg font-medium m-0">{data.organizacion.nombre}</p>
                            </div>
                        </div>
                        <div className="col-12 md:col-6">
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-users mr-2 text-xl text-primary"></i>
                                <h3 className="m-0 text-xl">Rol</h3>
                            </div>
                            <div className="surface-100 p-3 border-round">
                                <p className="text-lg font-medium m-0">{data.rol.nombre}</p>
                                <p className="text-sm text-500 mt-2 m-0">{data.rol.descripcion}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    };

    return (
        <DynamicCrudPage
            moduleKey="permisos"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
            rowExpansionTemplate={rowExpansionTemplate}
            showExpandButtons={true}
        />
    );
};

export default PermisosView; 