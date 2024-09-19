import React from 'react';
import { useField } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

interface Props {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'time' | 'number' | 'date';
    placeholder?: string;
    fullWidth?: boolean;
    uppercase?: boolean;  // Prop para convertir a mayúsculas
    maxLength?: number;   // Prop para limitar la longitud máxima
    [x: string]: any;
}

export const FormTextInput = ({
    label,
    type = 'text',
    uppercase = false,  // Valor por defecto: no convertir a mayúsculas
    maxLength,          // Valor por defecto: sin límite de longitud
    ...props
}: Props) => {
    const [field, meta, helpers] = useField(props);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (uppercase) {
            value = value.toUpperCase(); // Convertir a mayúsculas si la prop está activa
        }

        if (maxLength && value.length > maxLength) {
            value = value.slice(0, maxLength); // Limitar a maxLength si está definido
        }

        helpers.setValue(value);
    };

    return (
        <>
            <label htmlFor={props.name} style={{ paddingTop: '10px' }}>{label}</label>
            <InputText
                id={props.name}
                aria-describedby={props.name}
                {...field}
                {...props}
                value={field.value}
                type={type}
                onChange={handleChange} // Interceptamos el cambio
                
            />
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{ marginTop: '5px' }} />
            ) : null}
        </>
    );
};
