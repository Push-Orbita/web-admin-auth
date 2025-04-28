import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface ModuloResponse {
    data: ModuloEntity[];
    metadata: MetadataEntity;
}

export interface SistemaEntity {
    id: number;
    nombre: string;
    descripcion: string;
    url: string;
    icono: string;
    suscripciones: SuscripcionEntity[];
    modulos: string[];
    permisos: PermisoEntity[];
}

export interface SuscripcionEntity {
    id: number;
    nombre: string;
    descripcion: string;
    sistema: string;
    planes: PlanEntity[];
    modulos: string[];
}

export interface PlanEntity {
    id: number;
    nombre: string;
    descripcion: string;
    duracion: number;
    precio: number;
    suscripcion: string;
    contratos: ContratoEntity[];
    modulosPorPlan: ModuloPorPlanEntity[];
}

export interface ContratoEntity {
    id: number;
    fechaVencimiento: string;
    plan: string;
    organizacion: OrganizacionEntity;
}

export interface OrganizacionEntity {
    id: number;
    nombre: string;
}

export interface ModuloPorPlanEntity {
    id: number;
    modulo: string;
    plan: string;
}

export interface PermisoEntity {
    id: number;
    usuario: UsuarioEntity;
    sistema: string;
    organizacion: OrganizacionEntity;
    rol: RolEntity;
}

export interface UsuarioEntity {
    id: number;
    nombre: string;
    password: string;
    persona: PersonaEntity;
    permiso: string[];
    userModulos: any[];
    tokens: any;
}

export interface PersonaEntity {
    id: number;
    cuil: string;
    nombre: string;
    apellido: string;
    genero: string;
    usuarios: string[];
}

export interface RolEntity {
    id: number;
    nombre: string;
    descripcion: string;
    accionesPorRol: string[];
    permisosDeAcceso: string[];
}

export interface AccionEntity {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface AccionPorModuloEntity {
    id: number;
    modulo: string;
    accion: AccionEntity;
    accionesPorRol: AccionPorRolEntity[];
}

export interface AccionPorRolEntity {
    id: number;
    rol: RolEntity;
    accionPorModulo: string;
}

export interface ModuloEntity {
    id: number;
    nombre: string;
    descripcion: string;
    label: string;
    element: string;
    icon: string;
    path: string;
    moduloPadre: string;
    sistema: SistemaEntity;
    suscripcion: SuscripcionEntity;
    accionesPorModulo: AccionPorModuloEntity;
} 