import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { ContratoApi } from "./service/contrato.service";
import { TableContrato } from "./components/table/TableContrato";
import FormContrato from "./components/form/FormContrato";
import { useEffect } from "react";


const ContratoView = () => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "Contrato",
        ContratoApi.getContratoSearch
    );

    useEffect(() => {
        resetModuleState();
    }, []);

    const deleteContrato = UseQueryMutation({
        requestFn: ContratoApi.deleteContrato,
        options: {
            onError() {
                toast.error(t(lang.Contract.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Contract.messages.deletedSuccess));
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
                await deleteContrato.mutateAsync({ id });
            },
            reject: () => {
                // Maneja la cancelación si es necesario
            },
        });
    };


    return (
        <DashboardLayout>
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.Contract.title)}
            </div>
            <div className="card">
                {
                    visible ? (
                        <>
                            <FormContrato
                                title={rowData ? `${t(lang.Contract.edit)}` : `${t(lang.Contract.new)}`} refetch={refetch}
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
                                <TableContrato
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

export default ContratoView;