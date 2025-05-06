import { useField } from 'formik';
import { Knob } from 'primereact/knob';
import { useCallback } from 'react';

interface FormKnobProps {
    name: string;
    label: string;
    min?: number;
    max?: number;
    step?: number;
    size?: number;
    strokeWidth?: number;
    valueTemplate?: string;
    textColor?: string;
    rangeColor?: string;
    valueColor?: string;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
}

const FormKnob = ({
    name,
    label,
    min = 0,
    max = 100,
    step = 1,
    size = 100,
    strokeWidth = 14,
    valueTemplate = '{value}',
    textColor,
    rangeColor,
    valueColor,
    disabled = false,
    readOnly = false,
    className = ""
}: FormKnobProps) => {
    const [field, meta, helpers] = useField(name);

    const isInvalid = meta.touched && meta.error;

    const handleChange = useCallback((e: { value: number }) => {
        helpers.setValue(e.value);
    }, [helpers]);

    const handleBlur = useCallback(() => {
        helpers.setTouched(true);
    }, [helpers]);

    return (
        <div className={`field ${className}`}>
            <label htmlFor={name} className={isInvalid ? "p-error" : ""}>
                {label}
            </label>
            <div className="flex align-items-center gap-2">
                <Knob
                    id={name}
                    name={name}
                    value={field.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={min}
                    max={max}
                    step={step}
                    size={size}
                    strokeWidth={strokeWidth}
                    valueTemplate={valueTemplate}
                    textColor={textColor}
                    rangeColor={rangeColor}
                    valueColor={valueColor}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={isInvalid ? "p-invalid" : ""}
                />
                {isInvalid && <small className="p-error">{meta.error}</small>}
            </div>
        </div>
    );
};

export default FormKnob; 