import { Form, FieldArray, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { ModuloPostDTO } from "@features/modulo/model/dtos/modulo.dto";
import { Button } from "primereact/button";

interface FormFieldsProps {
    isEditMode: boolean;
}

const FormFields: FC<FormFieldsProps> = ({ isEditMode }) => {
    const { handleSubmit, values } = useFormikContext<ModuloPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                {/* Campo único para "sistema" */}
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput 
                        label={t(lang.Module.form.system)} 
                        name={'sistema'} 
                    />
                </div>

                <FieldArray name="body">
                    {({ remove, push }) => (
                        <>
                            {values.body.map((_, index) => (
                                <div key={index} className="col-12 grid mt-4">
                                    <div className="col-12 md:col-6 lg:col-6">
                                        <FormTextInput label={t(lang.Module.form.name)} name={`body[${index}].nombre`} />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-6">
                                        <FormTextInput label={t(lang.Module.form.descripcion)} name={`body[${index}].descripcion`} />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-6">
                                        <FormTextInput label={t(lang.Module.form.parentModule)} name={`body[${index}].moduloPadre`} />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-6">
                                        <FormTextInput label={t(lang.Module.form.label)} name={`body[${index}].label`} />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-6">
                                        <FormTextInput label={t(lang.Module.form.element)} name={`body[${index}].element`} />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-6">
                                        <FormTextInput label={t(lang.Module.form.icon)} name={`body[${index}].icon`} />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-6">
                                        <FormTextInput label={t(lang.Module.form.path)} name={`body[${index}].path`} />
                                    </div>
                                    {!isEditMode && (
                                        <div className="col-2 flex align-items-center justify-content-start mt-3">
                                            <Button
                                                type="button"
                                                // label={t(lang.common.actions.remove)}
                                                icon="pi pi-trash"
                                                className="p-button-danger "
                                                onClick={() => remove(index)}
                                                disabled={index === 0 && values.body.length === 1} // Evita eliminar el último campo
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {!isEditMode && (
                                <div className="col-2 flex align-items-center justify-content-start mt-3">
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
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;
