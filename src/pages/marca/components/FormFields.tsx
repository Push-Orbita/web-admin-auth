import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import FormCustomBottons from "../../../common/components/forms/FormCustomBottons";
import { FormTextInput } from "../../../common/components/forms/FormTextInput";
import { lang } from "../../../langs";
import { MarcaPostDTO } from "../../../model/dtos/marca/marca.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<MarcaPostDTO>()
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid">
                <div className="field col-12">
                    <FormTextInput label={t(lang.MarcaType.form.name)} name={'nombre'}
                    />
                </div>

            </div>
            <FormCustomBottons />


        </Form>
    )
}

export default FormFields