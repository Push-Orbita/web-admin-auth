import React from 'react';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { CustomBasicModal } from '@components/common/modal/CustomBasicModal';

interface PersonModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedPerson: any;
}

const PersonaModal: React.FC<PersonModalProps> = ({ isOpen, setIsOpen, selectedPerson }) => {
  return (
    <CustomBasicModal isOpen={isOpen} title={`Persona`} setIsOpen={setIsOpen} width="medium">
      {isOpen && selectedPerson && (
        <div className="p-grid">
          <Card >
            <div className="p-col-12">
              <Panel header={`Detalles de la Persona`}>
                <p><strong>Nombre Y Apellido:</strong> {selectedPerson.persona}</p>
                <p><strong>Cuil:</strong> {selectedPerson.cuil}</p>
              </Panel>
            </div>
          </Card>
        </div>
      )}
    </CustomBasicModal>
  );
};

export default PersonaModal;
