import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";

import { ModuloPatchDTO, ModuloPostDTO } from "@features/modulo/model/dtos/modulo.dto";
import { ModuloApi } from "@features/modulo/service/modulo.service";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import FormFields from "./FormFields"; // Asegúrate de que este archivo esté en la ruta correcta

interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}

const FormModulo: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postModulo = UseQueryMutation({
        requestFn: ModuloApi.postModulo,
        options: {
            onError: () => {
                toast.error(t(lang.Module.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Module.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchModulo = UseQueryMutation({
        requestFn: ModuloApi.patchModulo,
        options: {
            onError: () => {
                toast.error(t(lang.Module.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Module.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: ModuloPostDTO, { setSubmitting }: any) => {
            try {
                const valuesToSend = {
                    ...values,
                    body: values.body.map(item => ({
                        ...item,
                        sistema: values.sistema, // Propaga el valor de `sistema` a cada objeto
                    })),
                };

                if (rowData) {
                    const req: ModuloPatchDTO = {
                        id: rowData.id,
                        ...valuesToSend.body[0],  // Asume que estás actualizando el primer objeto en el array
                    };
                    await patchModulo.mutateAsync(req);
                } else {
                    await postModulo.mutateAsync(valuesToSend);
                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchModulo, postModulo]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    // Asegúrate de extraer el valor correcto de `sistema`, no el objeto entero.
    const initialValues: ModuloPostDTO = {
        body: rowData ? [{
            nombre: rowData.nombre,
            descripcion: rowData.descripcion,
            element: rowData.element,
            icon: rowData.icon,
            label: rowData.label,
            moduloPadre: rowData.moduloPadre,
            path: rowData.path,
        }] : [{
            nombre: '',
            descripcion: '',
            element: '',
            icon: '',
            label: '',
            moduloPadre: 0,
            path: '',
        }],
        sistema: rowData ? rowData.sistema.id : 0 // Asegúrate de extraer el valor correcto (por ejemplo, id)
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
                    <FormFields isEditMode={!!rowData} />
                </>
            </Formik>
        </>
    );
};

export default FormModulo;
