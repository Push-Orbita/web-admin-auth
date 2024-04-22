import UseQueryMutation from "../../../hooks/useQueryMutation"
import { ActionsPatchDTO, ActionsPostDTO } from "../../../model/dtos/actions/actions.dto"
import { FC } from "react"
import { ActionsApi } from "../../../services/actions/actions.service"
import { Form, Formik } from "formik"
import { fieldValidations } from "../fields/field.validations"
import FormFields from "./FormFields"
interface PropsEdit {
    type?: ActionsPatchDTO
}
const FormTypeActions: FC<PropsEdit> = ({ type }) => {

    const postActions = UseQueryMutation({
        requestFn: ActionsApi.postActions,
        options: {
            onError() {
                alert('error')
            },
            onSuccess: () => {
                alert('exito')
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
                alert('exito')
            },
        },
    })


    const intialValues: ActionsPostDTO = {
        nombre: type?.nombre ?? "",
        descripcion: type?.descripcion ?? "",
    }

    const onSave = async (values: ActionsPostDTO) => {
        if (type) {
            const req: ActionsPatchDTO = {
                id: type.id,
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
                console.log(values)
                onSave(values)
                setSubmitting(false)
            }}
        >
            {({ handleSubmit }) => (
                <>
                    <Form onSubmit={handleSubmit}>
                        <FormFields />
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default FormTypeActions