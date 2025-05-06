import { useField } from 'formik';
import { TreeSelect, TreeSelectChangeEvent } from 'primereact/treeselect';
import { TreeNode } from 'primereact/treenode';
import { useCallback, useEffect, useState } from 'react';
import selectEntitiesConfig from '@config/components/selectConfig';

interface FormTreeSelectProps {
    name: string;
    label: string;
    options?: TreeNode[];
    placeholder?: string;
    disabled?: boolean;
    selectionMode?: 'single' | 'multiple' | 'checkbox';
    display?: 'comma' | 'chip';
    metaKeySelection?: boolean;
    className?: string;
    filter?: boolean;
    filterBy?: string;
    filterMode?: 'lenient' | 'strict';
    showClear?: boolean;
    expandedKeys?: any;
    onToggle?: (e: { value: any }) => void;
    panelHeaderTemplate?: () => React.ReactNode;
    panelFooterTemplate?: () => React.ReactNode;
    emptyMessage?: string;
    selectKey?: string;
}

const FormTreeSelect = ({
    name,
    label,
    options: propOptions,
    placeholder,
    disabled = false,
    selectionMode = 'single',
    display = 'comma',
    metaKeySelection = true,
    className = "",
    filter = false,
    filterBy,
    filterMode = 'lenient',
    showClear = false,
    expandedKeys,
    onToggle,
    panelHeaderTemplate,
    panelFooterTemplate,
    emptyMessage = "No hay resultados",
    selectKey
}: FormTreeSelectProps) => {
    const [field, meta, helpers] = useField(name);
    const [options, setOptions] = useState<TreeNode[]>([]);

    const isInvalid = meta.touched && meta.error;

    // Cargar datos iniciales cuando el componente se monta
    useEffect(() => {
        const loadInitialData = async () => {
            if (selectKey) {
                try {
                    const config = selectEntitiesConfig[selectKey];
                    if (config) {
                        const data = await config.apiService();
                        // Convertir los datos a formato TreeNode
                        const treeData = convertToTreeNodes(data, config.labelField || 'nombre');
                        setOptions(treeData);
                    }
                } catch (error) {
                    console.error('Error al cargar datos iniciales:', error);
                }
            } else if (propOptions) {
                setOptions(propOptions);
            }
        };

        loadInitialData();
    }, [selectKey, propOptions]);

    const handleChange = useCallback((e: TreeSelectChangeEvent) => {
        helpers.setValue(e.value);
    }, [helpers]);

    const handleBlur = useCallback(() => {
        helpers.setTouched(true);
    }, [helpers]);

    // Función auxiliar para convertir datos planos a formato TreeNode
    const convertToTreeNodes = (data: any[], labelField: string): TreeNode[] => {
        console.log(data);
        return data.map((item, index) => ({
            key: item.id?.toString() || index.toString(),
            label: item[labelField],
            data: item,
            children: item.children ? convertToTreeNodes(item.children, labelField) : undefined
        }));

    };

    return (
        <div className={`field ${className}`}>
            <label htmlFor={name} className={isInvalid ? "p-error" : ""}>
                {label}
            </label>
            <TreeSelect
                id={name}
                name={name}
                value={field.value}
                onChange={handleChange}
                onBlur={handleBlur}
                options={options}
                placeholder={placeholder}
                disabled={disabled}
                selectionMode={selectionMode}
                display={display}
                metaKeySelection={metaKeySelection}
                filter={filter}
                filterBy={filterBy}
                filterMode={filterMode}
                showClear={showClear}
                expandedKeys={expandedKeys}
                onToggle={onToggle}
                panelHeaderTemplate={panelHeaderTemplate}
                panelFooterTemplate={panelFooterTemplate}
                emptyMessage={emptyMessage}
                className={`w-full ${isInvalid ? "p-invalid" : ""}`}
            />
            {isInvalid && <small className="p-error">{meta.error}</small>}
        </div>
    );
};

export default FormTreeSelect; 