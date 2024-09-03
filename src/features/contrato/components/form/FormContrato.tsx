import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { ContratoApi } from "@features/contrato/service/contrato.service";
import { ContratoPatchDTO, ContratoPostDTO } from "@features/contrato/model/dtos/contrato.dto";
import FormFields from "./FormFields";
// import { fieldValidations } from "./fieldValidations/field.validations";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormContrato: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postContrato = UseQueryMutation({
        requestFn: ContratoApi.postContrato,
        options: {
            onError: () => {
                toast.error(t(lang.Contract.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Contract.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchContrato = UseQueryMutation({
        requestFn: ContratoApi.patchContrato,
        options: {
            onError: () => {
                toast.error(t(lang.Contract.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Contract.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });
    const onSave = useCallback(
        async (values: ContratoPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: ContratoPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };

                    await patchContrato.mutateAsync(req);
                } else {

                    await postContrato.mutateAsync(values);

                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchContrato, postContrato]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);
    const initialValues: ContratoPostDTO = {
        fechaVencimiento: rowData?.fechaVencimiento ? new Date(rowData.fechaVencimiento) : '',
        organizacion: rowData?.organizacion.id ?? "",
        plan: rowData?.plan.id ?? ""
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
                // validationSchema={fieldValidations}
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

export default FormContrato;