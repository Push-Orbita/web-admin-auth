import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { RolPostDTO } from "@features/rol/model/dtos/rol.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<RolPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Rol.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Rol.form.description)} name={'descripcion'} />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;