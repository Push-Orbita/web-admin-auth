import { Formik } from "formik"
import { t } from "i18next"
import toast from "react-hot-toast"
import { useModuleContext } from "../../../../hooks/useModules"
import UseQueryMutation from "../../../../hooks/useQueryMutation"
import { lang } from "../../../../langs"
import { useCallback, useEffect } from "react"
import { fieldValidations } from "./fieldValidations/field.validations"
import { Button } from "primereact/button"
import { Message } from "primereact/message"
import { EspecieTypeApi } from "@features/especieType/service/especieType.service"
import { EspecieTypePatchDTO, EspecieTypePostDTO } from "@features/especieType/model/dtos/especieType.dto"
import FormFields from "./FormFields"



interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormEspecieType: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postEspecieType = UseQueryMutation({
        requestFn: EspecieTypeApi.postEspecieType,
        options: {
            onError: () => {
                toast.error(t(lang.EspecieType.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.EspecieType.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchEspecieType = UseQueryMutation({
        requestFn: EspecieTypeApi.patchEspecieType,
        options: {
            onError: () => {
                toast.error(t(lang.EspecieType.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.EspecieType.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: EspecieTypePostDTO) => {
            if (rowData) {
                const req: EspecieTypePatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchEspecieType.mutateAsync(req);
            } else {
                await postEspecieType.mutateAsync(values);
            }
        },
        [rowData, patchEspecieType, postEspecieType]
    );
    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);


    const initialValues: EspecieTypePostDTO = {
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

export default FormEspecieType