import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { PermisosApi } from "./service/permisos.service";
import { TablePermisos } from "./components/table/TablePermisos";

import { useEffect } from "react";
import FormPermisos from "./components/form/FormFeat";


const PermisosView = () => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "Permisos",
        PermisosApi.getPermisosSearch
    );

    useEffect(() => {
        resetModuleState();
    }, []);

    const deletePermisos = UseQueryMutation({
        requestFn: PermisosApi.deletePermisos,
        options: {
            onError() {
                toast.error(t(lang.Permissions.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Permissions.messages.deletedSuccess));
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
                await deletePermisos.mutateAsync({ id });
            },
            reject: () => {
                // Maneja la cancelación si es necesario
            },
        });
    };


    return (
        <DashboardLayout>
            <div className="card">
                <div className='text-3xl mt-2 mb-2'>
                    {t(lang.Permissions.title)}
                </div>
                {
                    visible ? (
                        <>
                            <FormPermisos
                                title={rowData ? `${t(lang.Permissions.edit)}` : `${t(lang.Permissions.new)}`} refetch={refetch}
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
                                <TablePermisos
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

export default PermisosView;