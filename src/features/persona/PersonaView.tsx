import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { PersonaApi } from "./service/persona.service";
import { TablePersona } from "./components/table/TablePersona";
import FormPersona from "./components/form/FormPersona";
import { useEffect } from "react";


const PersonaView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<Response>(
    "Persona",
    PersonaApi.getPersonaSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

  const deletePersona = UseQueryMutation({
    requestFn: PersonaApi.deletePersona,
    options: {
      onError() {
        toast.error(t(lang.Person.messages.deletedError));
      },
      onSuccess: () => {
        refetch();
        toast.success(t(lang.Person.messages.deletedSuccess));
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
        await deletePersona.mutateAsync({ id });
      },
      reject: () => {
        // Maneja la cancelación si es necesario
      },
    });
  };


  return (
    <DashboardLayout>
      <div className='text-3xl mt-2 mb-2'>
        {t(lang.Person.title)}
      </div>
      <div className="card">
        {
          visible ? (
            <>
              <FormPersona
                title={rowData ? `${t(lang.Person.edit)}` : `${t(lang.Person.new)}`} refetch={refetch}
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
              <TablePersona
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

export default PersonaView;