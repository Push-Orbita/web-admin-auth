import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { RolApi } from "./service/rol.service";
import { TableRol } from "./components/table/TableRol";
import FormRol from "./components/form/FormRol";
import { useEffect } from "react";


const RolView = () => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "Rol",
        RolApi.getRolSearch
    );

    useEffect(() => {
        resetModuleState();
    }, []);

    const deleteRol = UseQueryMutation({
        requestFn: RolApi.deleteRol,
        options: {
            onError() {
                toast.error(t(lang.Rol.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Rol.messages.deletedSuccess));
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
                await deleteRol.mutateAsync({ id });
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
                    {t(lang.Rol.title)}
                </div>
                {
                    visible ? (
                        <>
                            <FormRol
                                title={rowData ? `${t(lang.Rol.edit)}` : `${t(lang.Rol.new)}`} refetch={refetch}
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
                                <TableRol
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

export default RolView;