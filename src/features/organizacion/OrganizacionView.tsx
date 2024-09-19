import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { OrganizacionApi } from "./service/organizacion.service";
import { TableOrganizacion } from "./components/table/TableOrganizacion";
import FormOrganizacion from "./components/form/FormOrganizacion";
import { useEffect } from "react";
import { OrganizacionResponse } from "./model/entity/organizacion.entity";


const OrganizacionView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<OrganizacionResponse>(
    "Organizacion",
    OrganizacionApi.getOrganizacionSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

  const deleteOrganizacion = UseQueryMutation({
    requestFn: OrganizacionApi.deleteOrganizacion,
    options: {
      onError() {
        toast.error(t(lang.Organizacion.messages.deletedError));
      },
      onSuccess: () => {
        refetch();
        toast.success(t(lang.Organizacion.messages.deletedSuccess));
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
        await deleteOrganizacion.mutateAsync({ id });
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
          {t(lang.Organizacion.title)}
        </div>
        {
          visible ? (
            <>
              <FormOrganizacion
                title={rowData ? `${t(lang.Organizacion.edit)}` : `${t(lang.Organizacion.new)}`} refetch={refetch}
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
                <TableOrganizacion
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

export default OrganizacionView;