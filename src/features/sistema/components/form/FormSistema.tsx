import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { fieldValidations } from "./fieldValidations/fieldvalidations";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { SistemaApi } from "@features/sistema/service/sistema.service";
import { SistemaPatchDTO, SistemaPostDTO } from "@features/sistema/model/dtos/sistema.dto";
import FormFields from "./FormFields";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormSistema: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postSistema = UseQueryMutation({
        requestFn: SistemaApi.postSistema,
        options: {
            onError: () => {
                toast.error(t(lang.Sistema.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Sistema.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchSistema = UseQueryMutation({
        requestFn: SistemaApi.patchSistema,
        options: {
            onError: () => {
                toast.error(t(lang.Sistema.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Sistema.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: SistemaPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: SistemaPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };

                    await patchSistema.mutateAsync(req);
                } else {

                    await postSistema.mutateAsync(values);

                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchSistema, postSistema]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: SistemaPostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        icono: rowData?.icono ?? "",
        url: rowData?.icono ?? ""
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

export default FormSistema;