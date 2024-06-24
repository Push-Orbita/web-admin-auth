import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../common/components/modal/CustomBasicModal";
import { useModuleContext } from "../../hooks/useModules";
import useQueryApi from "../../hooks/useQueryApi";
import UseQueryMutation from "../../hooks/useQueryMutation";
import { lang } from "../../langs";
import { DashboardLayout } from "../../layout/DashboardLayout";
import { OrganizacionApi } from "../../services/organizacion/organizacion.service";
import FormOrganizacion from "./components/FormOrganizacion";
import { TableOrganizacion } from "./components/TableOrganizacion";

const Organizacion = () => {
    // Obtener el contexto del módulo
    const { rowData, startToolbarTemplate, visible } = useModuleContext();

    // Obtener datos y estado de carga de la API
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "Organizacion",
        OrganizacionApi.getOrganizcionSearch
    );

    // Configurar la mutación para eliminar una organización
    const deleteOrganizacion = UseQueryMutation({
        requestFn: OrganizacionApi.deleteOrganizcion,
        options: {
            // Manejar error en la eliminación
            onError() {
                toast.error(t(lang.Organization.messages.deletedError));
            },
            // Manejar éxito en la eliminación
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Organization.messages.deletedSuccess));
            },
        },
    });

    // Manejar la eliminación de la organización
    const handleDelete = (id: number) => {
        // Mostrar diálogo de confirmación
        confirmDialog({
            message: t(lang.common.labels.deleteMessage),
            header: t(lang.common.labels.deleteMessageTitle),
            icon: 'pi pi-exclamation-triangle text-yellow-500',
            acceptClassName: 'p-button-danger',
            acceptLabel: t(lang.common.actions.confirm),
            rejectLabel: t(lang.common.actions.cancel),
            // Acción a realizar en caso de confirmación
            accept: async () => {
                await deleteOrganizacion.mutateAsync({ id });
            },
            // Acción a realizar en caso de rechazo
            reject: () => {
                // Maneja la cancelación si es necesario
            },
        });
    };

    return (
        <DashboardLayout>
            {/* Título de la sección */}
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.Organization.title)}
            </div>
            <div className="card">
                <div className="grid">
                    {/* Barra de herramientas */}
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                {/* Tabla de organizaciones */}
                <div>
                    <TableOrganizacion
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            {/* Modal para editar o crear organización */}
            <CustomBasicModal title={rowData ? `${t(lang.Organization.edit)}` : `${t(lang.Organization.new)}`}>
                {visible && (<FormOrganizacion refetch={refetch} />)}
            </CustomBasicModal>
        </DashboardLayout>
    );
};

export default Organizacion;
