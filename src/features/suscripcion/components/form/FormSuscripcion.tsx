import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { SuscripcionApi } from "@features/suscripcion/service/suscripcion.service";
import { SuscripcionPatchDTO, SuscripcionPostDTO } from "@features/suscripcion/model/dtos/suscripcion.dto";
import FormFields from "./FormFields";
import { fieldValidations } from "./fieldValidations/fieldValidations";




interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormSuscripcion: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postSuscripcion = UseQueryMutation({
        requestFn: SuscripcionApi.postSuscripcion,
        options: {
            onError: () => {
                toast.error(t(lang.Suscripcion.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Suscripcion.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchSuscripcion = UseQueryMutation({
        requestFn: SuscripcionApi.patchSuscripcion,
        options: {
            onError: () => {
                toast.error(t(lang.Suscripcion.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Suscripcion.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: SuscripcionPostDTO) => {
            if (rowData) {
                const req: SuscripcionPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchSuscripcion.mutateAsync(req);
            } else {
                await postSuscripcion.mutateAsync(values);
            }
        },
        [rowData, patchSuscripcion, postSuscripcion]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: SuscripcionPostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        sistema: rowData?.sitema ?? ""
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
                    onSave(values);
                    setSubmitting(false);
                }}
            >
                <>
                    <FormFields />
                </>
            </Formik>
        </>
    );
};

export default FormSuscripcion;