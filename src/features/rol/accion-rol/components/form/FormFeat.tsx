import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { lang } from "../../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useModuleContext } from "@hooks/useModules";
import UseQueryMutation from "@hooks/useQueryMutation";
import { AccionRolApi } from "../../service/accionRol.service";
import { AccionRolPatchDTO, AccionRolPostDTO } from "../../model/dtos/accionRol.dto";

interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormAccionRol: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postAccionRol = UseQueryMutation({
        requestFn: AccionRolApi.postAccionRol,
        options: {
            onError: () => {
                toast.error(t(lang.AccionRol.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.AccionRol.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchAccionRol = UseQueryMutation({
        requestFn: AccionRolApi.patchAccionRol,
        options: {
            onError: () => {
                toast.error(t(lang.AccionRol.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.AccionRol.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: AccionRolPostDTO, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
            try {
                if (rowData) {
                    const req: AccionRolPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };
                    await patchAccionRol.mutateAsync(req);
                } else {
                    await postAccionRol.mutateAsync(values);
                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchAccionRol, postAccionRol]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: AccionRolPostDTO = {
        rol: rowData?.rol ?? "",
        accionPorModuloId: rowData?.accionPorModuloId ?? "",
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
                // validationSchema={fieldValidations}
                onSubmit={(values, { setSubmitting }) => {
                    onSave(values, { setSubmitting });
                }}
            >
                <>
                    {/* <FormFields /> */}
                </>
            </Formik>
        </>
    );
};

export default FormAccionRol;