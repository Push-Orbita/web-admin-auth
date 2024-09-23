import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface AccionRolResponse {
    data: AccionRolEntity[];
    metadata: MetadataEntity;
}
export interface AccionRolEntity {
    id: number;
    rol: Rol;
    accionPorModulo: AccionPorModulo;
}

export interface AccionPorModulo {
    id: number;
    modulo: Modulo;
    accion: Rol;
}

export interface Rol {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface Modulo {
    id: number;
    nombre: string;
    descripcion: string;
    label: string;
    element: string;
    icon: string;
    path: string;
}
