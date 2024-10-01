import { RolPostDTO } from "@features/rol/model/dtos/rol.dto";
import { RolApi } from "@features/rol/service/rol.service";
import { Formik } from "formik";
import { t } from "i18next";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import FormFields from "./FormFields";
import { fieldValidations } from "./fieldValidations/field.validations";

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

    const transformValues = (values: any & { accionesSeleccionadas: any[] }) => {
        // Usamos accionesSeleccionadas en lugar de accionesPorRol
        const accionesPorRol = values.accionesSeleccionadas && values.accionesSeleccionadas.length > 0
            ? values.accionesSeleccionadas.map((accion: any) => ({
                accionPorModulo: accion.id, // Enviamos el id de accionPorModulo directamente
            }))
            : [];

        console.log('Acciones por rol transformadas:', accionesPorRol);

        // Retornar solo las propiedades necesarias, eliminando sistema y modulo
        const result = {
            nombre: values.nombre,
            descripcion: values.descripcion,
            accionesPorRol, // Incluimos el campo transformado
        };

        console.log('Valores finales transformados:', result);
        return result;
    };

    const onSave = useCallback(
        async (values: RolPostDTO & { accionesSeleccionadas: any[] }, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                console.log('Valores originales:', values);
                const transformedValues = transformValues(values);
                console.log('Valores transformados:', transformedValues);
                if (rowData) {
                    // Código para actualizar (patch)
                    await patchRol.mutateAsync(transformedValues);
                } else {
                    await postRol.mutateAsync(transformedValues);
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

    const initialValues: any & { accionesSeleccionadas: any[] } = {
        nombre: rowData?.nombre ?? "",
        descripcion: rowData?.descripcion ?? "",
        accionesPorRol: rowData?.accionesPorRol ?? [],
        accionesSeleccionadas: rowData?.accionesPorRol?.map((accion: any) => ({
            id: accion.accionPorModulo.id,
            nombre: accion.accionPorModulo.accion.nombre,
            descripcion: accion.accionPorModulo.accion.descripcion,
            moduloNombre: accion.accionPorModulo.modulo.nombre
        })) ?? [],
        sistema: rowData?.sistema ?? 0,
        modulo: rowData?.modulo ?? 0,
    };

    console.log('Valores iniciales:', initialValues);

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
                    console.log('Valores en el momento de submit:', values);
                    onSave(values, setSubmitting);
                }}
            >
                {({ values, setFieldValue }) => (
                    <>
                        <FormFields setFieldValue={setFieldValue} />
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </>
                )}
            </Formik>
        </>
    );
};

export default FormRol;
