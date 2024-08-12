import { useField, useFormikContext } from 'formik';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

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

            <small id={props.name} style={{
                color: 'var(--red-500)'
            }}>
                {meta.touched && meta.error ? meta.error : ""}
            </small>
        </>
    );
};