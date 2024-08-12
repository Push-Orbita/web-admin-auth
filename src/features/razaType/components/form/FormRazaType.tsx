import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { useModuleContext } from "../../../../hooks/useModules";
import { lang } from "../../../../langs";
import { RazaTypeApi } from "@features/razaType/service/razaType.service";
import { RazaTypePatchDTO, RazaTypePostDTO } from "@features/razaType/model/dtos/razaType.dto";
import { fieldValidations } from "@features/actividadType/components/form/fieldValidations/field.validations";
import FormFields from "./FormField";
import { Message } from "primereact/message";
import { Button } from "primereact/button";



interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormRazaType: React.FC<FormTypeActionsProps> = ({ refetch,title }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postRazaType = UseQueryMutation({
        requestFn: RazaTypeApi.postRazaType,
        options: {
            onError() {
                toast.error(t(lang.RazaType.messages.createdError))
            },
            onSuccess: () => {
                toast.success(t(lang.RazaType.messages.createdSuccess))
                setVisible(!visible)
                refetch()
            },
        },
    })

    const patchRazaType = UseQueryMutation({
        requestFn: RazaTypeApi.patchRazaType,
        options: {
            onError() {
                toast.error(t(lang.RazaType.messages.updatedError))
            },
            onSuccess: () => {
                toast.success(t(lang.RazaType.messages.updatedSuccess))
                setVisible(!visible)
                setRowData('');
                refetch()
            },
        },
    })

    const initialValues: RazaTypePostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        especie: rowData?.especie ?? "",
    }

    const onSave = async (values: RazaTypePostDTO) => {
        if (rowData) {
            const req: RazaTypePatchDTO = {
                id: rowData.id,
                ...values,
            }
            return await patchRazaType.mutateAsync(req)
        }
        await postRazaType.mutateAsync(values)
    }
    return (
        <>
            <div className="grid mb-5">
                <div className="col-12">
                    <Button icon="pi pi-arrow-left" rounded text onClick={() => { setVisible(false), setRowData(undefined) }} />
                </div>
                <div className="col-12">
                    {
                        rowData ? (<Message severity="warn" text={title} style={{
                            width: '100%',
                            fontSize: '900',
                            height: '3rem'
                        }} />) :
                            (<Message severity="info" text={title} style={{
                                width: '100%',
                                fontSize: '900',
                                height: '3rem'
                            }} />)
                    }
                </div>
            </div>
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
        </>

    )
}

export default FormRazaType