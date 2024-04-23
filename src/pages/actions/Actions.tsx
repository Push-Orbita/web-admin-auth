import { CustomBasicModal } from '../../common/components/modal/CustomBasicModal';
import { useModuleContext } from '../../hooks/useModules';
import useQueryApi from "../../hooks/useQueryApi";
import { DashboardLayout } from "../../layout/DashboardLayout";
import { ActionsApi } from "../../services/actions/actions.service";
import FormTypeActions from './components/FormTypeActions';

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
    const { startToolbarTemplate} = useModuleContext();

    return (

        <DashboardLayout>
            {/* <CustomBreadcrumb /> */}
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TableAction
                        data={data ?? []}
                        isFetching={isFetching}
                    />
                </div>
            </div>
            <CustomBasicModal >
                <FormTypeActions />
            </CustomBasicModal>



        </DashboardLayout >

    )
}


export default Actions