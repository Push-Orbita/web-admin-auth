import { useField } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

interface Props {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'time' | 'number' | 'date';
    placeholder?: string;
    fullWidth?: boolean;
    [x: string]: any;
}
export const FormTextInput = ({ label, type = 'text', ...props }: Props) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name} style={{ paddingTop: '10px' }}>{label}</label>
            <InputText id={props.name}
                aria-describedby={props.name}
                {...field}
                {...props}
                value={field.value}
                type={type}
            />
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{
                    marginTop: '5px'
                }} />
            ) : null}
        </>
    );
};
