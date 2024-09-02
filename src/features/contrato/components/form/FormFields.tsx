import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormDatePicker } from "@components/common/forms/FormDatePicker";
import { FormSelect } from "@components/common/forms/FormSelect";
import { ContratoPostDTO } from "@features/contrato/model/dtos/contrato.dto";
import { OrganizacionEntity } from "@features/organizacion/model/entity/organizacion.entity";
import { OrganizacionApi } from "@features/organizacion/service/organizacion.service";
import { PlanEntity } from "@features/plan/model/entity/plan.entity";
import { PlanApi } from "@features/plan/service/plan.service";
import useQueryApi from "@hooks/useQueryApi";
import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";

interface Ioptions {
    nombre?: string,
    value?: number
}

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<ContratoPostDTO>();

    const { data, isLoading } = useQueryApi<{ data: PlanEntity[] }>("Plan", PlanApi.getPlanSearch);
    const [planOptions, setPlanOptions] = useState<{ nombre: string, value: number, duracion: number }[]>([]);

    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(plan => ({
                nombre: plan.nombre ?? "Seleccionar",
                value: plan.id,
                duracion: plan.duracion,
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

    const handlePlanSelection = (
        selectedOption: any,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
        if (selectedOption) {
            // Se setea el id seleciconado del plan
            setFieldValue('plan', selectedOption.value);
            // Calculo de fecha de expiracion
            const currentDate = new Date();
            const expirationDate = new Date();
            expirationDate.setDate(currentDate.getDate() + selectedOption.duracion);
            // Se actualiza la fecha de vencimiento en el formik y esto lo modifica en el input
            setFieldValue('fechaVencimiento', expirationDate);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-4 lg:col-4 mt-4">
                    <FormSelect
                        label={t(lang.Contract.form.plan)}
                        name="plan"
                        options={planOptions}
                        optionLabel="nombre"
                        isLoading={isLoading}
                        onOptionSelect={(selectedOption: any, setFieldValue: any) => {
                            handlePlanSelection(selectedOption, setFieldValue);
                        }}
                    />
                </div>
                <div className="col-12 md:col-4 lg:col-4 mt-4">
                    <FormDatePicker
                        label={t(lang.Contract.form.expireDate)}
                        name="fechaVencimiento"
                        disabled={true}
                    />
                </div>
                <div className="col-12 md:col-4 lg:col-4 mt-4">
                    <FormSelect
                        label={t(lang.Contract.form.organization)}
                        name="organizacion"
                        options={organizacionOptions}
                        optionLabel="nombre"
                        isLoading={isLoadingOrganizacion}
                    />
                </div>
               
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;
