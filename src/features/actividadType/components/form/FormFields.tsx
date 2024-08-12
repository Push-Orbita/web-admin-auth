import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomBottons from "@components/common/forms/FormCustomBottons";
import { ActividadTypePostDTO } from "@features/actividadType/model/dtos/actividadType.dto";




const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<ActividadTypePostDTO>()


    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6  lg:col-6">
                    <FormTextInput label={t(lang.ActividadType.form.name)} name={'nombre'}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.ActividadType.form.description)} name={'descripcion'}
                    />
                </div>
            </div>
            <FormCustomBottons  />


        </Form>
    )
}

export default FormFields