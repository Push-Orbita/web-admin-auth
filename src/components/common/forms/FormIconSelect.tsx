import { useField } from "formik";
import { Dropdown } from "primereact/dropdown";
import { IconName, iconOptions } from "@constants/icon-options";
import DynamicIcon from "../ui/DynamicIcon";
import { useMemo, useCallback } from "react";

interface FormIconSelectProps {
    name: string;
    label: string;
}

const FormIconSelect = ({ name, label }: FormIconSelectProps) => {
    const [field, , helpers] = useField(name);

    const selectedValue = field.value;

    const options = useMemo(() => {
        return iconOptions.map((icon) => ({
            label: icon,
            value: icon,
        }));
    }, []);

    const itemTemplate = useCallback((option: any) => (
        <div className="flex align-items-center gap-2">
            <DynamicIcon iconName={option.value as IconName} size="1.5rem" />
            <span>{option.label}</span>
        </div>
    ), []);

    const valueTemplate = useCallback((option: any, props: any) => {
        if (!option) return props.placeholder;
        return itemTemplate(option);
    }, [itemTemplate]);

    const handleChange = useCallback((e: any) => {
        helpers.setValue(e.value);
    }, [helpers]);

    return (
        <>
            <label>{label}</label>
            <Dropdown
                id={name}
                name={name}
                value={selectedValue}
                onChange={handleChange}
                options={options}
                placeholder="Seleccionar ícono"
                itemTemplate={itemTemplate}
                valueTemplate={valueTemplate}
                className="w-full"
                showClear
                filter
            />
        </>
    );
};

export default FormIconSelect;
