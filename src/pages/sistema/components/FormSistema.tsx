import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../hooks/useModules"
import UseQueryMutation from "../../../hooks/useQueryMutation"
import { lang } from "../../../langs"
import { SistemaPatchDTO, SistemaPostDTO } from "../../../model/dtos/sistema/sistema.dto"
import { SistemaApi } from "../../../services/sistema/sistema.service"
import { fieldValidations } from "../fields/field.validations"
import FormFields from "./FormFields"

interface FormTypeActionsProps {
    refetch: () => void;
}
const FormSistema: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postActions = UseQueryMutation({
        requestFn: SistemaApi.postSistema,
        options: {
            onError() {
                toast.error(t(lang.System.messages.createdSuccess))
            },
            onSuccess: () => {
                toast.success(t(lang.System.messages.createdSuccess))
                setVisible(!visible)
                refetch()
            },
        },
    })

    const patchSistemas = UseQueryMutation({
        requestFn: SistemaApi.patchSistema,
        options: {
            onError() {
                toast.error(t(lang.System.messages.updatedError))
            },
            onSuccess: () => {
                toast.success(t(lang.System.messages.updatedSuccess))
                setVisible(!visible)
                setRowData('');
                refetch()
            },
        },
    })


    const intialValues: SistemaPostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        icono: rowData?.icono ?? "",
        url: rowData?.url ?? "",
    }

    const onSave = async (values: SistemaPostDTO) => {
        if (rowData) {
            const req: SistemaPatchDTO = {
                id: rowData.id,
                ...values,
            }
            return await patchSistemas.mutateAsync(req)
        }
        await postActions.mutateAsync(values)
    }
    return (
        <Formik
            initialValues={intialValues}
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

export default FormSistema