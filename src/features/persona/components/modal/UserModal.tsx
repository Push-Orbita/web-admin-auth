import React from 'react';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { CustomBasicModal } from '@components/common/modal/CustomBasicModal';


interface UserModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedUser: any;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, setIsOpen, selectedUser }) => {
    return (
        <CustomBasicModal isOpen={isOpen} title={`Usuarios`} setIsOpen={setIsOpen} width="medium">
            {isOpen && selectedUser && (
                <div className="p-grid">
                    <Card title={selectedUser?.persona}>
                        {selectedUser.usuario.map((user: any) => (
                            <div key={user.id} className="p-col-12">
                                <Panel header={`Sistema: Facturación`}>
                                    <p><strong>ID:</strong> {user.id}</p>
                                    <p><strong>Usuario:</strong> {user.nombre}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                </Panel>
                            </div>
                        ))}
                    </Card>
                </div>
            )}
        </CustomBasicModal>
    );
};

export default UserModal;
