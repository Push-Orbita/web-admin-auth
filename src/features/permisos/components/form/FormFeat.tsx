import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { fieldValidations } from "./fieldValidations/field.validations";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { PermisosApi } from "@features/permisos/service/permisos.service";
import { PermisosPatchDTO, PermisosPostDTO } from "@features/permisos/model/dtos/permisos.dto";
import FormFields from "./FormFields";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormPermisos: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postPermisos = UseQueryMutation({
        requestFn: PermisosApi.postPermisos,
        options: {
            onError: () => {
                toast.error(t(lang.Permissions.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Permissions.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchPermisos = UseQueryMutation({
        requestFn: PermisosApi.patchPermisos,
        options: {
            onError: () => {
                toast.error(t(lang.Permissions.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Permissions.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: PermisosPostDTO, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
            try {
                if (rowData) {
                    const req: PermisosPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };
                    await patchPermisos.mutateAsync(req);
                } else {
                    await postPermisos.mutateAsync(values);
                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchPermisos, postPermisos]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: PermisosPostDTO = {
        usuario: rowData?.usuario.id ?? 0,
        sistema: rowData?.sistema.id ?? 0,
        organizacion: rowData?.organizacion.id ?? 0,
        rol: rowData?.rol.id ?? 0,
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
                    onSave(values, { setSubmitting });
                }}
            >
                <>
                    <FormFields />
                </>
            </Formik>
        </>
    );
};

export default FormPermisos;