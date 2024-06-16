import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import FormCustomButtons from "../../../common/components/forms/FormCustomBottons";
import { FormTextInput } from "../../../common/components/forms/FormTextInput";
import { lang } from "../../../langs";
import { UsuarioPostDTO } from "../../../model/dtos/usuario/usuario.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<UsuarioPostDTO>()

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.User.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.User.form.email)} name={'email'} />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.User.form.password)} name={'password'} type="password"/>
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.User.form.repeatPassword)} name={'repeatPassword'} type="password"/>
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    )
}

export default FormFields