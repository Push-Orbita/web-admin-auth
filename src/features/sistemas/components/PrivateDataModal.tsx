import { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { SistemasApi } from '../service/sistemas.service';
import { toast } from 'react-hot-toast';
import { usePermisos } from '@hooks/usePermisos';
import { TYPEBDOptions } from '@config/constants/typeBD';
import { FormTextInput } from '@components/common/forms/FormTextInput';
import { FormSelect } from '@components/common/forms/FormSelect';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

interface Props {
    visible: boolean;
    onHide: () => void;
    sistemaId: number;
}

interface PrivateData {
    id: number;
    host: string;
    port: string;
    usuario: string;
    passwordbd: string;
    tipobd: string;
}

const validationSchema = Yup.object().shape({
    host: Yup.string().required('El host es requerido'),
    port: Yup.string().required('El puerto es requerido'),
    usuario: Yup.string().required('El usuario es requerido'),
    passwordbd: Yup.string().required('La contraseña es requerida'),
    tipobd: Yup.string().required('El tipo de BD es requerido')
});

export const PrivateDataModal = ({ visible, onHide, sistemaId }: Props) => {
    const [loading, setLoading] = useState(false);
    const [privateData, setPrivateData] = useState<PrivateData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { puedeEditarCredenciales } = usePermisos();
    const formikRef = useRef<any>(null);

    const handleInitialSubmit = async (values: { password: string }) => {
        try {
            setLoading(true);
            const response = await SistemasApi.getPrivateData({
                password: values.password,
                sistemaId
            });
            setPrivateData({
                id: response.id,
                host: response.host,
                port: String(response.port),
                usuario: response.usuario,
                passwordbd: response.passwordbd,
                tipobd: response.tipobd
            });
            toast.success('Datos obtenidos correctamente');
        } catch (error) {
            toast.error('Error al obtener los datos privados');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values: PrivateData) => {
        try {
            setLoading(true);
            await SistemasApi.update({
                id: sistemaId,
                host: values.host,
                port: Number(values.port),
                usuario: values.usuario,
                password: values.passwordbd,
                tipobd: values.tipobd
            });
            toast.success('Datos actualizados correctamente');
            setIsEditing(false);
        } catch (error) {
            toast.error('Error al actualizar los datos');
        } finally {
            setLoading(false);
        }
    };

    const footer = (
        <div>
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={onHide}
                className="p-button-text"
            />
            {!privateData ? (
                <Button
                    label="Obtener Datos"
                    icon="pi pi-check"
                    type="submit"
                    form="initial-form"
                    loading={loading}
                />
            ) : (
                <>
                    {puedeEditarCredenciales && (
                        <Button
                            label={isEditing ? "Guardar" : "Editar"}
                            icon={isEditing ? "pi pi-save" : "pi pi-pencil"}
                            onClick={() => {
                                if (isEditing) {
                                    formikRef.current?.submitForm();
                                } else {
                                    setIsEditing(true);
                                }
                            }}
                            loading={loading}
                            className={isEditing ? "p-button-success" : "p-button-warning"}
                        />
                    )}
                    {isEditing && (
                        <Button
                            label="Cancelar Edición"
                            icon="pi pi-times"
                            onClick={() => setIsEditing(false)}
                            className="p-button-text"
                        />
                    )}
                </>
            )}
        </div>
    );

    return (
        <Dialog
            header="Datos Privados"
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onHide}
            footer={footer}
        >
            <div className="p-fluid">
                {!privateData ? (
                    <Formik
                        initialValues={{ password: '' }}
                        onSubmit={handleInitialSubmit}
                    >
                        <Form id="initial-form">
                            <div className="field">
                                <FormTextInput
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    placeholder="Ingrese la contraseña"
                                />
                            </div>
                        </Form>
                    </Formik>
                ) : (
                    <Formik
                        enableReinitialize
                        initialValues={privateData}
                        validationSchema={validationSchema}
                        onSubmit={handleSave}
                        innerRef={formikRef}
                    >
                        {({ }) => {

                            return (
                                <Form id="edit-form">
                                    <div className="grid">
                                        <div className="col-12 md:col-6">
                                            <FormTextInput
                                                label="Host"
                                                name="host"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <FormTextInput
                                                label="Puerto"
                                                name="port"
                                                type="number"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <FormTextInput
                                                label="Usuario"
                                                name="usuario"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <FormTextInput
                                                label="Contraseña"
                                                name="passwordbd"
                                                type="password"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <FormSelect
                                                label="Tipo de BD"
                                                name="tipobd"
                                                options={TYPEBDOptions}
                                                optionLabel="nombre"
                                                optionValue="value"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </div>
        </Dialog>
    );
}; 