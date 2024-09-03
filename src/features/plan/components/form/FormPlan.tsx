import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { PlanApi } from "@features/plan/service/plan.service";
import { PlanPatchDTO, PlanPostDTO } from "@features/plan/model/dtos/plan.dto";
import FormFields from "./FormFields";
import { fieldValidations } from "./fieldValidations/field.validations";

interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormPlan: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postPlan = UseQueryMutation({
        requestFn: PlanApi.postPlan,
        options: {
            onError: () => {
                toast.error(t(lang.Plan.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Plan.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchPlan = UseQueryMutation({
        requestFn: PlanApi.patchPlan,
        options: {
            onError: () => {
                toast.error(t(lang.Plan.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Plan.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: PlanPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: PlanPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };

                    await patchPlan.mutateAsync(req);
                } else {

                    await postPlan.mutateAsync(values);

                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchPlan, postPlan]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: PlanPostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        duracion: rowData?.duracion ?? "",
        precio: rowData?.precio ?? "",
        suscripcion: rowData?.suscripcion.id ?? "",
    };

    return (
        <>
            <div className="grid mb-5">
                <div className="col-12">
                    <Button icon="pi pi-arrow-left" rounded text onClick={() => { setVisible(false); setRowData(undefined); }} />
                </div>
                <div className="col-12">
                    {
                        rowData ? (
                            <Message severity="warn" text={title} style={{
                                width: '100%',
                                fontSize: '900',
                                height: '3rem'
                            }} />
                        ) : (
                            <Message severity="info" text={title} style={{
                                width: '100%',
                                fontSize: '900',
                                height: '3rem'
                            }} />
                        )
                    }
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={fieldValidations}
                onSubmit={(values, { setSubmitting }) => {
                    onSave(values, setSubmitting);
                }}
            >
                <>
                    <FormFields />
                </>
            </Formik>
        </>
    );
};

export default FormPlan;