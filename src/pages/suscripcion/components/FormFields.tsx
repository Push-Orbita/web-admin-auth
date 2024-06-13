import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import FormCustomBottons from "../../../common/components/forms/FormCustomBottons";
import { FormTextInput } from "../../../common/components/forms/FormTextInput";
import { lang } from "../../../langs";
import { PresentacionPostDTO } from "../../../model/dtos/presentacion/presentacion.dto";
import useQueryApi from "../../../hooks/useQueryApi";
import { SistemaApi } from "../../../services/sistema/sistema.service";
import { FormSelect } from "../../../common/components/forms/FormSelect";
import { SistemaEntity } from "../../../model/sistema/sistema.entity";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<PresentacionPostDTO>()

    const { data,isLoading } = useQueryApi<{ data: SistemaEntity[] }>("sistema", SistemaApi.getSistemaSearch);
    const [sistemaOptions, setSistemaOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(sistema => ({
                nombre: sistema.nombre,
                value: sistema.id
            }));
            setSistemaOptions(options);
        }
    }, [data]);
    

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6  lg:col-4">
                    <FormTextInput label={t(lang.Suscripcion.form.name)} name={'nombre'}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <FormTextInput label={t(lang.Suscripcion.form.description)} name={'descripcion'}
                    />
                </div>
                <div className="col-12 md:col-6  lg:col-4">
                    <FormSelect
                        label="Sistemas"
                        name="sistema"
                        options={sistemaOptions}
                        optionLabel="nombre"
                        isLoading={isLoading}
                        
                    />

                </div>

            </div>
            <FormCustomBottons />


        </Form>
    )
}

export default FormFields