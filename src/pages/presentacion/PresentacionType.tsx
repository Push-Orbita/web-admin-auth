import { t } from "i18next";
import { useModuleContext } from "../../hooks/useModules";
import useQueryApi from "../../hooks/useQueryApi";
import { lang } from "../../langs";
import { DashboardLayout } from "../../layout/DashboardLayout"
import { PresentacionApi } from "../../services/presentacion/presentacion.service";
import { TablePresentacion } from "./components/TablePresentacion";
import UseQueryMutation from "../../hooks/useQueryMutation";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../common/components/modal/CustomBasicModal";
import FormTypePresentacion from "./components/FormTypePresentacion";
import ModalDelete from "../../common/components/ModalDelete";
import { useState } from "react";

const PresentacionType = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "presentacion",
        PresentacionApi.getActionsSearch
    );

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const deletePresentacion = UseQueryMutation({
        requestFn: PresentacionApi.deleteActions,
        options: {
            onError() {
                toast.error(t(lang.ActionsType.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.ActionsType.messages.deletedSuccess));
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
            await deletePresentacion.mutateAsync(req);
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
                {t(lang.PresentacionType.title)}
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TablePresentacion
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal title={rowData ? `${t(lang.PresentacionType.edit)}` : `${t(lang.PresentacionType.new)}`}>
                {visible && (<FormTypePresentacion refetch={refetch} />)}
            </CustomBasicModal>

            <ModalDelete
                visible={showConfirmModal}
                onHide={cancelDelete}
                onConfirm={confirmDelete}
            >
                <p>{t(lang.ActionsType.messages.deletedSuccess)}</p>
            </ModalDelete>
        </DashboardLayout>
    );
};

export default PresentacionType;