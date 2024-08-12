import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { RazaTypeApi } from "./service/razaType.service";
import { TableRazaType } from "./components/table/TableRazaType";
import FormRazaType from "./components/form/FormRazaType";
import { useEffect } from "react";
// import { RazaTypeApi } from "./service/RazaType.service";

// import FormRazaType from "./components/form/FormRazaType";


const RazaTypeView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<Response>(
    "RazaType",
    RazaTypeApi.getRazaTypeSearch
  );
  useEffect(() => {
    resetModuleState();
  }, []);

  const deleteRazaType = UseQueryMutation({
    requestFn: RazaTypeApi.deleteRazaType,
    options: {
      // Manejar error en la eliminación
      onError() {
        toast.error(t(lang.RazaType.messages.deletedError));
      },
      // Manejar éxito en la eliminación
      onSuccess: () => {
        refetch();
        toast.success(t(lang.RazaType.messages.deletedSuccess));
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
        await deleteRazaType.mutateAsync({ id });
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
        {t(lang.RazaType.title)}
      </div>
      <div className="card">

        {
          visible ? (
            <>

              <FormRazaType
                title={rowData ? `${t(lang.RazaType.edit)}` : `${t(lang.RazaType.new)}`}
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
              <TableRazaType
                data={data ?? []}
                isFetching={isFetching}
                handleDelete={handleDelete}
              />
            </div>)
        }

      </div>
      {/* <CustomBasicModal width="large" title={rowData ? `${t(lang.RazaType.edit)}` : `${t(lang.RazaType.new)}`}>
                {visible && (<FormRazaType />)}
            </CustomBasicModal> */}
    </DashboardLayout>
  );
};

export default RazaTypeView;