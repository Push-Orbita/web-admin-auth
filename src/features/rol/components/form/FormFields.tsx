import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormSelect } from "@components/common/forms/FormSelect";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import { ModuloEntity } from "@features/modulo/model/entity/modulo.entity";
import { ModuloApi } from "@features/modulo/service/modulo.service";
import { SistemaEntity } from "@features/sistema/model/entity/sistema.entity";
import { SistemaApi } from "@features/sistema/service/sistema.service";
import useQueryApi from "@hooks/useQueryApi";
import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { Fieldset } from "primereact/fieldset";
import { PickList } from 'primereact/picklist';
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";

interface Ioptions {
    nombre?: string,
    value?: number
}

interface ModuleItem {
    modulo: ModuloEntity;
    sistemaNombre: string;
}

const FormFields: FC = () => {
    const { handleSubmit, values, setFieldValue } = useFormikContext<any>();
    const { data: sistemaData, isLoading: isLoadingSistema } = useQueryApi<{ data: SistemaEntity[] }>("Sistema", SistemaApi.getSistemaSearch);
    const [sistemaOptions, setSistemaOption] = useState<Ioptions[]>([]);

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

    const [sourceModules, setSourceModules] = useState<ModuleItem[]>([]);
    const [targetModules, setTargetModules] = useState<ModuleItem[]>([]);

    useEffect(() => {
        if (values.sistema) {
            refetchModulo();
            // Limpiar los módulos seleccionados cuando cambia el sistema
            setTargetModules([]);
            setFieldValue('modulosSeleccionados', []);
        }
    }, [values.sistema, refetchModulo, setFieldValue]);

    useEffect(() => {
        if (moduloData?.data) {
            const newSourceModules = moduloData.data.map(modulo => ({
                modulo,
                sistemaNombre: sistemaOptions.find(s => s.value === values.sistema)?.nombre || ''
            }));
            setSourceModules(newSourceModules);
        }
    }, [moduloData, sistemaOptions, values.sistema]);

    const onChangeModules = (event: { source: ModuleItem[], target: ModuleItem[] }) => {
        setSourceModules(event.source);
        setTargetModules(event.target);
        // Actualizar el valor en Formik
        setFieldValue('modulosSeleccionados', event.target.map(item => item.modulo.id));
    };

    const moduleItemTemplate = (item: ModuleItem) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.modulo.nombre}</span>
                    <div className="flex align-items-center gap-2">
                        <span>{item.sistemaNombre}</span>
                    </div>
                </div>
            </div>
        );
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
                    <div className="col-12 md:col-12 lg:col-12 mt-2 mb-4">
                        <FormSelect
                            label={t(lang.Rol.form.system)}
                            name={'sistema'}
                            options={sistemaOptions}
                            optionLabel="nombre"
                            optionValue="value"
                            disabled={isLoadingSistema}
                        />
                    </div>
                    <div className="col-12 mt-2">
                        <PickList
                            source={sourceModules}
                            target={targetModules}
                            dataKey="modulo.id"
                            onChange={onChangeModules}
                            itemTemplate={moduleItemTemplate}
                            filter
                            filterBy="modulo.nombre,sistemaNombre"
                            breakpoint="1400px"
                            sourceHeader="Módulos Disponibles"
                            targetHeader="Módulos Seleccionados"
                            sourceStyle={{ height: '30rem' }}
                            targetStyle={{ height: '30rem' }}
                        />
                    </div>
                </div>
            </Fieldset>

            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;
