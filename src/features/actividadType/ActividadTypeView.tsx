import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { ActividadTypeApi } from "./service/actividadtype.service";
import FormActividadType from "./components/form/FormActividadType";
import { TableActividadType } from "./components/table/TableActividadType";
import { useEffect } from "react";

const ActividadTypeView = () => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "ActividadType",
        ActividadTypeApi.getActividadTypeSearch
    );
    useEffect(() => {
        resetModuleState()
    }, [])

    const deleteActividadType = UseQueryMutation({
        requestFn: ActividadTypeApi.deleteActividadType,
        options: {
            // Manejar error en la eliminación
            onError() {
                toast.error(t(lang.ActividadType.messages.deletedError));
            },
            // Manejar éxito en la eliminación
            onSuccess: () => {
                refetch();
                toast.success(t(lang.ActividadType.messages.deletedSuccess));
            },
        },
    });

    // Manejar la eliminación de la categoria
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
                await deleteActividadType.mutateAsync({ id });
            },
            // Acción a realizar en caso de rechazo
            reject: () => {
                // Maneja la cancelación si es necesario
            },
        });
    };


    return (
        <DashboardLayout>
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.ActividadType.title)}
            </div>
            <div className="card">

                {
                    visible ? (
                        <>

                            <FormActividadType
                                title={rowData ? `${t(lang.ActividadType.edit)}` : `${t(lang.ActividadType.new)}`}
                                refetch={refetch} />
                        </>
                    )
                        :
                        (<div>
                            <div className="grid">
                                <div className="col-12">
                                    {startToolbarTemplate()}
                                </div>
                            </div>
                            <TableActividadType
                                data={data ?? []}
                                isFetching={isFetching}
                                handleDelete={handleDelete}
                            />
                        </div>)
                }

            </div>
            {/* <CustomBasicModal width="large" title={rowData ? `${t(lang.ActividadType.edit)}` : `${t(lang.ActividadType.new)}`}>
                {visible && (<FormActividadType />)}
            </CustomBasicModal> */}
        </DashboardLayout>
    );
};

export default ActividadTypeView;