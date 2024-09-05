import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { UsuarioPostDTO } from "@features/usuario/model/dtos/usuario.dto";
import { FormSelect } from "@components/common/forms/FormSelect";
import useQueryApi from "@hooks/useQueryApi";
import { PersonaEntity } from "@features/persona/model/entity/persona.entity";
import { PersonaApi } from "@features/persona/service/persona.service";
import { Fieldset } from "primereact/fieldset";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<UsuarioPostDTO>();
    const { data, isLoading } = useQueryApi<{ data: PersonaEntity[] }>("personas", PersonaApi.getPersonaSearch);
    const [personaOptions, setpersonaOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(persona => ({
                nombre: persona.nombre ?? "Seleccionar",
                value: persona.id
            }));
            setpersonaOptions(options);
        }
    }, [data]);
    return (
        <Form onSubmit={handleSubmit}>
            <Fieldset legend="Persona" className=" mt-3 mb-3">
                <div className="p-fluid formgrid grid mb-3">
                    <div className="col-12 md:col-6 lg:col-6 mt-2">
                        <FormSelect
                            label={t(lang.User.form.person)}
                            name="persona"
                            options={personaOptions}
                            optionLabel="nombre"
                            isLoading={isLoading}

                        />
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Datos Del Usuario" className=" mt-3 mb-3">
                <div className="p-fluid formgrid grid mb-3">
                    <div className="col-12 md:col-6 lg:col-6">
                        <FormTextInput label={t(lang.User.form.name)} name={'nombre'} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-6">
                        <FormTextInput label={t(lang.User.form.email)} name={'email'} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-6 mt-2">
                        <FormTextInput label={t(lang.User.form.password)} name={'password'} type="password" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-6 mt-2">
                        <FormTextInput label={t(lang.User.form.repeatPassword)} name={'repeatPassword'} type="password" />
                    </div>
                </div>
            </Fieldset>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;