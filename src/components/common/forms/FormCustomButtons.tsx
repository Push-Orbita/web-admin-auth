import { t } from "i18next";
import { Button } from "primereact/button";
import { lang } from "../../../langs";
import { useModuleContext } from "../../../hooks/useModules";
import { useFormikContext } from "formik";

const FormCustomButtons = () => {
    const { setVisible, setRowData } = useModuleContext();
    const { isSubmitting } = useFormikContext(); // Obtén el estado de isSubmitting de Formik

    return (
        <div className="flex justify-content-end flex-wrap gap-3">
            <Button
                type="button"
                label={t(lang.common.actions.cancel)}
                icon="pi pi-times"
                onClick={() => {
                    setVisible(false);
                    setRowData(undefined);
                }}
                className="p-button-text"
                disabled={isSubmitting}
            />
            <Button
                type="submit"
                label={t(lang.common.actions.save)}
                icon="pi pi-save"
                disabled={isSubmitting}
            />
        </div>
    );
};

export default FormCustomButtons;
