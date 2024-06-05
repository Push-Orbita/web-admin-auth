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
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.System.form.name)} name={'nombre'}
                    />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.System.form.description)} name={'descripcion'}
                    />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.System.form.url)} name={'url'}
                    />
                </div>
                <div className="col-12 md:col-6">
                    <FormTextInput label={t(lang.System.form.icono)} name={'icono'}
                    />
                </div>
            </div>
            <FormCustomBottons />


        </Form>
    )
}

export default FormFields