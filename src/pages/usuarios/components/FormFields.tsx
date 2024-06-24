import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import FormCustomButtons from "../../../common/components/forms/FormCustomBottons";
import { FormTextInput } from "../../../common/components/forms/FormTextInput";
import { lang } from "../../../langs";
import { UsuarioPostDTO } from "../../../model/dtos/usuario/usuario.dto";

interface FormFieldsProps {
    disabled: boolean;
}

const FormFields: FC<FormFieldsProps> = ({ disabled }) => {
    const { handleSubmit } = useFormikContext<UsuarioPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6">
                    <FormTextInput
                        label={t(lang.User.form.name)}
                        name="nombre"
                        disabled={disabled}
                    />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput
                        label={t(lang.User.form.email)}
                        name="email"
                        disabled={disabled}
                    />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput
                        label={t(lang.User.form.password)}
                        name="password"
                        type="password"
                        disabled={disabled}
                    />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput
                        label={t(lang.User.form.repeatPassword)}
                        name="repeatPassword"
                        type="password"
                        disabled={disabled}
                    />
                </div>
            </div>
            <FormCustomButtons disabled={disabled} />
        </Form>
    );
}

export default FormFields;
