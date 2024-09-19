import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { PersonaApi } from "@features/persona/service/persona.service";
import { PersonaPatchDTO, PersonaPostDTO } from "@features/persona/model/dtos/persona.dto";
import FormFields from "./FormFields";
import { fieldValidations } from "./fieldValidations/fieldValidations";

interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}

const FormPersona: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postPersona = UseQueryMutation({
        requestFn: PersonaApi.postPersona,
        options: {
            onError: () => {
                toast.error(t(lang.Person.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Person.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchPersona = UseQueryMutation({
        requestFn: PersonaApi.patchPersona,
        options: {
            onError: () => {
                toast.error(t(lang.Person.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Person.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(

        async (values: PersonaPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {

            try {
                if (rowData) {
                    const req: PersonaPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };

                    await patchPersona.mutateAsync(req);
                } else {

                    await postPersona.mutateAsync(values);

                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchPersona, postPersona]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: PersonaPostDTO = {
        nombre: rowData?.nombre ?? "",
        apellido: rowData?.apellido ?? "",
        cuil: rowData?.cuil ?? "",
        genero: rowData?.genero ?? ""
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

export default FormPersona;
