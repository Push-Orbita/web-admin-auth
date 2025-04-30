import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { fieldValidations } from "./components/form/fieldValidations/field.validations";
import { Panel } from 'primereact/panel';
import { Tag } from 'primereact/tag';
import { Plan } from './model/entity/plan.entity';

const PlanView = () => {
    const formFields: FieldConfig[] = [
        {
            name: "nombre",
            type: "text",
            gridSize: "medium",
            placeholder: "Nombre del plan",
        },
        {
            name: "descripcion",
            type: "text",
            gridSize: "medium",
            placeholder: "Descripción del plan",
        },
        {
            name: "duracion",
            type: "number",
            gridSize: "medium",
            placeholder: "Duración en días",
        },
        {
            name: "precio",
            type: "number",
            gridSize: "medium",
            placeholder: "Precio del plan",
        },
        {
            name: "suscripcion",
            type: "select",
            gridSize: "medium",
            selectKey: "suscripcion",
            optionLabel: "nombre",
            placeholder: "Seleccione la suscripción",
        },
        {
            name: "modulosPorPlan",
            type: "multiselect",
            gridSize: "full",
            selectKey: "modulo",
            optionLabel: "nombre",
            placeholder: "Seleccione los módulos",
        }
    ];

    const columns: ICustomColumnItem[] = [
        {
            field: "nombre",
            header: "Nombre",
            sortable: true,
            filter: true,
        },
        {
            field: "descripcion",
            header: "Descripción",
            sortable: true,
            filter: true,
        },
        {
            field: "duracion",
            header: "Duración",
            sortable: true,
            filter: true,
            body: (rowData: any) => `${rowData.duracion} días`
        },
        {
            field: "precio",
            header: "Precio",
            sortable: true,
            filter: true,
            body: (rowData: any) => `$${rowData.precio}`
        },
        {
            field: "suscripcion",
            header: "Suscripción",
            sortable: true,
            filter: true,
            body: (rowData: any) => rowData.suscripcion?.nombre || ''
        }
    ];

    const rowExpansionTemplate = (data: Plan) => {
        return (
            <div className="p-3">
                <div className="grid">
                    <div className="col-12 md:col-6">
                        <Panel
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-list mr-2 text-xl text-primary"></i>
                                    <span className="text-xl font-bold">Módulos del Plan</span>
                                </div>
                            }
                            className="shadow-1 border-round-xl"
                        >
                            <div className="grid">
                                {data.modulosPorPlan?.length ? (
                                    data.modulosPorPlan.map((moduloPlan, index) => (
                                        <div key={index} className="col-12 mb-3">
                                            <div className="surface-100 p-3 border-round-lg">
                                                <div className="flex align-items-center mb-2">
                                                    <i className={`${moduloPlan.modulo.icon} mr-2 text-primary`}></i>
                                                    <span className="text-lg font-medium">{moduloPlan.modulo.nombre}</span>
                                                </div>
                                                <p className="text-sm text-500 m-0">{moduloPlan.modulo.descripcion}</p>
                                                {moduloPlan.modulo.accionesPorModulo && (
                                                    <div className="mt-2">
                                                        <div className="flex flex-wrap gap-2">
                                                            {moduloPlan.modulo.accionesPorModulo.accion && (
                                                                <Tag
                                                                    value={moduloPlan.modulo.accionesPorModulo.accion.nombre}
                                                                    severity="info"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12">
                                        <div className="surface-100 p-3 border-round-lg">
                                            <p className="text-sm text-500 m-0">No hay módulos asignados a este plan</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Panel>
                    </div>
                    <div className="col-12 md:col-6">
                        <Panel
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-calendar mr-2 text-xl text-primary"></i>
                                    <span className="text-xl font-bold">Contratos Activos</span>
                                </div>
                            }
                            className="shadow-1 border-round-xl"
                        >
                            <div className="grid">
                                {data.contratos?.length ? (
                                    data.contratos.map((contrato, index) => (
                                        <div key={index} className="col-12 mb-3">
                                            <div className="surface-100 p-3 border-round-lg">
                                                <div className="flex align-items-center mb-2">
                                                    <i className="pi pi-building mr-2 text-primary"></i>
                                                    <span className="text-lg font-medium">{contrato.organizacion.nombre}</span>
                                                </div>
                                                <div className="flex align-items-center">
                                                    <i className="pi pi-clock mr-2 text-primary"></i>
                                                    <span className="text-sm">
                                                        Vence: {new Date(contrato.fechaVencimiento).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12">
                                        <div className="surface-100 p-3 border-round-lg">
                                            <p className="text-sm text-500 m-0">No hay contratos activos para este plan</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <DynamicCrudPage
            moduleKey="plan"
            formFields={formFields}
            columns={columns}
            validationSchema={fieldValidations}
            rowExpansionTemplate={rowExpansionTemplate}
            showExpandButtons={true}
        />
    );
};

export default PlanView; 