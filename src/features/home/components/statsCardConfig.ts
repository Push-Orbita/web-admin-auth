import { OrganizacionApi } from "@features/organizacion/service/organizacion.service";
import { PersonaApi } from "@features/persona/service/persona.service";
import { UsuarioApi } from "@features/usuario/service/usuario.service";
import { RolApi } from "@features/rol/service/rol.service";
import { PermisosApi } from "@features/permisos/service/permisos.service";
import { SistemaApi } from "@features/sistema/service/sistema.service";
import { ModuloApi } from "@features/modulo/service/modulo.service";
import { AccionModuloApi } from "@features/accion-modulo/service/accionModulo.service";
import { AccionApi } from "@features/accion/service/accion.service";
import { SuscripcionApi } from "@features/suscripcion/service/suscripcion.service";
import { PlanApi } from "@features/plan/service/plan.service";
import { ContratoApi } from "@features/contrato/service/contrato.service";

export const statsCardConfig = [
    {
        entityName: "Organizacion",
        apiCall: OrganizacionApi.getOrganizacionSearch,
        title: "Total de Organizaciones",
        subTitle: "Registradas",
        icon: "pi pi-building"
    },
    {
        entityName: "Persona",
        apiCall: PersonaApi.getPersonaSearch,
        title: "Total de Personas",
        subTitle: "Registradas",
        icon: "pi pi-users"

    },
    {
        entityName: "Usuario",
        apiCall: UsuarioApi.getUsuarioSearch,
        title: "Total de Usuarios",
        subTitle: "Registrados",
        icon: "pi pi-users"
    },
    {
        entityName: "Rol",
        apiCall: RolApi.getRolSearch,
        title: "Total de Roles",
        subTitle: "Registrados",
        icon: "pi pi-sitemap"
    },
    {
        entityName: "Permisos",
        apiCall: PermisosApi.getPermisosSearch,
        title: "Total de Permisos",
        subTitle: "Registrados",
        icon: "pi pi-key"
    },
    {
        entityName: "Sistemas",
        apiCall: SistemaApi.getSistemaSearch,
        title: "Total de Sistemas",
        subTitle: "Registrados",
        icon: "pi pi-desktop"
    },
    {
        entityName: "Modulos",
        apiCall: ModuloApi.getModuloSearch,
        title: "Total de Modulos",
        subTitle: "Registrados",
        icon: "pi pi-sitemap"
    },
    {
        entityName: "AccionPorModulo",
        apiCall: AccionModuloApi.getAccionModuloSearch,
        title: "Total de Acciones por Modulo",
        subTitle: "Registradas",
        icon: "pi pi-sparkles"
    },
    {
        entityName: "TipoAccion",
        apiCall: AccionApi.getAccionSearch,
        title: "Total de Tipos de Acciones",
        subTitle: "Registrados",
        icon: "pi pi-bullseye"
    },
    {
        entityName: "Suscripcion",
        apiCall: SuscripcionApi.getSuscripcionSearch,
        title: "Total de Suscripciones",
        subTitle: "Registradas",
        icon: "pi pi-briefcase"
    },
    {
        entityName: "Planes",
        apiCall: PlanApi.getPlanSearch,
        title: "Total de Planes",
        subTitle: "Registrados",
        icon: "pi pi-money-bill"
    },
    {
        entityName: "Contratos",
        apiCall: ContratoApi.getContratoSearch,
        title: "Total de Contratos",
        subTitle: "Registrados",
        icon: "pi pi-file"
    },
];
