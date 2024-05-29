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
            <div className="p-fluid formgrid grid">
                <div className="field col-12">
                    <FormTextInput label={t(lang.PresentacionType.form.name)} name={'nombre'}
                    />    <FormTextInput label={t(lang.PresentacionType.form.acronym)} name={'siglas'}
                    /> 
                </div>

            </div>
            <FormCustomBottons />


        </Form>
    )
}

export default FormFields