import useQueryApi from "../../hooks/useQueryApi";
import { DashboardLayout } from "../../layout/DashboardLayout";
import { ActionsApi } from "../../services/actions/actions.service";
import { TableAction } from "./components/TableAction";

interface Response {
    data: ActionsResponse[];
}
interface ActionsResponse {
    id: number,
    createdDate: string | null,
    updatedDate: string | null,
    deletedDate: string | null,
    nombre: string,
    descripcion: string

}
const Actions = () => {
    const { data, isFetching } = useQueryApi<Response>(
        "actions",
        ActionsApi.getActionsSearch,
    );
    console.log('data:', data, isFetching)

    return (

        <DashboardLayout>
            <TableAction
                data={data ?? []}
                isFetching={isFetching}
            />
        </DashboardLayout >

    )
}


export default Actions