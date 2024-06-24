import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../hooks/useModules"
import UseQueryMutation from "../../../hooks/useQueryMutation"
import { lang } from "../../../langs"
import { OrganizacionPatchDTO, OrganizacionPostDTO } from "../../../model/dtos/organizacion/organizacion.dto"
import { OrganizacionApi } from "../../../services/organizacion/organizacion.service"
import { fieldValidations } from "../field/field.validations"
import FormFields from "./FormFields"

interface FormTypeActionsProps {
    refetch: () => void;
}
const FormOrganizacion: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postOrganizacion = UseQueryMutation({
        requestFn: OrganizacionApi.postOrganizcion,
        options: {
            onError() {
                toast.error(t(lang.Organization.messages.createdError))
            },
            onSuccess: () => {
                toast.success(t(lang.Organization.messages.createdSuccess))
                setVisible(!visible)
                refetch()
            },
        },
    })

    const patchOrganizaciones = UseQueryMutation({
        requestFn: OrganizacionApi.patchOrganizcion,
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


    const onSave = async (values: OrganizacionPostDTO) => {
        try {
            if (rowData) {
                const req: OrganizacionPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchOrganizaciones.mutateAsync(req);
            } else {
                await postOrganizacion.mutateAsync(values);
            }
        } finally {
            setRowData(undefined); // Resetea rowData después de guardar
        }
    };
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