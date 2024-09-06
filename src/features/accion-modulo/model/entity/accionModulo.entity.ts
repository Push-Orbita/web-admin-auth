import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface AccionModuloResponse {
    data: AccionModuloEntity[];
    metadata: MetadataEntity;
}

export interface AccionModuloEntity {
    id: number;
    modulo: Modulo;
    accion: Accion;
    accionesPorRol: AccionesPorRol[];
}

export interface Accion {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface AccionesPorRol {
    id: number;
    rol: Accion;
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
