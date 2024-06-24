import { t } from "i18next";
import { Button } from "primereact/button";
import { lang } from "../../../langs";
import { useModuleContext } from "../../../hooks/useModules";

interface FormCustomButtonsProps {
    disabled?: boolean;
}

const FormCustomButtons: React.FC<FormCustomButtonsProps> = ({ disabled = false }) => {
    const { setVisible, setRowData } = useModuleContext();

    return (
        <div className="flex justify-content-end flex-wrap gap-3">
            <Button
                type="button"
                label={t(lang.common.actions.cancel)}
                icon="pi pi-times"
                onClick={() => {
                    setVisible(false);
                    setRowData('');
                }}
                disabled={disabled}
                className="p-button-text"
            />
            <Button
                type="submit"
                label={t(lang.common.actions.save)}
                icon="pi pi-save"
                disabled={disabled}
                loading={disabled}
            />
        </div>
    );
}

export default FormCustomButtons;
