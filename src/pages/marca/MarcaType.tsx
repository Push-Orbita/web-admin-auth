import { t } from "i18next";
import { useModuleContext } from "../../hooks/useModules";
import useQueryApi from "../../hooks/useQueryApi";
import { lang } from "../../langs";
import { DashboardLayout } from "../../layout/DashboardLayout"
import { MarcaApi } from "../../services/marca/marca.service";
import { TableMarca } from "./components/TableMarca";
import UseQueryMutation from "../../hooks/useQueryMutation";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../common/components/modal/CustomBasicModal";
import FormTypeMarca from "./components/FormTypeMarca";


const MarcaType = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "marca",
        MarcaApi.getActionsSearch
    )
    const deleteMarca = UseQueryMutation({
        requestFn: MarcaApi.deleteActions,
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
        await deleteMarca.mutateAsync(req)
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
                    <TableMarca
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal title={rowData ? `${t(lang.ActionsType.edit)}` : `${t(lang.ActionsType.new)}`} >
                {visible && (<FormTypeMarca refetch={refetch} />)}

            </CustomBasicModal>
        </DashboardLayout>
    )
}

export default MarcaType