import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import FormCustomBottons from "../../../common/components/forms/FormCustomBottons";
import { FormTextInput } from "../../../common/components/forms/FormTextInput";
import { lang } from "../../../langs";
import { PresentacionPostDTO } from "../../../model/dtos/presentacion/presentacion.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<PresentacionPostDTO>()
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 mb-2">
                    <FormTextInput label={t(lang.Organization.form.name)} name={'nombre'}
                    />
                </div>
                <div className="col-12 md:col-6 mb-2">
                    <FormTextInput label={t(lang.Organization.form.dataBase)} name={'bd'}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4  mb-2">
                    <FormTextInput label={t(lang.Organization.form.host)} name={'host'}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4  mb-2">
                    <FormTextInput label={t(lang.Organization.form.port)} name={'port'}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4  mb-2">
                    <FormTextInput label={t(lang.Organization.form.tipoBD)} name={'tipobd'}
                    />
                </div>
                <div className="col-12 md:col-6  mb-2">
                    <FormTextInput label={t(lang.Organization.form.user)} name={'usuario'}
                    />
                </div>
                <div className="col-12 md:col-6  mb-2">
                    <FormTextInput label={t(lang.Organization.form.password)} name={'password'} type="password"
                    />
                </div>

            </div>
            <FormCustomBottons />


        </Form>
    )
}

export default FormFields