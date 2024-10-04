import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormSelect } from "@components/common/forms/FormSelect";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import { ModuloEntity } from "@features/modulo/model/entity/modulo.entity";
import { ModuloApi } from "@features/modulo/service/modulo.service";
import { SistemaEntity } from "@features/sistema/model/entity/sistema.entity";
import { SistemaApi } from "@features/sistema/service/sistema.service";
import { AccionModuloApi } from "@features/accion-modulo/service/accionModulo.service";
import useQueryApi from "@hooks/useQueryApi";
import { Form, FormikProps, useFormikContext } from "formik";
import { t } from "i18next";
import { Fieldset } from "primereact/fieldset";
import { PickList } from 'primereact/picklist';
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";
import { AccionModuloEntity } from "@features/accion-modulo/model/entity/accionModulo.entity";

interface Ioptions {
    nombre?: string;
    value?: number;
}

interface ActionItem {
    id: number;
    nombre: string;
    descripcion: string;
    moduloNombre: string; // Nuevo campo para almacenar el nombre del módulo
}


interface FormFieldsProps {
    setFieldValue: FormikProps<any>['setFieldValue'];
}

const FormFields: FC<FormFieldsProps> = ({ setFieldValue }) => {
    const { handleSubmit, values } = useFormikContext<any>();
    const { data: sistemaData, isLoading: isLoadingSistema } = useQueryApi<{ data: SistemaEntity[] }>("Sistema", SistemaApi.getSistemaSearch);
    const [sistemaOptions, setSistemaOption] = useState<Ioptions[]>([]);
    const [moduloOptions, setModuloOptions] = useState<Ioptions[]>([]);
    const [accionesDisponibles, setAccionesDisponibles] = useState<ActionItem[]>([]);

    useEffect(() => {
        if (sistemaData?.data) {
            const options = sistemaData.data.map(sistema => ({
                nombre: sistema.nombre,
                value: sistema.id
            }));
            setSistemaOption(options);
        }
    }, [sistemaData]);

    const { data: moduloData, refetch: refetchModulo } = useQueryApi<{ data: ModuloEntity[] }>(
        `Modulo-${values.sistema}`,
        () => ModuloApi.getModuloBySystemId(values.sistema!),
        undefined,
        {
            enabled: !!values.sistema,
            refetchOnWindowFocus: false
        }
    );

    useEffect(() => {
        if (values.sistema) {
            setModuloOptions([]);
            setAccionesDisponibles([]);
            setFieldValue('modulo', undefined);
            setFieldValue('accionesSeleccionadas', []);
            refetchModulo();
        }
    }, [values.sistema, refetchModulo, setFieldValue]);

    useEffect(() => {
        if (moduloData?.data) {
            const options = moduloData.data.map(modulo => ({
                nombre: modulo.nombre,
                value: modulo.id
            }));
            setModuloOptions(options);
        }
    }, [moduloData]);

    const { data: accionesData, refetch: refetchAcciones } = useQueryApi<{ data: AccionModuloEntity[] }>(
        `Acciones-${values.modulo}`,
        () => AccionModuloApi.getAccionModuloByModuloId(values.modulo!),
        undefined,
        {
            enabled: false,
            refetchOnWindowFocus: false
        }
    );

    useEffect(() => {
        if (accionesData?.data && moduloOptions.length > 0) {
            const acciones = accionesData.data.map(item => {
                const modulo = moduloOptions.find(m => m.value === values.modulo);
                return {
                    id: item.id,
                    nombre: item.accion.nombre,
                    descripcion: item.accion.descripcion,
                    moduloNombre: modulo ? modulo.nombre : ''
                };
            });
            setAccionesDisponibles(acciones.map(accion => ({
                ...accion,
                moduloNombre: accion.moduloNombre || ''
            })));
        }
    }, [accionesData, moduloOptions, values.modulo]);

    useEffect(() => {
        if (values.modulo) {
            refetchAcciones();
        }
    }, [values.modulo, refetchAcciones]);

    const onPickListChange = (event: any) => {
        setFieldValue('accionesSeleccionadas', event.target);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Rol.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Rol.form.description)} name={'descripcion'} />
                </div>
            </div>
            <Fieldset legend="Permisos">
                <div className="p-fluid formgrid grid mb-3">
                    <div className="col-12 md:col-6 lg:col-12 mt-2 mb-4">
                        <FormSelect
                            label={t(lang.Rol.form.system)}
                            name={'sistema'}
                            options={sistemaOptions}
                            optionLabel="nombre"
                            optionValue="value"
                            disabled={isLoadingSistema}
                        />
                    </div>
                    <div className="col-12 md:col-6 lg:col-6 mt-2 mb-4">
                        <FormSelect
                            label="Módulo"
                            name={'modulo'}
                            options={moduloOptions}
                            optionLabel="nombre"
                            optionValue="value"
                            disabled={!values.sistema}
                        />
                    </div>
                    <div className="col-12 mt-2">
                        <PickList
                            dataKey="id"
                            source={accionesDisponibles.filter(accion =>
                                !values.accionesSeleccionadas.some((seleccionada: any) => seleccionada.id === accion.id)
                            )}
                            target={values.accionesSeleccionadas}
                            itemTemplate={(item) => (
                                <div>
                                    <p><strong>{item.nombre}</strong> <em>({item.moduloNombre})</em></p>
                                    <p>{item.descripcion}</p>
                                </div>
                            )}
                            sourceHeader="Acciones Disponibles"
                            targetHeader="Acciones Seleccionadas"
                            sourceStyle={{ height: '300px' }}
                            targetStyle={{ height: '300px' }}
                            onChange={onPickListChange}
                            filterBy="nombre"
                        />
                    </div>
                </div>
            </Fieldset>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;
