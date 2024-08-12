import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { SuscripcionPostDTO } from "@features/suscripcion/model/dtos/suscripcion.dto";
import { FormSelect } from "@components/common/forms/FormSelect";
import useQueryApi from "@hooks/useQueryApi";
import { SistemaApi } from "@features/sistema/service/sistema.service";
import { SistemaEntity } from "@features/sistema/model/entity/sistema.entity";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<SuscripcionPostDTO>();
    const { data, isLoading } = useQueryApi<{ data: SistemaEntity[] }>("sistema", SistemaApi.getSistemaSearch);
    const [sistemaOptions, setSistemaOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(sistema => ({
                nombre: sistema.nombre ?? "Seleccionar",
                value: sistema.id
            }));
            setSistemaOptions(options);
        }
    }, [data]);
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-4 mb-3">
                    <FormTextInput label={t(lang.Suscripcion.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-4 mb-3">
                    <FormTextInput label={t(lang.Suscripcion.form.description)} name={'descripcion'} />
                </div>
                <div className="col-12 md:col-12 lg:col-4 mb-3">
                    <FormSelect
                        label="Sistemas"
                        name="sistema"
                        options={sistemaOptions}
                        optionLabel="nombre"
                        isLoading={isLoading}

                    />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;