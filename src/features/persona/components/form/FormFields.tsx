import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { PersonaPostDTO } from "@features/persona/model/dtos/persona.dto";
import { FormSelect } from "@components/common/forms/FormSelect";
import { GeneroOptions } from "@components/common/constantes";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<PersonaPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Person.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 ">
                    <FormTextInput label={t(lang.Person.form.lastName)} name={'apellido'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-4">
                    <FormTextInput type="number" label={t(lang.Person.form.cuil)} name={'cuil'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-4">
                    <FormSelect
                        label={t(lang.Person.form.gender)}
                        name="genero"
                        options={GeneroOptions}
                        optionLabel="nombre"
                        isLoading={false}
                    />

                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;