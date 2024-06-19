import { t } from "i18next";
import { useState } from "react";
import toast from "react-hot-toast";
import { CustomBasicModal } from "../../common/components/modal/CustomBasicModal";
import ModalDelete from "../../common/components/ModalDelete";
import { useModuleContext } from "../../hooks/useModules";
import useQueryApi from "../../hooks/useQueryApi";
import UseQueryMutation from "../../hooks/useQueryMutation";
import { lang } from "../../langs";
import { DashboardLayout } from "../../layout/DashboardLayout";
import { UsuarioApi } from "../../services/usuario/usuario.service";
import { TableUsuario } from "./components/TableUsuario";
import FormUsuario from "./components/FormUsuario";
import { Button } from "primereact/button";
import { CancelToastButton, ConfirmToastButton } from "../../common/components/ui/CustomButtonToastDelete";


const Usuario = () => {
    const { rowData, startToolbarTemplate, visible } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "usuario",
        UsuarioApi.getUsuarioSearch
    );


    const deleteUsuario = UseQueryMutation({
        requestFn: UsuarioApi.deleteUsuario,
        options: {
            onError() {
                toast.error(t(lang.User.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.User.messages.deletedSuccess));
            },
        },
    });

    const handleDelete = (id: number) => {
        toast((toastParameters) => (
            <div className="toast">
                <p>{t(lang.User.messages.deletedConfirm)}</p>
                <div className="flex justify-end gap-2">
                    <ConfirmToastButton
                        onClick={async () => {
                            await deleteUsuario.mutateAsync({ id });
                            toast.dismiss(toastParameters.id);
                        }}
                    />
                    <CancelToastButton
                        onClick={() => {
                            toast.dismiss(toastParameters.id);
                        }}
                    />
                </div>
            </div>
        ), {
            position: "bottom-center",
            duration: Infinity,
        });
    };

    return (
        <DashboardLayout>

            <div className='text-3xl mt-2 mb-2'>
                {t(lang.User.title)}
            </div>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                        {startToolbarTemplate()}
                    </div>
                </div>
                <div>
                    <TableUsuario
                        data={data ?? []}
                        isFetching={isFetching}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <CustomBasicModal title={rowData ? `${t(lang.User.edit)}` : `${t(lang.User.new)}`}>
                {visible && (<FormUsuario refetch={refetch} />)}
            </CustomBasicModal>

        </DashboardLayout>
    );
};

export default Usuario;