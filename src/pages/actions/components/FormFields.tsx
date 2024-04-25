import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import FormCustomBottons from "../../../common/components/forms/FormCustomBottons";
import { FormTextInput } from "../../../common/components/forms/FormTextInput";
import { lang } from "../../../langs";
import { ActionsPostDTO } from "../../../model/dtos/actions/actions.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<ActionsPostDTO>()
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-6">
                    <FormTextInput label={t(lang.ActionsType.form.name)} name={'nombre'}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <FormTextInput label={t(lang.ActionsType.form.description)} name={'descripcion'}
                    />
                </div>
            </div>
            <FormCustomBottons />


        </Form>
    )
}

export default FormFields