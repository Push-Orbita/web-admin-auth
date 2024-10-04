import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormSelect } from "@components/common/forms/FormSelect";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import { SuscripcionPostDTO } from "@features/suscripcion/model/dtos/suscripcion.dto";
import useSelectOptions from "@hooks/useSelectOptions";
import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<SuscripcionPostDTO>();
    const { options: sistemaOptions, isLoading: isLoadingSistema } = useSelectOptions("sistema");
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
                        isLoading={isLoadingSistema}

                    />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;