import { useField, useFormikContext } from "formik";
import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    labelId?: string;
    options: any;
    optionLabel: string;
    onOptionSelect?: (option: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => void;
    isLoading?: boolean;
    disabled?: boolean;
    [x: string]: any;
}

export const FormSelect = ({ label, isLoading, disabled = false, onOptionSelect, ...props }: Props) => {
    const [field, meta] = useField(props);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e: any) => {
        const selectedOption = props.options.find((option: any) => option.value === e.value);
        if (selectedOption) {
            if (onOptionSelect) {
                // Ejecuta la función callback personalizada
                onOptionSelect(selectedOption, setFieldValue);
            } else {
                // Si no se proporciona un callback, usa una función predeterminada
                setFieldValue(field.name, selectedOption.value);
            }
        }
    };

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <Dropdown
                filter
                loading={isLoading}
                disabled={disabled}
                id={field.name} // Cambié inputId a id para que coincida con el valor del campo
                value={field.value} // Asegúrate de que `field.value` sea el `value` correcto del Dropdown
                onChange={handleChange}
                onBlur={field.onBlur}
                options={props.options} // Asegúrate de que las opciones se pasen correctamente
                optionLabel={props.optionLabel}
                placeholder={props.placeholder || "Seleccionar"}
                className="w-full"
            />
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{ marginTop: '5px' }} />
            ) : null}
        </>
    );
};
