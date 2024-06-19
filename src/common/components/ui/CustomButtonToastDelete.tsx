import { Button } from 'primereact/button';
import { t } from 'i18next';
import { lang } from '../../../langs';

interface ConfirmButtonProps {
    onClick: () => void;
}

export const ConfirmToastButton = ({ onClick }: ConfirmButtonProps) => {
    return (
        <Button
            type="submit"
            label={t(lang.common.actions.confirm)}
            icon="pi pi-check"
            onClick={onClick}
        />
    );
};

export const CancelToastButton = ({ onClick }: ConfirmButtonProps) => {
    return (
        <Button
            className="p-button-text"
            type="button"
            label={t(lang.common.actions.cancel)}
            icon="pi pi-times"
            severity="danger"
            onClick={onClick}
        />
    );
};