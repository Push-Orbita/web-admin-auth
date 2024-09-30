import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { RolApi } from "@features/rol/service/rol.service";
import { RolPatchDTO, RolPostDTO } from "@features/rol/model/dtos/rol.dto";
import FormFields from "./FormFields";
import { fieldValidations } from "./fieldValidations/field.validations";
import { AccionPorModulo } from "@features/rol/model/entity/rol.entity";

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

    // Definir el tipo para las acciones por rol
    type AccionPorRol = {
        id: number;
        accionPorModulo: AccionPorModulo;
    };

    const transformValues = (values: any & { accionesSeleccionadas: any[] }) => {
        // Usamos accionesSeleccionadas en lugar de accionesPorRol
        const accionesPorRol = values.accionesSeleccionadas && values.accionesSeleccionadas.length > 0
            ? values.accionesSeleccionadas.map((accion: any) => ({
                accionPorModulo: {
                    id: accion.id,
                },
            }))
            : [];

        console.log('Acciones por rol transformadas:', accionesPorRol);

        return {
            nombre: values.nombre,
            descripcion: values.descripcion,
            accionesPorRol,
            sistema: values.sistema,
            modulo: values.modulo,
        };
    };

    const onSave = useCallback(
        async (values: RolPostDTO & { accionesSeleccionadas: any[] }, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                console.log('Valores originales:', values);
                const transformedValues = transformValues(values);
                console.log('Valores transformados:', transformedValues);
                if (rowData) {
                    // Código para actualizar (patch)
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
        accionesSeleccionadas: [],
        sistema: rowData?.sistema ?? 1,
        modulo: rowData?.modulo ?? 1,
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
                {({ values }) => (
                    <>
                        <FormFields />
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </>
                )}
            </Formik>
        </>
    );
};

export default FormRol;
