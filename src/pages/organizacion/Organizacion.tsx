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
import { OrganizacionApi } from "../../services/organizacion/organizacion.service";
import { TableOrganizacion } from "./components/TableOrganizacion";
import FormOrganizacion from "./components/FormOrganizacion";

// import { TableOrganizacion } from "./components/TableOrganizacion";
// import FormOrganizacion from "./components/FormOrganizacion";


const Organizacion = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "Organizacion",
        OrganizacionApi.getOrganizcionSearch
    );

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const borrarOrganizacion = UseQueryMutation({
        requestFn: OrganizacionApi.deleteOrganizcion,
        options: {
            onError() {
                toast.error(t(lang.Organization.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Organization.messages.deletedSuccess));
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
            await borrarOrganizacion.mutateAsync(req);
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
                {t(lang.Organization.title)}
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TableOrganizacion
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal title={rowData ? `${t(lang.Organization.edit)}` : `${t(lang.Organization.new)}`}>
                {visible && (<FormOrganizacion refetch={refetch} />)}
            </CustomBasicModal>
            {
                showConfirmModal && (
                    <ModalDelete
                        visible={showConfirmModal}
                        onHide={cancelDelete}
                        onConfirm={confirmDelete}
                    >
                        <p>{t(lang.Organization.messages.deletedSuccess)}</p>
                    </ModalDelete>)
            }

        </DashboardLayout>
    );
};

export default Organizacion;