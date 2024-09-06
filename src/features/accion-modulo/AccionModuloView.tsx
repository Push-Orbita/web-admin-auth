import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";

import { TableAccionModulo } from "./components/table/TableAccionModulo";
import FormAccionModulo from "./components/form/FormAccionModulo";
import { useEffect } from "react";
import { AccionModuloApi } from "./service/accionModulo.service";


const AccionModuloView = () => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "AccionModulo",
        AccionModuloApi.getAccionModuloSearch
    );

    useEffect(() => {
        resetModuleState();
    }, []);

    const deleteAccionModulo = UseQueryMutation({
        requestFn: AccionModuloApi.deleteAccionModulo,
        options: {
            onError() {
                toast.error(t(lang.ActionModule.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.ActionModule.messages.deletedSuccess));
            },
        },
    });

    const handleDelete = (id: number) => {
        confirmDialog({
            message: t(lang.common.labels.deleteMessage),
            header: t(lang.common.labels.deleteMessageTitle),
            icon: 'pi pi-exclamation-triangle text-yellow-500',
            acceptClassName: 'p-button-danger',
            acceptLabel: t(lang.common.actions.confirm),
            rejectLabel: t(lang.common.actions.cancel),
            accept: async () => {
                await deleteAccionModulo.mutateAsync({ id });
            },
            reject: () => {
                // Maneja la cancelación si es necesario
            },
        });
    };


    return (
        <DashboardLayout>
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.ActionModule.title)}
            </div>
            <div className="card">
                {
                    visible ? (
                        <>
                            <FormAccionModulo
                                title={rowData ? `${t(lang.ActionModule.edit)}` : `${t(lang.ActionModule.new)}`} refetch={refetch}
                            />
                        </>
                    )
                        : (
                            <div>
                                <div className="grid">
                                    <div className="col-12">
                                        {startToolbarTemplate()}
                                    </div>
                                </div>
                                <TableAccionModulo
                                    data={data ?? []}
                                    isFetching={isFetching}
                                    handleDelete={handleDelete}
                                />
                            </div>
                        )
                }
            </div>
        </DashboardLayout>
    );
};

export default AccionModuloView;