import { useField } from "formik";
import { Dropdown } from "primereact/dropdown";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    labelId?: string;
    options: any;
    optionLabel: string;
    onChange?: (value: any) => void;
    loading?: boolean;
    [x: string]: string | undefined | any;
}
export const FormSelect = ({ label, loading, ...props }: Props) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <Dropdown
                inputId={field.value}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                {...props}
                options={props.options}
                optionLabel={props.optionLabel}
                placeholder="Seleccionar" className="w-full" />
            <small id={props.name} style={{
                color: 'var(--red-500)'
            }}>
                {meta.touched && meta.error ? meta.error : ""}
            </small>
        </>
    )
}
