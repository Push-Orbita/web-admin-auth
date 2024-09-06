import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { AccionModuloPostDTO } from "@features/accion-modulo/model/dtos/accionModulo.dto";
import useQueryApi from "@hooks/useQueryApi";
import { ModuloEntity } from "@features/modulo/model/entity/modulo.entity";
import { ModuloApi } from "@features/modulo/service/modulo.service";
import { FormSelect } from "@components/common/forms/FormSelect";


const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<AccionModuloPostDTO>();
    const { data, isLoading } = useQueryApi<{ data: ModuloEntity[] }>("Modulo", ModuloApi.getModuloSearch);
    const [moduleOptions, setModuleOptions] = useState<{ nombre: string, value: number }[]>([]);

    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(module => ({
                nombre: module.nombre ?? "Seleccionar",
                value: module.id,
            }));
            setModuleOptions(options);
        }
    }, [data]);
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormSelect
                        label={t(lang.ActionModule.form.module)}
                        name="modulo"
                        options={moduleOptions}
                        optionLabel="nombre"
                        isLoading={isLoading}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.ActionModule.form.acction)} name={'accion'} />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;