import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { AccionApi } from "./service/accion.service";
import { TableAccion } from "./components/table/TableAccion";
import FormAccion from "./components/form/FormAccion";
import { useEffect } from "react";


const AccionView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<Response>(
    "Accion",
    AccionApi.getAccionSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

  const deleteAccion = UseQueryMutation({
    requestFn: AccionApi.deleteAccion,
    options: {
      onError() {
        toast.error(t(lang.Action.messages.deletedError));
      },
      onSuccess: () => {
        refetch();
        toast.success(t(lang.Action.messages.deletedSuccess));
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
        await deleteAccion.mutateAsync({ id });
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
          {t(lang.Action.title)}
        </div>
        {
          visible ? (
            <>
              <FormAccion
                title={rowData ? `${t(lang.Action.edit)}` : `${t(lang.Action.new)}`} refetch={refetch}
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
                <TableAccion
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

export default AccionView;