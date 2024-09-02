import { useField } from 'formik';
import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    dateFormat?: string;
    showIcon?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    [x: string]: any;
}

export const FormDatePicker = ({ label, dateFormat = 'dd-mm-yy', showIcon = true, disabled = false, ...props }: Props) => {
    const [field, meta, helpers] = useField(props);
    // const value = field.value || new Date();
    return (
        <>
            <label htmlFor={props.name} style={{ paddingTop: '10px' }}>{label}</label>
            <Calendar
                id={props.name}
                value={field.value}
                onChange={(e) => helpers.setValue(e.value)}
                onBlur={() => helpers.setTouched(true)}
                dateFormat={dateFormat}
                showIcon={showIcon}
                disabled
                {...props}
            />
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{
                    marginTop: '5px'
                }} />
            ) : null}
        </>
    );
};