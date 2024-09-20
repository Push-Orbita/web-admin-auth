import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { SuscripcionApi } from "./service/suscripcion.service";
import { TableSuscripcion } from "./components/table/TableSuscripcion";
import FormSuscripcion from "./components/form/FormSuscripcion";
import { useEffect } from "react";


const SuscripcionView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<Response>(
    "Suscripcion",
    SuscripcionApi.getSuscripcionSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

  const deleteSuscripcion = UseQueryMutation({
    requestFn: SuscripcionApi.deleteSuscripcion,
    options: {
      onError() {
        toast.error(t(lang.Suscripcion.messages.deletedError));
      },
      onSuccess: () => {
        refetch();
        toast.success(t(lang.Suscripcion.messages.deletedSuccess));
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
        await deleteSuscripcion.mutateAsync({ id });
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
          {t(lang.Suscripcion.title)}
        </div>
        {
          visible ? (
            <>
              <FormSuscripcion
                title={rowData ? `${t(lang.Suscripcion.edit)}` : `${t(lang.Suscripcion.new)}`} refetch={refetch}
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
                <TableSuscripcion
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

export default SuscripcionView;