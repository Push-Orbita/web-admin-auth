import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../../hooks/useModules"
import UseQueryMutation from "../../../../hooks/useQueryMutation"
import { lang } from "../../../../langs"
import { useCallback, useEffect } from "react"
import { ActividadTypeApi } from "@features/actividadType/service/actividadtype.service"
import { ActividadTypePatchDTO, ActividadTypePostDTO } from "@features/actividadType/model/dtos/actividadType.dto"
import { fieldValidations } from "./fieldValidations/field.validations"
import FormFields from "./FormFields"
import { Button } from "primereact/button"
import { Message } from "primereact/message"


interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormActividadType: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postActividadType = UseQueryMutation({
        requestFn: ActividadTypeApi.postActividadType,
        options: {
            onError: () => {
                toast.error(t(lang.ActividadType.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.ActividadType.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchActividadType = UseQueryMutation({
        requestFn: ActividadTypeApi.patchActividadType,
        options: {
            onError: () => {
                toast.error(t(lang.ActividadType.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.ActividadType.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: ActividadTypePostDTO) => {
            if (rowData) {
                const req: ActividadTypePatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchActividadType.mutateAsync(req);
            } else {
                await postActividadType.mutateAsync(values);
            }
        },
        [rowData, patchActividadType, postActividadType]
    );
    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);


    const initialValues: ActividadTypePostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
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
                            fontSize:'900',
                            height:'3rem'
                        }} />) :
                            (<Message severity="info" text={title} style={{
                                width: '100%',
                                fontSize:'900',
                            height:'3rem'
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

export default FormActividadType