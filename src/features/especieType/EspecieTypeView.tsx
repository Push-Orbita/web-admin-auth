import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { EspecieTypeApi } from "./service/especieType.service";
import { TableEspecieType } from "./components/table/TableEspecieType";
import FormEspecieType from "./components/form/FormEspecieType";
import { useEffect } from "react";


const EspecieTypeView = () => {
  const { rowData, startToolbarTemplate, visible,resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<Response>(
    "EspecieType",
    EspecieTypeApi.getEspecieTypeSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

  const deleteEspecieType = UseQueryMutation({
    requestFn: EspecieTypeApi.deleteEspecieType,
    options: {
      // Manejar error en la eliminación
      onError() {
        toast.error(t(lang.EspecieType.messages.deletedError));
      },
      // Manejar éxito en la eliminación
      onSuccess: () => {
        refetch();
        toast.success(t(lang.EspecieType.messages.deletedSuccess));
      },
    },
  });

  // Manejar la eliminación de la categoria
  const handleDelete = (id: number) => {
    // Mostrar diálogo de confirmación
    confirmDialog({
      message: t(lang.common.labels.deleteMessage),
      header: t(lang.common.labels.deleteMessageTitle),
      icon: 'pi pi-exclamation-triangle text-yellow-500',
      acceptClassName: 'p-button-danger',
      acceptLabel: t(lang.common.actions.confirm),
      rejectLabel: t(lang.common.actions.cancel),
      // Acción a realizar en caso de confirmación
      accept: async () => {
        await deleteEspecieType.mutateAsync({ id });
      },
      // Acción a realizar en caso de rechazo
      reject: () => {
        // Maneja la cancelación si es necesario
      },
    });
  };


  return (
    <DashboardLayout>
      <div className='text-3xl mt-2 mb-2'>
        {t(lang.EspecieType.title)}
      </div>
      <div className="card">

        {
          visible ? (
            <>

              <FormEspecieType
                title={rowData ? `${t(lang.EspecieType.edit)}` : `${t(lang.EspecieType.new)}`}
                refetch={refetch}
              />
            </>
          )
            :
            (<div>
              <div className="grid">
                <div className="col-12">
                  {startToolbarTemplate()}
                </div>
              </div>
              <TableEspecieType
                data={data ?? []}
                isFetching={isFetching}
                handleDelete={handleDelete}
              />
            </div>)
        }

      </div>
      {/* <CustomBasicModal width="large" title={rowData ? `${t(lang.EspecieType.edit)}` : `${t(lang.EspecieType.new)}`}>
                {visible && (<FormEspecieType />)}
            </CustomBasicModal> */}
    </DashboardLayout>
  );
};

export default EspecieTypeView;