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
    onOptionSelect?: (selectedOption: any, setFieldValue: (field: string, value: any) => void) => void; // Función opcional para manejar la opción seleccionada
    isLoading?: boolean;
    disabled?: boolean;
    [x: string]: string | undefined | any;
}

export const FormSelect = ({ label, isLoading, disabled = false, onOptionSelect, ...props }: Props) => {
    const [field, meta] = useField(props); // Integración de Formik
    const { setFieldValue } = useFormikContext(); // Obtener setFieldValue para actualizar los valores del formulario

    const handleChange = (e: any) => {
        const selectedOption = props.options.find((option: any) => option.value === e.value); // Encuentra la opción seleccionada
        if (selectedOption) {
            if (onOptionSelect) {
                // Si se proporciona onOptionSelect, lo ejecuta
                onOptionSelect(selectedOption, setFieldValue);
            } else {
                // Si no hay onOptionSelect, solo se actualiza el valor de Formik
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
                inputId={field.value}
                value={field.value} // Sincroniza el valor con Formik
                onChange={handleChange} // Maneja el cambio de opción
                onBlur={field.onBlur} // Controla el evento onBlur
                {...props} // Pasa las demás props
                options={props.options} // Pasa las opciones
                optionLabel={props.optionLabel} // Indica qué campo debe ser mostrado como label
                placeholder="Seleccionar"
                className="w-full"
            />
            {meta.touched && meta.error ? (
                <Message
                    id={`${props.name}-help`}
                    severity="error"
                    text={meta.error}
                    style={{ marginTop: '5px' }}
                />
            ) : null}
        </>
    );
};
