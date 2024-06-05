import { t } from "i18next";
import { useState } from "react";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../common/components/modal/CustomBasicModal";
import ModalDelete from "../../common/components/ModalDelete";
import { useModuleContext } from "../../hooks/useModules";
import useQueryApi from "../../hooks/useQueryApi";
import UseQueryMutation from "../../hooks/useQueryMutation";
import { lang } from "../../langs";
import { DashboardLayout } from "../../layout/DashboardLayout"
import { SistemaApi } from "../../services/sistema/sistema.service";
import { TableSistema } from "./components/TableSistema";
import FormSistema from "./components/FormSistema";


const Sistema = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "sistema",
        SistemaApi.getSistemaSearch
    );

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const deleteSistema = UseQueryMutation({
        requestFn: SistemaApi.deleteSistema,
        options: {
            onError() {
                toast.error(t(lang.System.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.System.messages.deletedSuccess));
            },
        },
    });

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        if (deleteId !== null) {
            const req = { id: deleteId };
            await deleteSistema.mutateAsync(req);
            setShowConfirmModal(false);
            setDeleteId(null);
        }
    };

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setDeleteId(null);
    };

    return (
        <DashboardLayout>
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.System.title)}
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TableSistema
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal title={rowData ? `${t(lang.System.edit)}` : `${t(lang.System.new)}`}>
                {visible && (<FormSistema refetch={refetch} />)}
            </CustomBasicModal>
            {
                showConfirmModal && (
                    <ModalDelete
                        visible={showConfirmModal}
                        onHide={cancelDelete}
                        onConfirm={confirmDelete}
                    >
                        <p>{t(lang.System.messages.deletedSuccess)}</p>
                    </ModalDelete>)
            }

        </DashboardLayout>
    );
};

export default Sistema;