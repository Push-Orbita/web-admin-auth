import toast from 'react-hot-toast';
import { CustomBasicModal } from '../../common/components/modal/CustomBasicModal';
import { useModuleContext } from '../../hooks/useModules';
import useQueryApi from "../../hooks/useQueryApi";
import UseQueryMutation from '../../hooks/useQueryMutation';
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
    const { rowData, startToolbarTemplate } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "actions",
        ActionsApi.getActionsSearch,
    )

    const deleteActions = UseQueryMutation({
        requestFn: ActionsApi.deleteActions,
        options: {
            onError() {
                toast.error('error')
            },
            onSuccess: () => {
                refetch()
                toast.success('Exito')
            },
        },
    })

    const handleDelete = async () => {
        const req = {
            id: rowData?.id,
        }
        await deleteActions.mutateAsync(req)
    }




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
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal
                title={rowData ? 'Action Editar' : 'Action Alta'}
            >
                <FormTypeActions />
            </CustomBasicModal>



        </DashboardLayout >

    )
}


export default Actions