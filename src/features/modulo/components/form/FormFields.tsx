import { Form, FieldArray, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { ModuloPostDTO } from "@features/modulo/model/dtos/modulo.dto";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { Divider } from "primereact/divider";
import useQueryApi from "@hooks/useQueryApi";
import { SistemaEntity } from "@features/sistema/model/entity/sistema.entity";
import { SistemaApi } from "@features/sistema/service/sistema.service";
import { FormSelect } from "@components/common/forms/FormSelect";
import { iconOptions } from "@components/common/constantes";
import { ModuloEntity } from "@features/modulo/model/entity/modulo.entity";
import { ModuloApi } from "@features/modulo/service/modulo.service";

interface FormFieldsProps {
    isEditMode: boolean;
}

const FormFields: FC<FormFieldsProps> = ({ isEditMode }) => {
    const { handleSubmit, values } = useFormikContext<ModuloPostDTO>();
    const { data, isLoading } = useQueryApi<{ data: SistemaEntity[] }>("sistema", SistemaApi.getSistemaSearch);
    const [sistemaOptions, setSistemaOptions] = useState<{ nombre: string; value: number; }[]>([]);
    const [moduloOptions, setModuloOptions] = useState<{ nombre: string; value: number; }[]>([]);
    useEffect(() => {
        if (data?.data) {
            const options = data.data.map(persona => ({
                nombre: persona.nombre ?? "Seleccionar",
                value: persona.id
            }));
            setSistemaOptions(options);
        }
    }, [data]);

    const { data: moduloData, isLoading: moduloIsLoading } = useQueryApi<{ data: ModuloEntity[] }>("modulo", ModuloApi.getModuloSearch);
    useEffect(() => {
        if (moduloData?.data) {
            const options = moduloData.data.map(modulo => ({
                nombre: modulo.nombre ?? "Seleccionar",
                value: modulo.id
            }));
            setModuloOptions(options);
        }
    }, [moduloData]);
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
                            isLoading={isLoading}

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
                                                isLoading={moduloIsLoading}
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
                                                isLoading={isLoading}

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
