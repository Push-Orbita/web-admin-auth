import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface RolResponse {
    data: RolEntity[];
    metadata: MetadataEntity;
}

export interface AccionPorModulo {
    id: number;
    modulo: Modulo;
    accion: RolEntity;
}

export interface AccionesPorRol {
    id: number;
    accionPorModulo: AccionPorModulo;
}

export interface RolEntity {
    id: number;
    nombre: string;
    descripcion: string;
    accionesPorRol?: AccionesPorRol[];
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
