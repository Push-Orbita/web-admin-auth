import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { ModuloApi } from "./service/modulo.service";
import { TableModulo } from "./components/table/TableModulo";
import FormModulo from "./components/form/FormModulo";
import { useEffect } from "react";


const ModuloView = () => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "Modulo",
        ModuloApi.getModuloSearch
    );

    useEffect(() => {
        resetModuleState();
    }, []);

    const deleteModulo = UseQueryMutation({
        requestFn: ModuloApi.deleteModulo,
        options: {
            onError() {
                toast.error(t(lang.Module.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Module.messages.deletedSuccess));
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
                await deleteModulo.mutateAsync({ id });
            },
            reject: () => {
            },
        });
    };


    return (
        <DashboardLayout>
            <div className="card">
                <div className='text-3xl mt-2 mb-2'>
                    {t(lang.Module.title)}
                </div>
                {
                    visible ? (
                        <>
                            <FormModulo
                                title={rowData ? `${t(lang.Module.edit)}` : `${t(lang.Module.new)}`} refetch={refetch}
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
                                <TableModulo
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

export default ModuloView;