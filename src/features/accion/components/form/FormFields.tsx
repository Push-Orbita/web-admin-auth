import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { AccionPostDTO } from "@features/accion/model/dtos/accion.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<AccionPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Action.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Action.form.description)} name={'descripcion'} />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;