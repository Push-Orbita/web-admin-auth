import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import { OrganizacionPostDTO } from "@features/organizacion/model/dtos/organizacion.dto";
import FormCustomButtons from "@components/common/forms/FormCustomBottons";
import { Fieldset } from "primereact/fieldset";


const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<OrganizacionPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <Fieldset legend="Datos de la Organización" className="col-12">
                    <div className="col-12 md:col-12 lg:col-12">
                        <FormTextInput label={t(lang.Organizacion.form.name)} name={'nombre'} />
                    </div>
                </Fieldset>

            </div>
            <Fieldset legend="Credenciales" className="col-12 mb-3">
                <div className="p-fluid formgrid grid mb-3 col-12" >
                    <div className="col-12 md:col-6 lg:col-6 mb-3">
                        <FormTextInput label={t(lang.Organizacion.form.dataBase)} name={'bd'} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-6  mb-3">
                        <FormTextInput label={t(lang.Organizacion.form.dataBaseType)} name={'tipobd'} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-6  mb-3">
                        <FormTextInput label={t(lang.Organizacion.form.user)} name={'usuario'} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-6 mb-3">
                        <FormTextInput label={t(lang.Organizacion.form.password)} name={'password'} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-6 mb-3">
                        <FormTextInput label={t(lang.Organizacion.form.host)} name={'host'} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-6 mb-3">
                        <FormTextInput label={t(lang.Organizacion.form.port)} name={'port'} />
                    </div>
                </div>
            </Fieldset>
            <FormCustomButtons />
        </Form >
    );
};

export default FormFields;