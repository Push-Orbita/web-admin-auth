import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "./interfaces/custombasictable";
import { getLangMessage } from "@helpers/getLangMessage.helper";
import { t } from "i18next";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
    columns: ICustomColumnItem[];
    moduleKey: string;
    rowExpansionTemplate?: (data: any) => React.ReactNode;
    showExpandButtons?: boolean;
}

const DynamicTable = ({ data, isFetching, handleDelete, columns, moduleKey, rowExpansionTemplate, showExpandButtons }: Props) => {
    return (
        <CustomBasicTable
            data={data?.data ?? []}
            loading={isFetching}
            columns={columns}
            handleDelete={handleDelete}
            filterDisplay="row"
            rowsPerPageOptions={[10, 100, 1000]}
            rows={100}
            tableTitle={t(getLangMessage(moduleKey, "list"))}
            rowExpansionTemplate={rowExpansionTemplate}
            showExpandButtons={showExpandButtons}
        />
    );
};

export default DynamicTable;
