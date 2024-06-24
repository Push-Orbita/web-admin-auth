// ToastContext.tsx
import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext<React.RefObject<Toast> | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const toast = useRef<Toast>(null);

    return (
        <ToastContext.Provider value={toast}>
            <Toast ref={toast} position='center' />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

