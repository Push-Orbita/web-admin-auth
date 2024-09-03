import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { AccionApi } from "@features/accion/service/accion.service";
import { AccionPatchDTO, AccionPostDTO } from "@features/accion/model/dtos/accion.dto";
import FormFields from "./FormFields";
import { fieldValidations } from "./fieldValidations/field.validations";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormAccion: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postAccion = UseQueryMutation({
        requestFn: AccionApi.postAccion,
        options: {
            onError: () => {
                toast.error(t(lang.Action.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Action.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchAccion = UseQueryMutation({
        requestFn: AccionApi.patchAccion,
        options: {
            onError: () => {
                toast.error(t(lang.Action.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Action.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: AccionPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: AccionPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };

                    await patchAccion.mutateAsync(req);
                } else {

                    await postAccion.mutateAsync(values);

                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchAccion, postAccion]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: AccionPostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
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

export default FormAccion;