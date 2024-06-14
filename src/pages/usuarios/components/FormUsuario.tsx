import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../hooks/useModules"
import UseQueryMutation from "../../../hooks/useQueryMutation"
import { lang } from "../../../langs"
import { UsuarioPatchDTO, UsuarioPostDTO } from "../../../model/dtos/usuario/usuario.dto"
import { UsuarioApi } from "../../../services/usuario/usuario.service"

// import FormFields from "./FormFields"
import { fieldValidations } from "../field/fieldValidations"
import FormFields from "./FomrFields"

interface FormTypeActionsProps {
    refetch: () => void;
}
const FormUsuario: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postUsuario = UseQueryMutation({
        requestFn: UsuarioApi.postUsuario,
        options: {
            onError() {
                toast.error(t(lang.User.messages.createdError))
            },
            onSuccess: () => {
                toast.success(t(lang.User.messages.createdSuccess))
                setVisible(!visible)
                refetch()
            },
        },
    })

    const patchUsuario = UseQueryMutation({
        requestFn: UsuarioApi.patchUsuario,
        options: {
            onError() {
                toast.error(t(lang.User.messages.updatedError))
            },
            onSuccess: () => {
                toast.success(t(lang.User.messages.updatedSuccess))
                setVisible(!visible)
                setRowData('');
                refetch()
            },
        },
    })

    const initialValues: UsuarioPostDTO = {
        nombre: rowData?.nombre ?? "",
        email: rowData?.email ?? "",
        password: rowData?.password ?? "",
        repeatPassword: rowData?.repeatPassword ?? ""
    }

    const onSave = async (values: UsuarioPostDTO) => {
        if (rowData) {
            const req: UsuarioPatchDTO = {
                id: rowData.id,
                ...values,
            }
            return await patchUsuario.mutateAsync(req)
        }
        await postUsuario.mutateAsync(values)
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={fieldValidations}
            onSubmit={(values, { setSubmitting }) => {
                onSave(values)
                setSubmitting(false)
            }}
        >
            <>
                <FormFields />
            </>
        </Formik>
    )
}

export default FormUsuario