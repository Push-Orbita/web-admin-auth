import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { PlanApi } from "./service/plan.service";
import { TablePlan } from "./components/table/TablePlan";
import FormPlan from "./components/form/FormPlan";
import { useEffect } from "react";


const PlanView = () => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "Plan",
        PlanApi.getPlanSearch
    );

    useEffect(() => {
        resetModuleState();
    }, []);

    const deletePlan = UseQueryMutation({
        requestFn: PlanApi.deletePlan,
        options: {
            onError() {
                toast.error(t(lang.Plan.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Plan.messages.deletedSuccess));
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
                await deletePlan.mutateAsync({ id });
            },
            reject: () => {
                // Maneja la cancelación si es necesario
            },
        });
    };


    return (
        <DashboardLayout>
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.Plan.title)}
            </div>
            <div className="card">
                {
                    visible ? (
                        <>
                            <FormPlan
                                title={rowData ? `${t(lang.Plan.edit)}` : `${t(lang.Plan.new)}`} refetch={refetch}
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
                                <TablePlan
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

export default PlanView;