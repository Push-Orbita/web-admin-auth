import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { PermisosPostDTO } from "@features/permisos/model/dtos/permisos.dto";
import useQueryApi from "@hooks/useQueryApi";
import { UsuarioEntity } from "@features/usuario/model/entity/usuario.entity";
import { UsuarioApi } from "@features/usuario/service/usuario.service";
import { FormSelect } from "@components/common/forms/FormSelect";
import { SistemaEntity } from "@features/sistema/model/entity/sistema.entity";
import { SistemaApi } from "@features/sistema/service/sistema.service";
import { OrganizacionEntity } from "@features/organizacion/model/entity/organizacion.entity";
import { OrganizacionApi } from "@features/organizacion/service/organizacion.service";
import { RolEntity } from "@features/rol/model/entity/rol.entity";
import { RolApi } from "@features/rol/service/rol.service";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<PermisosPostDTO>();
    const { data: usuarioData, isLoading: usuarioIsLoading } = useQueryApi<{ data: UsuarioEntity[] }>("Usuario", UsuarioApi.getUsuarioSearch);
    const [usuarioOptions, setUsuarioOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (usuarioData?.data) {
            const options = usuarioData.data.map(usuario => ({
                nombre: usuario.nombre ?? "Seleccionar",
                value: usuario.id
            }));
            setUsuarioOptions(options);
        }
    }, [usuarioData]);

    const { data: sistemaData, isLoading: sistemaIsLoading } = useQueryApi<{ data: SistemaEntity[] }>("Sistema", SistemaApi.getSistemaSearch);
    const [sistemaOptions, setSistemaOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (sistemaData?.data) {
            const options = sistemaData.data.map(sistema => ({
                nombre: sistema.nombre ?? "Seleccionar",
                value: sistema.id
            }));
            setSistemaOptions(options);
        }
    }, [sistemaData]);

    const { data: organizacionData, isLoading: organizacionIsLoading } = useQueryApi<{ data: OrganizacionEntity[] }>("Organizacion", OrganizacionApi.getOrganizacionSearch);
    const [organizacionOptions, setOrganizacionOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (organizacionData?.data) {
            const options = organizacionData.data.map(organizacion => ({
                nombre: organizacion.nombre ?? "Seleccionar",
                value: organizacion.id
            }));
            setOrganizacionOptions(options);
        }
    }, [organizacionData]);

    const { data: rolData, isLoading: rolIsLoading } = useQueryApi<{ data: RolEntity[] }>("Rol", RolApi.getRolSearch);
    const [rolOptions, setRolOptions] = useState<{ nombre: string; value: number; }[]>([]);

    useEffect(() => {
        if (rolData?.data) {
            const options = rolData.data.map(rol => ({
                nombre: rol.nombre ?? "Seleccionar",
                value: rol.id
            }));
            setRolOptions(options);
        }
    }, [rolData]);

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormSelect
                        label={t(lang.Permissions.form.user)}
                        name="usuario"
                        options={usuarioOptions}
                        optionLabel="nombre"
                        isLoading={usuarioIsLoading}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormSelect
                        label={t(lang.Permissions.form.organization)}
                        name="organizacion"
                        options={organizacionOptions}
                        optionLabel="nombre"
                        isLoading={organizacionIsLoading}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormSelect
                        label={t(lang.Permissions.form.system)}
                        name="sistema"
                        options={sistemaOptions}
                        optionLabel="nombre"
                        isLoading={sistemaIsLoading}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormSelect
                        label={t(lang.Permissions.form.rol)}
                        name="rol"
                        options={rolOptions}
                        optionLabel="nombre"
                        isLoading={rolIsLoading}
                    />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;