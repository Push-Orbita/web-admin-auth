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
import { OrganizacionApi } from "@features/organizacion/service/organizacion.service";
import { OrganizacionPatchDTO, OrganizacionPostDTO } from "@features/organizacion/model/dtos/organizacion.dto";
import FormFields from "./FormFields";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormOrganizacion: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postOrganizacion = UseQueryMutation({
        requestFn: OrganizacionApi.postOrganizacion,
        options: {
            onError: () => {
                toast.error(t(lang.Organizacion.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Organizacion.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchOrganizacion = UseQueryMutation({
        requestFn: OrganizacionApi.patchOrganizacion,
        options: {
            onError: () => {
                toast.error(t(lang.Organizacion.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Organizacion.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: OrganizacionPostDTO) => {
            if (rowData) {
                const req: OrganizacionPatchDTO = {
                    id: rowData.id,
                    ...values,
                };
                await patchOrganizacion.mutateAsync(req);
            } else {
                await postOrganizacion.mutateAsync(values);
            }
        },
        [rowData, patchOrganizacion, postOrganizacion]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: OrganizacionPostDTO = {
        nombre: rowData?.nombre ?? "",
        bd: rowData?.bd ?? "",
        host: rowData?.host ?? "",
        password: rowData?.password ?? "",
        port: rowData?.port ?? "",
        tipobd: rowData?.tipobd ?? "",
        usuario: rowData?.usuario ?? ""
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
                    onSave(values);
                    setSubmitting(false);
                }}
            >
                <>
                    <FormFields />
                </>
            </Formik>
        </>
    );
};

export default FormOrganizacion;