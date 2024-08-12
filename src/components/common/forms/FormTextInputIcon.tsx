import { useField } from 'formik';
import { InputText } from 'primereact/inputtext';

interface Props {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'time' | 'number' | 'date';
    placeholder?: string;
    fullWidth?: boolean;
    icon?: string;
    [x: string]: any;
}
export const FormTextInputIcon = ({ label, type = 'text', icon, ...props }: Props) => {
    const [field, meta] = useField(props);
    return (
        <><label htmlFor={props.name} style={{ paddingTop: '10px' }}>{label}</label>
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className={`${icon}`}></i>
                </span>
                <InputText id={props.name}
                    aria-describedby={props.name}
                    {...field}
                    {...props}
                    value={field.value}
                    type={type}
                    // placeholder={label}
                    style={{
                        borderTopRightRadius: '6px',
                        borderBottomRightRadius: '6px'
                    }}
                />
              
            </div>
            <div id={props.name} style={{
                    color: 'var(--red-500)'
                }}>
                    {meta.touched && meta.error ? meta.error : ''}
                </div>
        </>
    );
};
