
import { FormDatePicker } from "@components/common/forms/FormDatePicker";
import { FormSelect } from "@components/common/forms/FormSelect";
import { ContratoPostDTO } from "@features/contrato/model/dtos/contrato.dto";
import useSelectOptions from "@hooks/useSelectOptions";
import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<ContratoPostDTO>();

    const handlePlanSelection = (
        selectedOption: any,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
        if (selectedOption) {
            setFieldValue('plan', selectedOption.value); // Actualiza el plan seleccionado
            const currentDate = new Date();
            const expirationDate = new Date();
            expirationDate.setDate(currentDate.getDate() + selectedOption.duracion); // Calcula la fecha de vencimiento
            setFieldValue('fechaVencimiento', expirationDate); // Actualiza la fecha de vencimiento en Formik
        }
    };

    const { options: planOptions, isLoading: isLoadingPlan } = useSelectOptions("plan");
    const { options: organizacionOptions, isLoading: isLoadingOrganizacion } = useSelectOptions("organizacion");

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-4 lg:col-4 mt-4">
                    <FormSelect
                        label={t(lang.Contract.form.plan)}
                        name="plan"
                        options={planOptions}
                        optionLabel="nombre"
                        isLoading={isLoadingPlan}
                        onOptionSelect={handlePlanSelection} // Pasa la función para manejar la selección
                    />
                </div>
                <div className="col-12 md:col-4 lg:col-4 mt-4">
                    <FormDatePicker
                        label={t(lang.Contract.form.expireDate)}
                        name="fechaVencimiento"
                        disabled={true} // Este campo se llena automáticamente al seleccionar un plan
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
