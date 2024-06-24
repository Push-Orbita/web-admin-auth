import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../common/components/modal/CustomBasicModal";
import { useModuleContext } from "../../hooks/useModules";
import useQueryApi from "../../hooks/useQueryApi";
import UseQueryMutation from "../../hooks/useQueryMutation";
import { lang } from "../../langs";
import { DashboardLayout } from "../../layout/DashboardLayout";
import { SuscripcionApi } from "../../services/suscripcion/suscripcion.service";
import FormSuscripcion from "./components/FormSuscripcion";
import { TableSuscripcion } from "./components/TableSuscripcion";

const Suscripcion = () => {
    // Obtener el contexto del módulo
    const { rowData, startToolbarTemplate, visible } = useModuleContext();

    // Obtener datos y estado de carga de la API
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "suscripcion",
        SuscripcionApi.getSuscripcionSearch
    );

    // Configurar la mutación para eliminar una suscripción
    const deleteSuscripcion = UseQueryMutation({
        requestFn: SuscripcionApi.deleteSuscripcion,
        options: {
            // Manejar error en la eliminación
            onError() {
                toast.error(t(lang.Suscripcion.messages.deletedError));
            },
            // Manejar éxito en la eliminación
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Suscripcion.messages.deletedSuccess));
            },
        },
    });

    // Manejar la eliminación de la suscripción
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
                await deleteSuscripcion.mutateAsync({ id });
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
                {t(lang.Suscripcion.title)}
            </div>
            <div className="card">
                <div className="grid">
                    {/* Barra de herramientas */}
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                {/* Tabla de suscripciones */}
                <div>
                    <TableSuscripcion
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            {/* Modal para editar o crear suscripción */}
            <CustomBasicModal title={rowData ? `${t(lang.Suscripcion.edit)}` : `${t(lang.Suscripcion.new)}`}>
                {visible && (<FormSuscripcion refetch={refetch} />)}
            </CustomBasicModal>
        </DashboardLayout>
    );
};

export default Suscripcion;
