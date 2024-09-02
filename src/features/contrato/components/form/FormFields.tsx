import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { ContratoPostDTO } from "@features/contrato/model/dtos/contrato.dto";
import { FormDatePicker } from "@components/common/forms/FormDatePicker";
import useQueryApi from "@hooks/useQueryApi";
import { PlanEntity } from "@features/plan/model/entity/plan.entity";
import { PlanApi } from "@features/plan/service/plan.service";
import { FormSelect } from "@components/common/forms/FormSelect";
import { OrganizacionEntity } from "@features/organizacion/model/entity/organizacion.entity";
import { OrganizacionApi } from "@features/organizacion/service/organizacion.service";
interface Ioptions {
    nombre?: string,
    value?: number
}
const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<ContratoPostDTO>();
    const { data, isLoading } = useQueryApi<{ data: PlanEntity[] }>("Plan", PlanApi.getPlanSearch);
    const [PlanOptions, setPlanOptions] = useState<Ioptions[]>([]);

    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(Plan => ({
                nombre: Plan.nombre ?? "Seleccionar",
                value: Plan.id
            }));
            setPlanOptions(options);
        }
    }, [data]);

    const { data: organizacionData, isLoading: isLoadingOrganizacion } = useQueryApi<{ data: OrganizacionEntity[] }>("Organizacion", OrganizacionApi.getOrganizacionSearch);
    const [organizacionOptions, setOrganizacionOption] = useState<Ioptions[]>([]);

    useEffect(() => {
        if (organizacionData?.data) {
            const options = organizacionData.data.map(organizacion => ({
                nombre: organizacion.nombre,
                value: organizacion.id
            }));
            setOrganizacionOption(options);
        }
    }, [organizacionData]);
    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6 mt-4">
                    <FormSelect
                        label={t(lang.Contract.form.plan)}
                        name="plan"
                        options={PlanOptions}
                        optionLabel="nombre"
                        isLoading={isLoading}

                    />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-4">
                    <FormSelect
                        label={t(lang.Contract.form.organization)}
                        name="organizacion"
                        options={organizacionOptions}
                        optionLabel="nombre"
                        isLoading={isLoadingOrganizacion}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-4">
                    <FormDatePicker
                        label={t(lang.Contract.form.expireDate)} name={'fechaVencimiento'} />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;