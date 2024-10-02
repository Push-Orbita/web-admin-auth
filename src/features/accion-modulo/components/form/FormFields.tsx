import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormSelect } from "@components/common/forms/FormSelect";
import { AccionModuloPostDTO } from "@features/accion-modulo/model/dtos/accionModulo.dto";
import useSelectOptions from "@hooks/useSelectOptions";
import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";


const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<AccionModuloPostDTO>();
    const { options: moduloOptions, isLoading: isLoadingModulo } = useSelectOptions("modulo");
    const { options: accionOptions, isLoading: isLoadingAccion } = useSelectOptions("accion");
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormSelect
                        label="Seleccionar Modulo"
                        name="modulo"
                        options={moduloOptions}
                        isLoading={isLoadingModulo}
                        optionLabel="nombre"
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormSelect
                        label={t(lang.ActionModule.form.acction)}
                        name="accion"
                        options={accionOptions}
                        optionLabel="nombre"
                        isLoading={isLoadingAccion}
                    />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;