import { Form, FieldArray, useFormikContext } from "formik";
import { FC, useEffect } from "react";
import useSelectOptions from "@hooks/useSelectOptions";
import FormCustomButtons from "./FormCustomButtons";
import { FormTextInput } from "./FormTextInput";
import { FormEditorInput } from "./FormEditorInput";

import { FormCheckbox } from "./FormCheckbox";
import FormDatePicker from "./FormDatePicker";
import { Message } from "primereact/message";
import { FormSelect } from "./FormSelect";
import { FormFileUpload } from "./FormFileUpload";
import { FormMultiSelect } from "./FormMultiSelect";
import { FormFileUploadArray } from "./FormFileUploadArray";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import FormIconSelect from "./FormIconSelect";
import { getLangMessage } from "@helpers/getLangMessage.helper";
import { t } from "i18next";
import FormAutoComplete from "./FormAutoComplete";
import FormKnob from './FormKnob';
import FormTreeSelect from './FormTreeSelect';

export interface FieldConfig {
    name: string;
    label?: string;
    type: "number" | "text" | "email" | "password" | "date" | "select" | "multiselect" | "editor" | "autocomplete" | "checkbox" | "upload" | "upload-array" | "array" | "icon-select" | "group" | "knob" | "treeselect";
    fields?: FieldConfig[];
    selectKey?: string;
    optionLabel?: string;
    options?: any[];
    placeholder?: string;
    disabled?: boolean | ((rowData?: any) => boolean);
    rowData?: any;
    gridSize?: "full" | "medium" | "quarter";
    hidden?: boolean | ((rowData?: any) => boolean);
    defaultValue?: string | number | boolean | [] | {};
    uppercase?: boolean;
    pascalCase?: boolean;
    capitalize?: boolean;
    toggleable?: boolean;
    min?: number;
    max?: number;
    step?: number;
    size?: number;
    strokeWidth?: number;
    valueTemplate?: string;
    textColor?: string;
    rangeColor?: string;
    valueColor?: string;
    selectionMode?: 'single' | 'multiple' | 'checkbox';
    display?: 'comma' | 'chip';
    metaKeySelection?: boolean;
    filter?: boolean;
    filterBy?: string;
    filterMode?: 'lenient' | 'strict';
    showClear?: boolean;
    expandedKeys?: any;
    onToggle?: (e: { value: any }) => void;
    panelHeaderTemplate?: () => React.ReactNode;
    panelFooterTemplate?: () => React.ReactNode;
    dependsOn?: {
        field: string;
        value?: any;
    };
}

interface Props {
    fields: FieldConfig[];
    rowData?: any;
    onCancel: () => void;
    title?: string;
    moduleKey: string;
}

const getGridClass = (gridSize?: string) => {
    switch (gridSize) {
        case "full":
            return "col-12";
        case "medium":
            return "col-12 md:col-6";
        case "quarter":
            return "col-12 md:col-6 lg:col-4";
        default:
            return "col-12 md:col-6 lg:col-4";
    }
};

