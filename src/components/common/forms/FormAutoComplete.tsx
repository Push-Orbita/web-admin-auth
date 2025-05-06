import { useField } from 'formik';
import { AutoComplete } from 'primereact/autocomplete';
import { useCallback, useMemo, useState, useEffect } from 'react';
import selectEntitiesConfig from '@config/components/selectConfig';

interface FormAutoCompleteProps {
    name: string;
    label: string;
    optionLabel?: string;
    options?: any[];
    placeholder?: string;
    disabled?: boolean;
    multiple?: boolean;
    forceSelection?: boolean;
    dropdown?: boolean;
    minLength?: number;
    delay?: number;
    className?: string;
    itemTemplate?: (item: any) => React.ReactNode;
    selectedItemTemplate?: (item: any) => React.ReactNode;
    panelFooterTemplate?: () => React.ReactNode;
    emptyMessage?: string;
    emptyFilterMessage?: string;
    loading?: boolean;
    loadingIcon?: string;
    virtualScrollerOptions?: any;
    selectionLimit?: number;
    selectKey?: string;
}

const FormAutoComplete = ({
    name,
    label,
    optionLabel = "nombre",
    options: propOptions,
    placeholder,
    disabled = false,
    multiple = false,
    forceSelection = false,
    dropdown = false,
    minLength = 1,
    delay = 300,
    className = "",
    itemTemplate,
    selectedItemTemplate,
    panelFooterTemplate,
    emptyMessage = "No hay resultados",
    emptyFilterMessage = "No hay resultados que coincidan",
    loading: propLoading = false,
    loadingIcon = "pi pi-spin pi-spinner",
    virtualScrollerOptions,
    selectionLimit,
    selectKey
}: FormAutoCompleteProps) => {
    const [field, meta, helpers] = useField(name);
    const [loading, setLoading] = useState(false);
    const [allOptions, setAllOptions] = useState<any[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<any[]>([]);

    const isInvalid = meta.touched && meta.error;

    // Cargar datos iniciales cuando el componente se monta
    useEffect(() => {
        const loadInitialData = async () => {
            if (selectKey) {
                setLoading(true);
                try {
                    const config = selectEntitiesConfig[selectKey];
                    if (config) {
                        const data = await config.apiService();
                        setAllOptions(data);
                        setFilteredOptions(data);
                    }
                } catch (error) {
                    console.error('Error al cargar datos iniciales:', error);
                } finally {
                    setLoading(false);
                }
            } else if (propOptions) {
                setAllOptions(propOptions);
                setFilteredOptions(propOptions);
            }
        };

        loadInitialData();
    }, [selectKey, propOptions]);

    const handleChange = useCallback((e: any) => {
        helpers.setValue(e.value);
    }, [helpers]);

    const handleBlur = useCallback(() => {
        helpers.setTouched(true);
    }, [helpers]);

    const handleSearch = useCallback((event: { query: string }) => {
        setTimeout(() => {
            let _filteredOptions;

            if (!event.query.trim().length) {
                _filteredOptions = [...allOptions];
            } else {
                const config = selectKey ? selectEntitiesConfig[selectKey] : null;
                const labelField = config?.labelField || optionLabel;

                _filteredOptions = allOptions.filter((item) => {
                    return item[labelField].toLowerCase().includes(event.query.toLowerCase());
                });
            }

            setFilteredOptions(_filteredOptions);
        }, delay);
    }, [allOptions, selectKey, optionLabel, delay]);

    const currentOptionLabel = useMemo(() => {
        if (selectKey) {
            return selectEntitiesConfig[selectKey]?.labelField || optionLabel;
        }
        return optionLabel;
    }, [selectKey, optionLabel]);

    return (
        <div className={`field ${className}`}>
            <label htmlFor={name} className={isInvalid ? "p-error" : ""}>
                {label}
            </label>
            <AutoComplete
                id={name}
                name={name}
                value={field.value}
                suggestions={filteredOptions}
                completeMethod={handleSearch}
                onChange={handleChange}
                onBlur={handleBlur}
                field={currentOptionLabel}
                placeholder={placeholder}
                disabled={disabled}
                multiple={multiple}
                forceSelection={forceSelection}
                dropdown={dropdown}
                minLength={minLength}
                delay={delay}
                itemTemplate={itemTemplate}
                selectedItemTemplate={selectedItemTemplate}
                panelFooterTemplate={panelFooterTemplate}
                emptyMessage={emptyMessage}
                emptyFilterMessage={emptyFilterMessage}
                loading={loading || propLoading}
                loadingIcon={loadingIcon}
                virtualScrollerOptions={virtualScrollerOptions}
                selectionLimit={selectionLimit}
                className={`w-full ${isInvalid ? "p-invalid" : ""}`}
            />
            {isInvalid && <small className="p-error">{meta.error}</small>}
        </div>
    );
};

export default FormAutoComplete;
