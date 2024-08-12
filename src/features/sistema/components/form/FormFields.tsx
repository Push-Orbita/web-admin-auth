import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { SistemaPostDTO } from "@features/sistema/model/dtos/sistema.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<SistemaPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6 mb-3">
                    <FormTextInput label={t(lang.Sistema.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mb-3">
                    <FormTextInput label={t(lang.Sistema.form.description)} name={'descripcion'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mb-3">
                    <FormTextInput label={t(lang.Sistema.form.url)} name={'url'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mb-3">
                    <FormTextInput label={t(lang.Sistema.form.icon)} name={'icono'} />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;