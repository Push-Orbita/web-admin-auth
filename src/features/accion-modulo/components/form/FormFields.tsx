import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormSelect } from "@components/common/forms/FormSelect";
import { AccionModuloPostDTO } from "@features/accion-modulo/model/dtos/accionModulo.dto";
import { AccionEntity } from "@features/accion/model/entity/accion.entity";
import { AccionApi } from "@features/accion/service/accion.service";
import { ModuloEntity } from "@features/modulo/model/entity/modulo.entity";
import { ModuloApi } from "@features/modulo/service/modulo.service";
import useQueryApi from "@hooks/useQueryApi";
import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";


const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<AccionModuloPostDTO>();
    const { data, isLoading } = useQueryApi<{ data: ModuloEntity[] }>("Modulo", ModuloApi.getModuloSearch);
    const [moduleOptions, setModuleOptions] = useState<{ nombre: string, value: number }[]>([]);
    const [accionOptions, setAccionOptions] = useState<{ nombre: string, value: number }[]>([]);
    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(module => ({
                nombre: module.nombre ?? "Seleccionar",
                value: module.id,
            }));
            setModuleOptions(options);
        }
    }, [data]);

    const { data: accionData, isLoading: accionIsLoading } = useQueryApi<{ data: AccionEntity[] }>("Accion", AccionApi.getAccionSearch);
    useEffect(() => {
        if (accionData?.data) {
            const options = accionData.data.map(accion => ({
                nombre: accion.nombre ?? "Seleccionar",
                value: accion.id,
            }));
            setAccionOptions(options);
        }
    }, [accionData]);
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
                    <FormSelect
                        label={t(lang.ActionModule.form.acction)}
                        name="accion"
                        options={accionOptions}
                        optionLabel="nombre"
                        isLoading={accionIsLoading}
                    />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;