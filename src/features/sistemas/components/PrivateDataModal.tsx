import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SistemasApi } from '../service/sistemas.service';
import { toast } from 'react-hot-toast';

interface Props {
    visible: boolean;
    onHide: () => void;
    sistemaId: number;
}

export const PrivateDataModal = ({ visible, onHide, sistemaId }: Props) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [privateData, setPrivateData] = useState<any>(null);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await SistemasApi.getPrivateData({
                password,
                sistemaId
            });
            setPrivateData(response);
            toast.success('Datos obtenidos correctamente');
        } catch (error) {
            toast.error('Error al obtener los datos privados');
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
            <Button
                label="Obtener Datos"
                icon="pi pi-check"
                onClick={handleSubmit}
                loading={loading}
            />
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
                <div className="field">
                    <label htmlFor="password">Contraseña</label>
                    <InputText
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingrese la contraseña"
                    />
                </div>

                {privateData && (
                    <div className="mt-4">
                        <DataTable value={[privateData]} className="p-datatable-sm">
                            <Column field="host" header="Host" />
                            <Column field="port" header="Puerto" />
                            <Column field="usuario" header="Usuario" />
                            <Column field="passwordbd" header="Contraseña" />
                            <Column field="tipobd" header="Tipo de BD" />
                        </DataTable>
                    </div>
                )}
            </div>
        </Dialog>
    );
}; 