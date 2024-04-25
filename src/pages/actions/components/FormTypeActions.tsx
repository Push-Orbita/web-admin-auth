import { Formik } from "formik"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../hooks/useModules"
import UseQueryMutation from "../../../hooks/useQueryMutation"
import { ActionsPatchDTO, ActionsPostDTO } from "../../../model/dtos/actions/actions.dto"
import { ActionsApi } from "../../../services/actions/actions.service"
import { fieldValidations } from "../fields/field.validations"
import FormFields from "./FormFields"
import { t } from "i18next"
import { lang } from "../../../langs"

interface FormTypeActionsProps {
    refetch: () => void;
}
const FormTypeActions: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postActions = UseQueryMutation({
        requestFn: ActionsApi.postActions,
        options: {
            onError() {
                toast.error(t(lang.ActionsType.messages.createdSuccess))
            },
            onSuccess: () => {
                toast.success(t(lang.ActionsType.messages.createdSuccess))
                setVisible(!visible)
                refetch()
            },
        },
    })

    const patchActions = UseQueryMutation({
        requestFn: ActionsApi.patchActions,
        options: {
            onError() {
                toast.error(t(lang.ActionsType.messages.updatedError))
            },
            onSuccess: () => {
                toast.success(t(lang.ActionsType.messages.updatedSuccess))
                setVisible(!visible)
                setRowData('');
                refetch()
            },
        },
    })


    const intialValues: ActionsPostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
    }

    const onSave = async (values: ActionsPostDTO) => {
        if (rowData) {
            const req: ActionsPatchDTO = {
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

export default FormTypeActions