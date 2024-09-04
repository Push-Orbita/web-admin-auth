import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { UsuarioPostDTO } from "@features/usuario/model/dtos/usuario.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<UsuarioPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.User.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.User.form.email)} name={'email'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormTextInput label={t(lang.User.form.password)} name={'password'} type="password"/>
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormTextInput label={t(lang.User.form.repeatPassword)} name={'repeatPassword'} type="password" />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormTextInput label={t(lang.User.form.person)} name={'persona'} />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;