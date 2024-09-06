import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import FormFields from "./FormFields";
import { AccionModuloApi } from "@features/accion-modulo/service/accionModulo.service";
import { AccionModuloPatchDTO, AccionModuloPostDTO } from "@features/accion-modulo/model/dtos/accionModulo.dto";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormAccionModulo: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postAccionModulo = UseQueryMutation({
        requestFn: AccionModuloApi.postAccionModulo,
        options: {
            onError: () => {
                toast.error(t(lang.ActionModule.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.ActionModule.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchAccionModulo = UseQueryMutation({
        requestFn: AccionModuloApi.patchAccionModulo,
        options: {
            onError: () => {
                toast.error(t(lang.ActionModule.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.ActionModule.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: AccionModuloPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: AccionModuloPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };

                    await patchAccionModulo.mutateAsync(req);
                } else {

                    await postAccionModulo.mutateAsync(values);

                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchAccionModulo, postAccionModulo]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: AccionModuloPostDTO = {
        accion: rowData?.accion ?? "",
        modulo: rowData?.modulo ?? ""
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

export default FormAccionModulo;