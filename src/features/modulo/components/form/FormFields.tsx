import { iconOptions } from "@components/common/constantes";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormSelect } from "@components/common/forms/FormSelect";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import { ModuloPostDTO } from "@features/modulo/model/dtos/modulo.dto";
import useSelectOptions from "@hooks/useSelectOptions";
import { FieldArray, Form, useFormikContext } from "formik";
import { t } from "i18next";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Fieldset } from "primereact/fieldset";
import { FC } from "react";
import { lang } from "../../../../langs";

interface FormFieldsProps {
    isEditMode: boolean;
}

const FormFields: FC<FormFieldsProps> = ({ isEditMode }) => {
    const { handleSubmit, values } = useFormikContext<ModuloPostDTO>();

    const { options: sistemaOptions, isLoading: isLoadingSistema } = useSelectOptions("sistema");
    const { options: moduloOptions, isLoading: isLoadingModulo } = useSelectOptions("modulo");
    return (
        <Form onSubmit={handleSubmit}>
            <Fieldset legend="Sistema" className=" mt-3 mb-3">
                <div className="p-fluid formgrid grid mb-3">
                    <div className="col-12 md:col-6 lg:col-6">
                        <FormSelect
                            label={t(lang.Module.form.system)}
                            name="sistema"
                            options={sistemaOptions}
                            optionLabel="nombre"
                            isLoading={isLoadingSistema}

                        />
                    </div>
                </div>
            </Fieldset>
            <Fieldset legend="Datos de los Modulos" className=" mt-3 mb-3">
                <div className="p-fluid formgrid grid mb-3">
                    <FieldArray name="body">
                        {({ remove, push }) => (
                            <>
                                {values.body.map((_, index) => (
                                    <div key={index} className="col-12 grid mt-4">
                                        <div className="col-12 md:col-6 lg:col-6 mt-2">
                                            <FormTextInput label={t(lang.Module.form.name)} name={`body[${index}].nombre`} />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-6 mt-2">
                                            <FormTextInput label={t(lang.Module.form.descripcion)} name={`body[${index}].descripcion`} />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-6 mt-2">
                                            <FormSelect
                                                label={t(lang.Module.form.parentModule)}
                                                name={`body[${index}].moduloPadre`}
                                                options={moduloOptions}
                                                optionLabel="nombre"
                                                isLoading={isLoadingModulo}
                                            />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-6 mt-2">
                                            <FormTextInput label={t(lang.Module.form.label)} name={`body[${index}].label`} />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-6 mt-2">
                                            <FormTextInput label={t(lang.Module.form.element)} name={`body[${index}].element`} />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-6 mt-2">
                                            <FormSelect
                                                label={t(lang.Module.form.icon)}
                                                name={`body[${index}].icon`}
                                                options={iconOptions}
                                                optionLabel="nombre"
                                                isLoading={false}

                                            />

                                        </div>
                                        <div className="col-12 md:col-6 lg:col-6 mt-2">
                                            <FormTextInput label={t(lang.Module.form.path)} name={`body[${index}].path`} />
                                        </div>
                                        {!isEditMode && (
                                            <div className="col-12 md:col-6 lg:col-2 xl:col-2 flex align-items-center justify-content-start mt-3">
                                                <Button
                                                    type="button"
                                                    label={t(lang.common.actions.remove)}
                                                    icon="pi pi-trash"
                                                    className="p-button-danger "
                                                    onClick={() => remove(index)}
                                                    disabled={index === 0 && values.body.length === 1}
                                                />
                                            </div>
                                        )}
                                        <Divider type="solid" />
                                    </div>
                                ))}
                                {!isEditMode && (
                                    <div className="col-12 md:col-6 lg:col-2 xl:col-2 flex align-items-center justify-content-start mt-3">
                                        <Button
                                            type="button"
                                            label={t(lang.common.actions.add)}
                                            icon="pi pi-plus-circle"
                                            className="p-button-success "
                                            onClick={() => push({
                                                nombre: '',
                                                descripcion: '',
                                                element: '',
                                                icon: '',
                                                label: '',
                                                moduloPadre: 0,
                                                path: '',
                                            })}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </FieldArray>
                </div>
            </Fieldset>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;
