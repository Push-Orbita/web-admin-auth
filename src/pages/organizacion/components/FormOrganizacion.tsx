import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../hooks/useModules"
import UseQueryMutation from "../../../hooks/useQueryMutation"
import { lang } from "../../../langs"
import { SistemaPatchDTO, SistemaPostDTO } from "../../../model/dtos/sistema/sistema.dto"
import { SistemaApi } from "../../../services/sistema/sistema.service"
import FormFields from "./FormFields"
import { fieldValidations } from "../field/field.validations"
import { OrganizacionApi } from "../../../services/organizacion/organizacion.service"
import { OrganizacionPostDTO } from "../../../model/dtos/organizacion/organizacion.dto"

interface FormTypeActionsProps {
    refetch: () => void;
}
const FormOrganizacion: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postActions = UseQueryMutation({
        requestFn: OrganizacionApi.postOrganizcion,
        options: {
            onError() {
                toast.error(t(lang.System.messages.createdError))
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


    const intialValues: OrganizacionPostDTO = {
        nombre: rowData?.nombre ?? "",
        bd: rowData?.bd ?? "",
        host: rowData?.host ?? "",
        port: rowData?.port ?? "",
        usuario: rowData?.usuario ?? "",
        password: rowData?.password ?? "",
        tipobd: rowData?.tipobd ?? "",
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

export default FormOrganizacion