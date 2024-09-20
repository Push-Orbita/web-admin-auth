import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
// import { fieldValidations } from "./fieldValidations/fieldvalidations";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { RolApi } from "@features/rol/service/rol.service";
import { RolPatchDTO, RolPostDTO } from "@features/rol/model/dtos/rol.dto";
import FormFields from "./FormFields";
import { fieldValidations } from "./fieldValidations/field.validations";
// import FormFields from "./FormFields";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormRol: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postRol = UseQueryMutation({
        requestFn: RolApi.postRol,
        options: {
            onError: () => {
                toast.error(t(lang.Rol.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Rol.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchRol = UseQueryMutation({
        requestFn: RolApi.patchRol,
        options: {
            onError: () => {
                toast.error(t(lang.Rol.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Rol.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: RolPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: RolPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };
                    await patchRol.mutateAsync(req);
                } else {
                    await postRol.mutateAsync(values);
                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchRol, postRol]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: RolPostDTO = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
    };

    return (
        <>
            <div className="grid mb-5">
                <div className="col-12">
                    <Button icon="pi pi-arrow-left" rounded text onClick={() => { setVisible(false); setRowData(undefined); }} />
                </div>
                <div className="col-12">
                    {
                        rowData ? (
                            <Message severity="warn" text={title} style={{
                                width: '100%',
                                fontSize: '900',
                                height: '3rem'
                            }} />
                        ) : (
                            <Message severity="info" text={title} style={{
                                width: '100%',
                                fontSize: '900',
                                height: '3rem'
                            }} />
                        )
                    }
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={fieldValidations}
                onSubmit={(values, { setSubmitting }) => {
                    onSave(values, setSubmitting);
                }}
            >
                <>
                    <FormFields />
                </>
            </Formik>
        </>
    );
};

export default FormRol;