import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";
import useQueryApi from "../../../../hooks/useQueryApi";
import { RazaTypePostDTO } from "@features/razaType/model/dtos/razaType.dto";
import { EspecieTypeEntity } from "@features/especieType/model/entity/especieType.entity";
import { EspecieTypeApi } from "@features/especieType/service/especieType.service";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import { FormSelect } from "@components/common/forms/FormSelect";
import FormCustomBottons from "@components/common/forms/FormCustomBottons";


const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<RazaTypePostDTO>()
    const { data, isLoading } = useQueryApi<{ data: EspecieTypeEntity[] }>("especietype", EspecieTypeApi.getEspecieTypeSearch);
    const [especieTypeOption, setEspecieTypeOption] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(especieType => ({
                nombre: especieType.nombre ?? "Sin nombre",
                value: especieType.id
            }));
            setEspecieTypeOption(options);
        }
    }, [data]);
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-4">
                    <FormTextInput label={t(lang.EspecieType.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <FormTextInput label={t(lang.EspecieType.form.description)} name={'descripcion'} />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <FormSelect
                        label="Especie"
                        name="especie"
                        options={especieTypeOption}
                        optionLabel="nombre"
                        loading={isLoading}

                    />
                </div>
            </div>
            <FormCustomBottons />
        </Form>
    )
}

export default FormFields