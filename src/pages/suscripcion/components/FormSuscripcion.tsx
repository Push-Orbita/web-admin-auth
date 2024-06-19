import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../hooks/useModules"
import UseQueryMutation from "../../../hooks/useQueryMutation"
import { lang } from "../../../langs"
import { SuscripcionPatchDTO, SuscripcionPostDTO } from "../../../model/dtos/suscripcion/suscripcion.dto"
import { SuscripcionApi } from "../../../services/suscripcion/suscripcion.service"
import { fieldValidations } from "../field/field.validations"
import FormFields from "./FormFields"


interface FormTypeActionsProps {
    refetch: () => void;
}
const FormSuscripcion: React.FC<FormTypeActionsProps> = ({ refetch }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postSuscripcion = UseQueryMutation({
        requestFn: SuscripcionApi.postSuscripcion,
        options: {
            onError() {
                toast.error(t(lang.Suscripcion.messages.createdError))
            },
            onSuccess: () => {
                toast.success(t(lang.Suscripcion.messages.createdSuccess))
                setVisible(!visible)
                refetch()
            },
        },
    })

    const patchSuscripcion = UseQueryMutation({
        requestFn: SuscripcionApi.patchSuscripcion,
        options: {
            onError() {
                toast.error(t(lang.Suscripcion.messages.updatedError))
            },
            onSuccess: () => {
                toast.success(t(lang.Suscripcion.messages.updatedSuccess))
                setVisible(!visible)
                setRowData('');
                refetch()
            },
        },
    })


    const intialValues: SuscripcionPostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        sistema: rowData?.sistema ?? "",
    }

    const onSave = async (values: SuscripcionPostDTO) => {
        try {
            if (rowData) {
                const req: SuscripcionPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchSuscripcion.mutateAsync(req);
            } else {
                await postSuscripcion.mutateAsync(values);
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

export default FormSuscripcion