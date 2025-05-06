import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { Panel } from 'primereact/panel';
import { fieldValidations } from "./components/form/fieldValidations/field.validations";

interface UsuarioPermisos {
    id: number;
    nombre: string;
    email: string;
    permisos: {
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
    }[];
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
            field: "nombre",
            header: "Usuario",
            sortable: true,
            filter: true,
        },
        {
            field: "email",
            header: "Email",
            sortable: true,
            filter: true,
        }
    ];

    const getColumnClass = (totalItems: number) => {
        if (totalItems === 1) return 'col-12';
        if (totalItems === 2) return 'col-12 md:col-6';
        return 'col-12 md:col-6 lg:col-4';
    };

    const rowExpansionTemplate = (data: UsuarioPermisos) => {
        return (
            <div className="p-3">
                <div className="grid">
                    {data.permisos.map((permiso, index) => (
                        <div key={index} className={`${getColumnClass(data.permisos.length)} mb-3`}>
                            <Panel
                                header={
                                    <div className="flex align-items-center">
                                        <i className={`${permiso.sistema.icono} mr-2 text-xl text-primary`}></i>
                                        <span className="text-xl font-bold">{permiso.sistema.nombre}</span>
                                    </div>
                                }
                                className="shadow-1 border-round-xl h-full"
                                toggleable
                            >
                                <div className="grid">
                                    <div className="col-12 mb-3">
                                        <div className="flex align-items-center mb-2">
                                            <i className="pi pi-building mr-2 text-primary"></i>
                                            <span className="font-medium text-lg">Organización</span>
                                        </div>
                                        <div className="surface-100 p-3 border-round-lg">
                                            <span className="text-lg font-medium">{permiso.organizacion.nombre}</span>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="flex align-items-center mb-2">
                                            <i className="pi pi-users mr-2 text-primary"></i>
                                            <span className="font-medium text-lg">Rol</span>
                                        </div>
                                        <div className="surface-100 p-3 border-round-lg">
                                            <div className="flex flex-column">
                                                <span className="text-lg font-medium mb-2">{permiso.rol.nombre}</span>
                                                <span className="text-sm text-500">{permiso.rol.descripcion}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    ))}
                </div>
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