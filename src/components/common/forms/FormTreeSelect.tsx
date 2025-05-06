import { TreeSelect } from 'primereact/treeselect';
import { TreeNode } from 'primereact/treenode';
import { useEffect, useState } from 'react';

interface FormTreeSelectProps {
    name: string;
    label: string;
    options?: TreeNode[];
    placeholder?: string;
    disabled?: boolean;
    selectionMode?: 'single' | 'multiple' | 'checkbox';
    display?: 'comma' | 'chip';
    className?: string;
    filter?: boolean;
    filterMode?: 'lenient' | 'strict';
    showClear?: boolean;
    gridSize?: string;
}

export const FormTreeSelect = ({
    name,
    label,
    options,
    placeholder,
    disabled = false,
    selectionMode = "single",
    display = "chip",
    className,
    filter = false,
    filterMode = "lenient",
    showClear = false,
    gridSize = "medium"
}: FormTreeSelectProps) => {
    const [suggestions, setSuggestions] = useState<TreeNode[]>([]);

    useEffect(() => {
        if (options) {
            setSuggestions(options);
        }
    }, [options]);

    return (
        <div className={`field col-${gridSize}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <TreeSelect
                id={name}
                name={name}
                options={suggestions}
                placeholder={placeholder}
                className={className}
                selectionMode={selectionMode}
                display={display}
                filter={filter}
                filterMode={filterMode}
                showClear={showClear}
                disabled={disabled}
            />
        </div>
    );
};

export default FormTreeSelect; 