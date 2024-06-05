import { Formik } from "formik"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../hooks/useModules"
import UseQueryMutation from "../../../hooks/useQueryMutation"
import { PresentacionPatchDTO, PresentacionPostDTO } from "../../../model/dtos/presentacion/presentacion.dto"
import { fieldValidations } from "../fields/field.validations"
import { t } from "i18next"
import { lang } from "../../../langs"
import { PresentacionApi } from "../../../services/presentacion/presentacion.service"
import FormFields from "./FormFields"

interface FormTypeActionsProps {
    refetch: () => void;
}
const FormTypePresentacion: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postActions = UseQueryMutation({
        requestFn: PresentacionApi.postActions,
        options: {
            onError() {
                toast.error(t(lang.PresentacionType.messages.createdError))
            },
            onSuccess: () => {
                toast.success(t(lang.PresentacionType.messages.createdSuccess))
                setVisible(!visible)
                refetch()
            },
        },
    })

    const patchActions = UseQueryMutation({
        requestFn: PresentacionApi.patchActions,
        options: {
            onError() {
                toast.error(t(lang.PresentacionType.messages.updatedError))
            },
            onSuccess: () => {
                toast.success(t(lang.PresentacionType.messages.updatedSuccess))
                setVisible(!visible)
                setRowData('');
                refetch()
            },
        },
    })


    const intialValues: PresentacionPostDTO = {
        nombre: rowData?.nombre ?? "",
        siglas: rowData?.siglas ?? ""
    }

    const onSave = async (values: PresentacionPostDTO) => {
        if (rowData) {
            const req: PresentacionPatchDTO = {
                id: rowData.id,
                ...values,
            }
            return await patchActions.mutateAsync(req)
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

export default FormTypePresentacion