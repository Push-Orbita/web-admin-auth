import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomBottons from "@components/common/forms/FormCustomBottons";
import { EspecieTypePostDTO } from "@features/especieType/model/dtos/especieType.dto";





const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<EspecieTypePostDTO>()


    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6  lg:col-6">
                    <FormTextInput label={t(lang.EspecieType.form.name)} name={'nombre'}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.EspecieType.form.description)} name={'descripcion'}
                    />
                </div>
            </div>
            <FormCustomBottons  />


        </Form>
    )
}

export default FormFields