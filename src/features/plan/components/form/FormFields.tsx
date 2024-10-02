import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { PlanPostDTO } from "@features/plan/model/dtos/plan.dto";
import { SuscripcionApi } from "@features/suscripcion/service/suscripcion.service";
import useQueryApi from "@hooks/useQueryApi";
import { SuscripcionEntity } from "@features/suscripcion/model/entity/suscripcion.entity";
import { FormSelect } from "@components/common/forms/FormSelect";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<PlanPostDTO>();
    const { data, isLoading } = useQueryApi<{ data: SuscripcionEntity[] }>("Suscripcion", SuscripcionApi.getSuscripcionSearch);
    const [SuscripcionOptions, setSuscripcionOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(Suscripcion => ({
                nombre: Suscripcion.nombre ?? "Seleccionar",
                value: Suscripcion.id
            }));
            setSuscripcionOptions(options);
        }
    }, [data]);
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6 mt-4">
                    <FormTextInput label={t(lang.Plan.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-4">
                    <FormTextInput label={t(lang.Plan.form.description)} name={'descripcion'} />
                </div>
                <div className="col-12 md:col-4 lg:col-4 mt-4">
                    <FormTextInput label={t(lang.Plan.form.duration)} name={'duracion'} />
                </div>
                <div className="col-12 md:col-4 lg:col-4 mt-4">
                    <FormTextInput label={t(lang.Plan.form.price)} name={'precio'} />
                </div>
                <div className="col-12 md:col-4 lg:col-4 mt-4">
                    <FormSelect
                        label={t(lang.Plan.form.subscription)}
                        name="suscripcion"
                        options={SuscripcionOptions}
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