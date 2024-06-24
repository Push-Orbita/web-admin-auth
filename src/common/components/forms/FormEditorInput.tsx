import { useField, useFormikContext } from 'formik';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { Message } from 'primereact/message';

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    fullWidth?: boolean;
    [x: string]: any;
}

export const FormEditorInput = ({ label, ...props }: Props) => {
    const [field, meta] = useField(props);
    const formik = useFormikContext();

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <Editor
                id={props.name}
                name={field.name}
                value={field.value}
                onTextChange={(e: EditorTextChangeEvent) => formik.setFieldValue(props.name, e.htmlValue)}
                style={{ height: '320px' }}
            />

            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{
                    marginTop: '5px'
                }} />
            ) : null}
        </>
    );
};