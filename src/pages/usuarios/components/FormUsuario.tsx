import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../hooks/useModules";
import UseQueryMutation from "../../../hooks/useQueryMutation";
import { lang } from "../../../langs";
import { UsuarioPatchDTO, UsuarioPostDTO } from "../../../model/dtos/usuario/usuario.dto";
import { UsuarioApi } from "../../../services/usuario/usuario.service";
import { fieldValidations } from "../field/fieldValidations";
import FormFields from "./FormFields";

interface FormTypeActionsProps {
    refetch: () => void;
}

const FormUsuario: React.FC<FormTypeActionsProps> = ({ refetch }) => {
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

    const initialValues: UsuarioPostDTO = {
        nombre: rowData?.nombre ?? "",
        email: rowData?.email ?? "",
        password: rowData?.password ?? "",
        repeatPassword: rowData?.password ?? "",
    };

    const onSave = useCallback(
        async (values: UsuarioPostDTO) => {
            if (rowData) {
                const req: UsuarioPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchUsuario.mutateAsync(req);
            } else {
                await postUsuario.mutateAsync(values);
            }
        },
        [rowData, patchUsuario, postUsuario]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={fieldValidations}
            onSubmit={async (values, { setSubmitting }) => {
                await onSave(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <>
                    <FormFields disabled={isSubmitting} />
                </>
            )}
        </Formik>
    );
};

export default FormUsuario;
