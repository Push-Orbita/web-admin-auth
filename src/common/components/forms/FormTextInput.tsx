import { useField } from 'formik';
import { InputText } from 'primereact/inputtext';

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
            <div id={props.name} style={{
                color: 'var(--red-500)'
            }}>
                {meta.touched && meta.error ? meta.error : ''}
            </div>
        </>
    );
};
