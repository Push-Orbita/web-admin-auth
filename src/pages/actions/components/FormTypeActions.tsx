import { Formik } from "formik"
import { FC } from "react"
import { useModuleContext } from "../../../hooks/useModules"
import UseQueryMutation from "../../../hooks/useQueryMutation"
import { ActionsPatchDTO, ActionsPostDTO } from "../../../model/dtos/actions/actions.dto"
import { ActionsApi } from "../../../services/actions/actions.service"
import { fieldValidations } from "../fields/field.validations"
import FormFields from "./FormFields"
import toast from "react-hot-toast"

const FormTypeActions: FC = () => {
    const { setRowData,rowData, visible, setVisible } = useModuleContext();


    const postActions = UseQueryMutation({
        requestFn: ActionsApi.postActions,
        options: {
            onError() {
                alert('error')
            },
            onSuccess: () => {
                toast.success('Exito POST')
                setVisible(!visible)
            },
        },
    })

    const patchActions = UseQueryMutation({
        requestFn: ActionsApi.patchActions,
        options: {
            onError() {
                alert('error')
            },
            onSuccess: () => {
                toast.success('Exito PATCH')
                setVisible(!visible)
                setRowData('');
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