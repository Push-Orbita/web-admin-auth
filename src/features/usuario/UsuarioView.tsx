import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { UsuarioApi } from "./service/usuario.service";
import { TableUsuario } from "./components/table/TableUsuario";
import FormUsuario from "./components/form/FormUsuario";
import { useEffect } from "react";
import { UsuarioEntity } from "./model/entity/usuario.entity";


const UsuarioView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<UsuarioEntity>(
    "Usuario",
    UsuarioApi.getUsuarioSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

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
    confirmDialog({
      message: t(lang.common.labels.deleteMessage),
      header: t(lang.common.labels.deleteMessageTitle),
      icon: 'pi pi-exclamation-triangle text-yellow-500',
      acceptClassName: 'p-button-danger',
      acceptLabel: t(lang.common.actions.confirm),
      rejectLabel: t(lang.common.actions.cancel),
      accept: async () => {
        await deleteUsuario.mutateAsync({ id });
      },
      reject: () => {
        // Maneja la cancelación si es necesario
      },
    });
  };


  return (
    <DashboardLayout>

      <div className="card">
        <div className='text-3xl mt-2 mb-2'>
          {t(lang.User.title)}
        </div>
        {
          visible ? (
            <>
              <FormUsuario
                title={rowData ? `${t(lang.User.edit)}` : `${t(lang.User.new)}`} refetch={refetch}
              />
            </>
          )
            : (
              <div>
                <div className="grid">
                  <div className="col-12">
                    {startToolbarTemplate()}
                  </div>
                </div>
                <TableUsuario
                  data={data ?? []}
                  isFetching={isFetching}
                  handleDelete={handleDelete}
                />
              </div>
            )
        }
      </div>
    </DashboardLayout>
  );
};

export default UsuarioView;