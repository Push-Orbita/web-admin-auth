import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { UsuarioApi } from "@features/usuario/service/usuario.service";
import { UsuarioPatchDTO, UsuarioPostDTO } from "@features/usuario/model/dtos/usuario.dto";
import FormFields from "./FormFields";
import { fieldValidations } from "./fieldValidations/field.validations";





interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormUsuario: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postUsuario = UseQueryMutation({
        requestFn: UsuarioApi.postUsuario,
        options: {
            onError: () => {
                toast.error(t(lang.User.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.User.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchUsuario = UseQueryMutation({
        requestFn: UsuarioApi.patchUsuario,
        options: {
            onError: () => {
                toast.error(t(lang.User.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.User.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: UsuarioPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: UsuarioPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };

                    await patchUsuario.mutateAsync(req);
                } else {

                    await postUsuario.mutateAsync(values);

                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchUsuario, postUsuario]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: UsuarioPostDTO = {
        nombre: rowData?.nombre ?? "",
        email: rowData?.email ?? "",
        password: rowData?.password ?? "",
        repeatPassword: rowData?.repeatPassword ?? "",
        persona: rowData?.pesrona ?? "",
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

export default FormUsuario;