const DynamicFormFields: FC<Props> = ({ fields, rowData, onCancel, title = "Título", moduleKey }) => {
    const formik = useFormikContext<any>();

    if (!formik) {
        console.error("DynamicFormFields debe estar dentro de Formik.");
        return null;
    }

    useEffect(() => {
        if (!rowData) {
            fields.forEach(({ name, defaultValue }) => {
                if (defaultValue !== undefined && formik.values[name] === undefined) {
                    formik.setFieldValue(name, defaultValue);
                }
            });
        }
    }, [fields, rowData, formik]);

    const renderField = (field: FieldConfig, parentName?: string) => {
        const {
            name, label, type, selectKey, optionLabel, placeholder,
            disabled, gridSize, hidden, uppercase, pascalCase, capitalize, fields: subFields,
            toggleable, min, max, step, size, strokeWidth, valueTemplate, textColor, rangeColor, valueColor,
            dependsOn
        } = field;

        const isHidden = typeof hidden === "function" ? hidden(rowData) : hidden;

        if (isHidden) {
            return <input key={name} type="hidden" name={parentName ? `${parentName}.${name}` : name} />;
        }

        const isDisabled = typeof disabled === "function" ? disabled(rowData) : disabled;
        const columnClass = getGridClass(gridSize);
        const optionsData = field.options ?? [];
        const shouldUseSelectKey = !field.options && selectKey;
        const labelFromLang = t(getLangMessage(moduleKey, `form.${name}`)) || "Label";
        const fieldName = parentName ? `${parentName}.${name}` : name;

        const dependencyValue = dependsOn ? formik.values[dependsOn.field] : undefined;
        const isDependencyDisabled = dependsOn && !dependencyValue;
        const finalDisabled = isDisabled || isDependencyDisabled;

        const renderFieldContent = () => {
            if (type === "text" || type === "email" || type === "password" || type === "number") {
                return (
                    <FormTextInput
                        label={labelFromLang}
                        name={fieldName}
                        type={type}
                        placeholder={placeholder}
                        disabled={finalDisabled}
                        uppercase={uppercase}
                        pascalCase={pascalCase}
                        capitalize={capitalize}
                    />
                );
            }

            if (type === "select") {
                const { options, isLoading } = shouldUseSelectKey
                    ? useSelectOptions(
                        selectKey,
                        item => item[optionLabel ?? "nombre"],
                        dependsOn ? {
                            field: dependsOn.field,
                            value: dependencyValue
                        } : undefined
                    )
                    : { options: optionsData, isLoading: false };

                return (
                    <FormSelect
                        label={labelFromLang}
                        name={fieldName}
                        optionLabel={optionLabel ?? "nombre"}
                        options={options}
                        disabled={finalDisabled || isLoading}
                        placeholder={isDependencyDisabled ? `Seleccione primero ${t(getLangMessage(moduleKey, `form.${dependsOn.field}`))}` : placeholder}
                    />
                );
            }

            if (type === "multiselect") {
                const { options, isLoading } = shouldUseSelectKey
                    ? useSelectOptions(selectKey, item => item[optionLabel ?? "nombre"])
                    : { options: optionsData, isLoading: false };

                return (
                    <FormMultiSelect
                        label={labelFromLang}
                        name={fieldName}
                        optionLabel={optionLabel ?? "nombre"}
                        options={options}
                        isLoading={isLoading}
                        disabled={finalDisabled}
                        placeholder={placeholder}
                    />
                );
            }

            if (type === "date") {
                return <FormDatePicker label={labelFromLang} name={fieldName} disabled={finalDisabled} />;
            }

            if (type === "editor") {
                return <FormEditorInput label={labelFromLang} name={fieldName} />;
            }

            if (type === "autocomplete") {
                const { options } = shouldUseSelectKey
                    ? useSelectOptions(selectKey, item => item[optionLabel ?? "nombre"])
                    : { options: optionsData };

                return (
                    <FormAutoComplete
                        label={labelFromLang}
                        name={fieldName}
                        optionLabel={optionLabel ?? "nombre"}
                        options={options}
                    />
                );
            }

            if (type === "checkbox") {
                return <FormCheckbox label={labelFromLang} name={fieldName} />;
            }

            if (type === "upload") {
                return <FormFileUpload name={fieldName} label={labelFromLang} accept="image/*" />;
            }

            if (type === "upload-array") {
                return <FormFileUploadArray name={fieldName} label={labelFromLang} accept="image/*" />;
            }

            if (type === "icon-select") {
                return <FormIconSelect name={fieldName} label={labelFromLang} />;
            }

            if (type === "knob") {
                return (
                    <FormKnob
                        name={fieldName}
                        label={labelFromLang}
                        min={min}
                        max={max}
                        step={step}
                        size={size}
                        strokeWidth={strokeWidth}
                        valueTemplate={valueTemplate}
                        textColor={textColor}
                        rangeColor={rangeColor}
                        valueColor={valueColor}
                        disabled={finalDisabled}
                    />
                );
            }

            if (type === "treeselect") {
                return (
                    <FormTreeSelect
                        name={fieldName}
                        label={labelFromLang}
                        options={field.options}
                        placeholder={placeholder}
                        disabled={finalDisabled}
                        selectionMode={field.selectionMode}
                        display={field.display}
                        metaKeySelection={field.metaKeySelection}
                        filter={field.filter}
                        filterBy={field.filterBy}
                        filterMode={field.filterMode}
                        showClear={field.showClear}
                        expandedKeys={field.expandedKeys}
                        onToggle={field.onToggle}
                        panelHeaderTemplate={field.panelHeaderTemplate}
                        panelFooterTemplate={field.panelFooterTemplate}
                        selectKey={selectKey}
                    />

                );
            }

            return null;
        };

        if (type === "group" && Array.isArray(subFields)) {
            return (
                <div key={name} className="col-12 mt-3">
                    <Fieldset legend={label} className="custom-fieldset" toggleable={toggleable}>
                        <div className="p-fluid formgrid grid">
                            {subFields.map(subField => renderField(subField, fieldName))}
                        </div>
                    </Fieldset>
                </div>
            );
        }

        if (type === "array" && Array.isArray(subFields)) {
            return (
                <div key={name} className="col-12 mt-3">
                    <Fieldset legend={label} className="custom-fieldset">
                        <FieldArray
                            name={fieldName}
                            render={(arrayHelpers) => (
                                <>
                                    {!Array.isArray(formik.values[fieldName]) || formik.values[fieldName].length === 0 ? (
                                        <Message
                                            className="w-full justify-content-start h-3rem m-2"
                                            severity="info"
                                            text={`No hay ${label?.toLowerCase() ?? "elementos"} agregados`}
                                        />
                                    ) : (
                                        formik.values[fieldName].map((_: any, index: number) => (
                                            <div
                                                key={index}
                                                className="p-fluid border-round border-1 surface-border p-3 mb-3"
                                            >
                                                <div className="grid">
                                                    {subFields.map((subField) => (
                                                        <div key={`${fieldName}[${index}].${subField.name}`} className={getGridClass(subField.gridSize)}>
                                                            {renderField(subField, `${fieldName}[${index}]`)}
                                                        </div>
                                                    ))}
                                                    <div className="col-12 flex justify-content-end mt-2">
                                                        <Button
                                                            icon="pi pi-trash"
                                                            severity="danger"
                                                            label="Eliminar"
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                            className="p-button-sm w-full md:w-auto"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}

                                    <div className="col-12 md:col-4 mt-3">
                                        <Button
                                            type="button"
                                            icon="pi pi-plus"
                                            label={`Agregar ${label}`}
                                            onClick={() => arrayHelpers.push({})}
                                            className="p-button-sm p-button-outlined w-full md:w-auto"
                                        />
                                    </div>
                                </>
                            )}
                        />
                    </Fieldset>
                </div>
            );
        }

        return (
            <div key={name} className={`${columnClass} mt-2`}>
                {renderFieldContent()}
            </div>
        );
    };

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <div className="col-12">
                    <Message
                        severity={rowData ? "warn" : "info"}
                        text={title}
                        style={{ width: "100%", fontSize: "900", height: "3rem" }}
                    />
                </div>
                <div className="p-fluid formgrid grid mb-3">
                    {fields.map(field => renderField(field))}
                </div>
                <FormCustomButtons onCancel={onCancel} />
            </Form>
        </>
    );
};

export default DynamicFormFields;
