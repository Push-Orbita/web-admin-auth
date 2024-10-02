import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormSelect } from "@components/common/forms/FormSelect";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import { PlanPostDTO } from "@features/plan/model/dtos/plan.dto";
import useSelectOptions from "@hooks/useSelectOptions";
import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<PlanPostDTO>();
    const { options: suscripcionOptions, isLoading: isLoadingSuscripcion } = useSelectOptions("suscripcion");

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
                        options={suscripcionOptions}
                        optionLabel="nombre"
                        isLoading={isLoadingSuscripcion}
                    />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;