import toast from 'react-hot-toast';
import { CustomBasicModal } from '../../common/components/modal/CustomBasicModal';
import { useModuleContext } from '../../hooks/useModules';
import useQueryApi from "../../hooks/useQueryApi";
import UseQueryMutation from '../../hooks/useQueryMutation';
import { DashboardLayout } from "../../layout/DashboardLayout";
import { ActionsApi } from "../../services/actions/actions.service";
import FormTypeActions from './components/FormTypeActions';
import { lang } from '../../langs';
import { t } from "i18next"
import { TableAction } from "./components/TableAction";
const ActionsType = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "actions",
        ActionsApi.getActionsSearch
    )
    const deleteActions = UseQueryMutation({
        requestFn: ActionsApi.deleteActions,
        options: {
            onError() {
                toast.error(t(lang.ActionsType.messages.deletedError))
            },
            onSuccess: () => {
                refetch()
                toast.success(t(lang.ActionsType.messages.deletedSuccess))
            },
        },
    })
    const handleDelete = async (id: number) => {
        const req = {
            id
        }
        await deleteActions.mutateAsync(req)
    }
    return (

        <DashboardLayout>
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.ActionsType.title)}
            </div>
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
            <CustomBasicModal title={rowData ? `${t(lang.ActionsType.edit)}` : `${t(lang.ActionsType.new)}`} >
                {visible && (<FormTypeActions refetch={refetch} />)}

            </CustomBasicModal>
        </DashboardLayout >

    )
}
export default ActionsType