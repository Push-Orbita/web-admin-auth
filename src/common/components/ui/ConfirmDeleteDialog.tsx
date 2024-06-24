import { useEffect } from 'react';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { t } from 'i18next';

interface ConfirmDeleteDialogProps {
    visible: boolean;
    onHide: () => void;
    onConfirm: () => void;
    message?: string;
    header?: string;
    icon?: string;
    acceptClassName?: string;
    acceptLabel?: string;
    rejectLabel?: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
    visible,
    onHide,
    onConfirm,
    message = t('common.labels.deleteMessage'),
    header = 'Eliminar',
    icon = 'pi pi-exclamation-triangle',
    acceptClassName = 'p-button-danger',
    acceptLabel = t('common.actions.confirm'),
    rejectLabel = t('common.actions.cancel')
}) => {

    useEffect(() => {
        if (visible) {
            confirmDialog({
                message,
                header,
                icon,
                acceptClassName,
                acceptLabel,
                rejectLabel,
                accept: onConfirm,
                reject: onHide,
            });
        }
    }, [visible, message, header, icon, acceptClassName, acceptLabel, rejectLabel, onConfirm, onHide]);

    return <ConfirmDialog />;
};

export default ConfirmDeleteDialog;
