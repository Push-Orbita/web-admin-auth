import { useField } from "formik";
import { Dropdown } from "primereact/dropdown";
import { IconName, iconOptions } from "@constants/icon-options";
import DynamicIcon from "../ui/DynamicIcon";
import { useMemo } from "react";

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

    const itemTemplate = (option: any) => (
        <div className="flex align-items-center gap-2">
            <DynamicIcon iconName={option.value as IconName} size="1.5rem" />
            <span>{option.label}</span>
        </div>
    );

    const valueTemplate = (option: any, props: any) => {
        if (!option) return props.placeholder;
        return itemTemplate(option);
    };

    return (
        <>
            <label>{label}</label>
            <Dropdown
                id={name}
                name={name}
                value={selectedValue}
                onChange={(e) => helpers.setValue(e.value)}
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
