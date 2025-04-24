import DynamicFormFields, { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ModuleKey } from "@config/api/serviceRegistry";
import { useFeatureModule } from "@hooks/useFeatureModule";
import DynamicTable from "../table/basic-table/DynamicTable";
import { ICustomColumnItem } from "../table/basic-table/interfaces/custombasictable";
import { CrudPage } from "./CrudPage";

interface Props {
    moduleKey: ModuleKey;
    formFields: FieldConfig[];
    columns: ICustomColumnItem[];
    validationSchema?: any;
    rowExpansionTemplate?: (data: any) => React.ReactNode;
    showExpandButtons?: boolean;
    initialData?: any;
}

const DynamicCrudPage = ({ moduleKey, formFields, columns, validationSchema, rowExpansionTemplate, showExpandButtons, initialData }: Props) => {
    const feature = useFeatureModule(moduleKey);
    return (
        <CrudPage
            moduleKey={moduleKey}
            FormComponent={DynamicFormFields}
            TableComponent={({ data, isFetching, handleDelete, moduleKey }) => (
                <DynamicTable
                    data={initialData || data}
                    isFetching={isFetching}
                    columns={columns}
                    handleDelete={handleDelete}
                    moduleKey={moduleKey}
                    rowExpansionTemplate={rowExpansionTemplate}
                    showExpandButtons={showExpandButtons}
                />
            )}
            formFields={formFields}
            validationSchema={validationSchema}
            {...feature}
        />
    );
};

export default DynamicCrudPage;
