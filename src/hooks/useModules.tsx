import { Button } from 'primereact/button';
import { createContext, FunctionComponent, ReactNode, useContext, useState } from 'react';
import { usePermisos } from './usePermisos';


// Tipo para los elementos del breadcrumb
interface BreadCrumbModel {
    items: { label: string }[];
    home: { icon: string, url: string };
}

// Tipo para el valor del contexto
interface ModuleContextValue {
    startToolbarTemplate: () => JSX.Element;
    breadcrumbModel: BreadCrumbModel;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

// Creando el contexto con tipo predeterminado como null que luego será inicializado
const ModuleContext = createContext<ModuleContextValue | null>(null);

// Componente provider con tipado de props
interface ModuleProviderProps {
    children: ReactNode;
}

export const ModuleProvider: FunctionComponent<ModuleProviderProps> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const permisos = usePermisos();

    const items = [{ label: 'Configuración' }, { label: 'Modulos' }, { label: 'Acciones' }];
    const home = { icon: 'pi pi-home', url: 'https://primereact.org' };

    const startToolbarTemplate = (): JSX.Element => (
        <div className="my-2">
            {permisos.puedeAgregar ? (
                <Button label="Nuevo" icon="pi pi-plus" className="mr-2" onClick={() => setVisible(true)} />
            ) : null}
        </div>
    );

    const breadcrumbModel: BreadCrumbModel = {
        items,
        home
    };

    const contextValue: ModuleContextValue = {
        startToolbarTemplate,
        breadcrumbModel,
        visible,
        setVisible
    };

    return (
        <ModuleContext.Provider value={contextValue}>
            {children}
        </ModuleContext.Provider>
    );
};

// Hook personalizado para usar el contexto, con un control de tipo seguro
export const useModuleContext = (): ModuleContextValue => {
    const context = useContext(ModuleContext);
    if (!context) {
        throw new Error("useModuleContext must be used within a ModuleProvider");
    }
    return context;
}
