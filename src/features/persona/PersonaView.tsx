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
import StatsCard from "@components/common/widgets/StatsCard";
import { PersonaResponse } from "./model/entity/persona.entity";



const PersonaView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<PersonaResponse>(
    "Persona",
    PersonaApi.getPersonaSearch
  );
  console.log(data)
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

      <div className="card">
        <div className='text-3xl mt-2 mb-2'>
          {t(lang.Person.title)}
        </div>

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
                  <StatsCard
                    title="Total de Personas"
                    subTitle="Registradas"
                    quantity={data?.data?.length ?? 0}
                    shadow={2}
                    isLoading={isFetching}
                    textColorTitle="primary"
                    colorIcon="primary"
                    backgroundIconColor="primary"
                  />
                </div>
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