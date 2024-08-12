import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { SistemaApi } from "./service/sistema.service";
import { TableSistema } from "./components/table/TableSistema";
import FormSistema from "./components/form/FormSistema";
import { useEffect } from "react";


const SistemaView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<Response>(
    "Sistema",
    SistemaApi.getSistemaSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

  const deleteSistema = UseQueryMutation({
    requestFn: SistemaApi.deleteSistema,
    options: {
      onError() {
        toast.error(t(lang.Sistema.messages.deletedError));
      },
      onSuccess: () => {
        refetch();
        toast.success(t(lang.Sistema.messages.deletedSuccess));
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
        await deleteSistema.mutateAsync({ id });
      },
      reject: () => {
        // Maneja la cancelación si es necesario
      },
    });
  };


  return (
    <DashboardLayout>
      <div className='text-3xl mt-2 mb-2'>
        {t(lang.Sistema.title)}
      </div>
      <div className="card">
        {
          visible ? (
            <>
              <FormSistema
                title={rowData ? `${t(lang.Sistema.edit)}` : `${t(lang.Sistema.new)}`} refetch={refetch}
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
              <TableSistema
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

export default SistemaView;