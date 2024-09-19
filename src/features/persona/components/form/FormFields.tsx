import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { ServiceNameApi } from "./service/serviceName.service";
import { TableServiceName } from "./components/table/TableServiceName";
import FormServiceName from "./components/form/FormServiceName";
import { useEffect } from "react";


const ServiceNameView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<Response>(
    "ServiceName",
    ServiceNameApi.getServiceNameSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

  const deleteServiceName = UseQueryMutation({
    requestFn: ServiceNameApi.deleteServiceName,
    options: {
      onError() {
        toast.error(t(lang.ServiceName.messages.deletedError));
      },
      onSuccess: () => {
        refetch();
        toast.success(t(lang.ServiceName.messages.deletedSuccess));
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
        await deleteServiceName.mutateAsync({ id });
      },
      reject: () => {
        // Maneja la cancelación si es necesario
      },
    });
  };


  return (
    <DashboardLayout>
      <div className='text-3xl mt-2 mb-2'>
        {t(lang.ServiceName.title)}
      </div>
      <div className="card">
        {
          visible ? (
            <>
              <FormServiceName
                title={rowData ? `${t(lang.ServiceName.edit)}` : `${t(lang.ServiceName.new)}`} refetch={refetch}
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
              <TableServiceName
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

export default ServiceNameView;