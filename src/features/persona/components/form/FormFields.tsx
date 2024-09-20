import { GeneroOptions } from "@components/common/constantes";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormSelect } from "@components/common/forms/FormSelect";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import { PersonaPostDTO } from "@features/persona/model/dtos/persona.dto";
import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormInputMask } from "@components/common/forms/FormInputMask";

const FormFields: FC = () => {
  const { handleSubmit } = useFormikContext<PersonaPostDTO>();

  return (
    <Form onSubmit={handleSubmit}>
      <div className="p-fluid formgrid grid mb-3">
        <div className="col-12 md:col-6 lg:col-6  mt-2">
          <FormTextInput label={t(lang.Person.form.name)} name={'nombre'} />
        </div>
        <div className="col-12 md:col-6 lg:col-6 mt-2">
          <FormTextInput label={t(lang.Person.form.lastName)} name={'apellido'} />
        </div>
        <div className="col-12 md:col-6 lg:col-6 mt-2">
          <FormInputMask label={t(lang.Person.form.cuil)} name={'cuil'} mask={'99-99999999-9'} placeholder="00-00000000-0" />
        </div>
        <div className="col-12 md:col-6 lg:col-6 mt-2">
          <FormSelect label={t(lang.Person.form.gender)}
            name={'genero'}
            options={GeneroOptions}
            optionLabel="nombre"
            optionValue="value"
          />
        </div>
      </div>
      <FormCustomButtons />
    </Form>
  );
};

export default FormFields;