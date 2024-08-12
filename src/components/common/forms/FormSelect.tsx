import { useField } from "formik";
import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    labelId?: string;
    options: any;
    optionLabel: string;
    onChange?: (value: any) => void;
    isLoading?: boolean;
    disabled?: boolean;
    [x: string]: string | undefined | any;
}
export const FormSelect = ({ label, isLoading, disabled = false, ...props }: Props) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <Dropdown
                filter
                loading={isLoading}
                disabled={disabled}
                inputId={field.value}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                {...props}
                options={props.options}
                optionLabel={props.optionLabel}
                placeholder="Seleccionar" className="w-full" />
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{
                    marginTop: '5px'
                }} />
            ) : null}
        </>
    )
}
